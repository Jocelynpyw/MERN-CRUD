const express = require("express");
const mongoose = require("mongoose");
const FoodModel = require("./models/food");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://localhost:27017/monCrud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Data Base connexion successfuly"))
  .catch((err) => {
    console.error("Connextion Echec", err);
    process.exit(-1);
  });

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({
    foodName: foodName,
    daySinceIAte: days,
  });
  try {
    await food.save();
  } catch (error) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, newValue) => {
      newValue.foodName = newFoodName;
      newValue.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});
app.listen(5000, () => {
  console.log("Your server is running on Port : 5000");
});
