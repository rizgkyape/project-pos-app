const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const PORT = 5678;

// IMPORT ROUTERS
const { productRouter } = require('./routers');

app.use('/products', productRouter);

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});