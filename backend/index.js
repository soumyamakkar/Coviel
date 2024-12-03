const express = require('express'); 
const app = express();
const PORT = 8000;
const authRoutes=require('./routes/authRoutes');
require('dotenv').config({ path: '../.env' }); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const connection=require('./config/db');

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
    connection();
    console.log(`Server is running on http://localhost:${PORT}`);
});
