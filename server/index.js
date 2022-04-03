const express    = require("express");
const bodyParser = require('body-parser');
const cors       = require("cors");
const multer     = require('multer')
const app        = express();

const mint       = require("./process")
 
const storage    = multer.memoryStorage()
const upload     = multer({ storage: storage })

 
app.use(cors()); //https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

// parse application/json
app.use(bodyParser.urlencoded({extended:true})); //https://heynode.com/tutorial/process-user-login-form-expressjs/
  

app.get("/api", (req, res) => {
    res.json({ message: "Express JS Status: Connected to Node-Express Backend!" });
  });

 
//add new user
app.post('/process', upload.single('file'), async (req, res, next) => {

    //console.log ( `Message: ${req.body.message} and Address: ${req.body.address} Image: ${req.body.image}` )

    console.log(req.file, req.body)

    const payload = await mint.processControl(req.body.tokenID, req.body.message, req.body.address, req.file )

    console.log(payload)

    res.send(payload)

    //res.json({success: true, status: `Message: ${req.body.message} and Tokenn ID: ${req.body.currentTokenID}`}) 
    //https://www.reddit.com/r/node/comments/80q7sy/comment/duy7epk/?utm_source=share&utm_medium=web2x&context=3

});
 
// app.listen(3000, () => {
//   console.log("Server running successfully on 3000");
// });


const port = process.env.PORT || 3001;
app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log('Server is running at Port: ' + port);
    }

})