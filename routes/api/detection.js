const express = require("express");
const router = express.Router();
const path = require("path")
const uuid = require("uuid")
const fs = require("fs")
const tf = require("@tensorflow/tfjs-node")
const jimp = require("jimp")


const manipulateImg = (filePath, imgName) => {
  jimp.read(filePath, (err, img) => {
    if (err) throw err;
    img.resize(150, 150).grayscale().write((path.resolve(__dirname, "../../client/public/uploads/processed-" + imgName)))
  })
}

const predict = async (imgName, res) => {
  const model = await tf.loadLayersModel("https://coronabay.org/model.json")
  const imageBuffer = fs.readFileSync(path.resolve(__dirname, "../../client/public/uploads/processed-" + imgName));
  const tfimage = tf.node.decodePng(imageBuffer, 1).as3D(1, 150, 150);
  const prediction = await model.predict(tfimage).dataSync()[0].toString();
  console.log(prediction)
  console.log(typeof prediction)
  res.send(prediction);
}


router.post("/detection", async(req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;

      const filePath = path.join(__dirname, '../../client/public/uploads/' + file.name);
    
      file.mv(filePath, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        //res.sendStatus(200)
      });
      manipulateImg(filePath, file.name)
      await predict(file.name, res);
});


module.exports = router;
