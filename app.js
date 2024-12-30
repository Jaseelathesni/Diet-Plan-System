const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
const app=express();
require('dotenv').config();





mongoose.connect(process.env.DB_URI);

// middleware to enable cors
app.use(cors());

// serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'views')));

// import and use the blog routes
const dietRouter=require('./routes/route');
app.use('/api',dietRouter);

// serve the main HTML file for the root url
app.get('/' ,(req,res) => {
    res.sendFile(path.join(__dirname, 'views' , 'index.html'));
});


const PORT=4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});