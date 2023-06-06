const multer = require('multer');
const defaultPath = 'public';
const fs = require('fs');

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		let directoryExist = fs.existsSync(`${defaultPath}/image`);
		if (!directoryExist) {
			await fs.promises.mkdir(`${defaultPath}/image`, {
				recursive: true,
			});
		}

		cb(null, `${defaultPath}/image`);
	},
	filename: (req, file, cb) => {
		cb(
			null,
			'TIMG' +
				'.' +
				Date.now() +
				Math.round(Math.random() * 1000000000) +
				'.' +
				file.mimetype.split('/')[1]
		);
	},
});

const fileFilter = (req, res, cb) => {
	if (
		file.mimetype.split('/')[1] === 'jpg' ||
		file.mimetype.split('/')[1] === 'jpeg' ||
		file.mimetype.split('/')[1] === 'png'
	) {
		cb(null, true);
	} else {
		cb(new Error('Not supported file format!'));
	}
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
