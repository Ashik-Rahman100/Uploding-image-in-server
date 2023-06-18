const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
const multer  = require('multer')
const path = require ('path')

// Set up storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Images'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, Date.now() + path.extname(file.originalname)); // Use the original file name as the uploaded file name
    },
  });
  
const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.get("/upload", (req, res) =>{
    res.render("upload")
});
app.post("/upload",upload.single('image'), (req, res) =>{
  // Access the uploaded file details through `req.file`
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully' });
});

app.listen(port, () =>{
    console.log("Server is running");
})