const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = 5678;

// IMPORT ROUTERS
const { userRouter, productRouter } = require('./routers');

app.use('/auth', userRouter);
app.use('/products', productRouter);

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
