const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const PORT = 5678;

// IMPORT ROUTERS
const { userRouter } = require('./routers');

app.use('/users', userRouter);

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
