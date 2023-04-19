const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const birthdate = req.body.birthdate;

  const friend = new FriendModel({ name: name, birthdate: birthdate });
  await friend.save();
  res.send(friend);
});


app.get("/read", async (req, res) => {
  try {
    const result = await FriendModel.find({});
    console.log("Data fetched successfully: ", result);
    res.send(result);
  } catch (error) {
    console.error("An error occurred in /read route: ", error);
    res.status(500).send(error);
  }
});



app.put('/update', async (req, res) => {
  const newBirthdate = req.body.newBirthdate;
  const id = req.body.id;

  try {
    const friendToUpdate = await FriendModel.findById(id);
    friendToUpdate.birthdate = new Date(newBirthdate);
    await friendToUpdate.save();
    res.send("updated");
  } catch (error) {
    console.error("An error occurred in /update route: ", error);
    res.status(500).send(error);
  }
});



app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await FriendModel.findByIdAndRemove(id).exec();
  res.send("itemdeleted");
})

app.listen(process.env.PORT || 3001, () => {
  console.log("You are connected!");
});
