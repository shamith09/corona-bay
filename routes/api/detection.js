const express = require("express");
const router = express.Router();
const path = require("path")
const { uuid } = require('uuidv4');
const fs = require("fs")
const tf = require("@tensorflow/tfjs-node")
const jimp = require("jimp")


const manipulateImg = (filePath, imgName, id) => {
  jimp.read(filePath, (err, img) => {
    if (err) throw err;
    img.resize(150, 150).grayscale().write((path.resolve(__dirname, "../../client/public/uploads/processed-" + id + '.png')))
  })
}

const predict = async (res, id) => {
  const model = await tf.loadLayersModel("https://coronabay.org/model.json")
  const imageBuffer = fs.readFileSync(path.resolve(__dirname, "../../client/public/uploads/processed-" + id + '.png'));
  const tfimage = tf.node.decodePng(imageBuffer, 1).as3D(1, 150, 150);
  const prediction = await model.predict(tfimage).dataSync()[0].toString();

  res.send(prediction);
  clearUploads();
}

const clearUploads = () => {
  const directory = path.join(__dirname, "../../client/public/uploads");

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}


router.post("/detection", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const id = uuid();
  const file = req.files.file;

  const filePath = path.join(__dirname, '../../client/public/uploads/' + id + '.png');

  file.mv(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
  manipulateImg(filePath, file.name, id)
  res.send(id)
});

router.post("/get-detection-results", async (req, res) => {
  if (req.body.id) {
    const id = req.body.id;
    await predict(res, id);
  }
})


module.exports = router;
