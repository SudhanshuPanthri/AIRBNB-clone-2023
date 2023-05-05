const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserSchema = require("./models/User");
require("dotenv").config();
const mongoose = require("mongoose");
const ImageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const PlaceModel = require("./models/Place");
const UserModel = require("./models/User");
const BookingModel = require("./models/Booking");
const bookingModel = require("./models/Booking");

const hash = bcrypt.genSaltSync(10);
const jwtSecret = "agshdhagsjfsajflks";

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Okay");
});

// pass:jLn149OAp2OZS0kd

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const User = await UserSchema.create({
      name,
      email,
      password: bcrypt.hashSync(password, hash),
    });
    res.json(User);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const User = await UserSchema.findOne({ email });
  if (User) {
    const passOkay = bcrypt.compareSync(password, User.password);
    if (passOkay) {
      jwt.sign(
        { email: User.email, id: User._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw new err();
          res.cookie("token", token).json(User);
        }
      );
    } else {
      res.json("not ok");
    }
  } else {
    res.json("Not Found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      const { name, email, _id } = await UserSchema.findById(tokenData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Session Expired");
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "/photo" + Date.now() + ".jpg";
  await ImageDownloader.image({
    url: link,
    dest: __dirname + "/uploads" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });

app.post("/upload", photosMiddleware.array("photos", 20), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

app.post("/accomodations", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    state,
    photos,
    description,
    category,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.create({
      owner: tokenData.id,
      title,
      address,
      state,
      photos,
      description,
      category,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

//get accommodations

app.get("/user-accommodations", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
    if (err) throw err;
    const { id } = tokenData;
    res.json(await PlaceModel.find({ owner: id }));
  });
});

app.post("/delete", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
    if (err) throw err;
    const { id } = req.body;
    res.json(await PlaceModel.deleteOne({ _id: id }));
  });
});

//api to get all places
app.get("/get-places", async (req, res) => {
  res.json(await PlaceModel.find());
});

//api to get a particular place
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

app.get("/get-places-by/:input", async (req, res) => {
  const { input } = req.params;
  console.log(input);
  let data = await PlaceModel.find();
  let filterData = data.filter((item) => item.state === input);
  res.json(filterData);
});

app.get("/get-places/:category", async (req, res) => {
  const { category } = req.params;
  let data = await PlaceModel.find();
  let filterData = data.filter((item) => item.category === category);
  res.json(filterData);
});

app.get("/get-user-by/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await UserModel.findById(id));
});

//booking api

app.post("/booking", (req, res) => {
  const { token } = req.cookies;
  let userId = null;
  jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
    if (err) throw err;
    userId = tokenData.id;
  });
  const { placeId, checkIn, checkOut, maxGuests, name, phone, totalPrice } =
    req.body;
  try {
    BookingModel.create({
      placeId,
      user: userId,
      checkIn,
      checkOut,
      maxGuests,
      name,
      phone,
      totalPrice,
    }).then((response) => {
      res.json(response);
    });
  } catch (err) {
    console.log(err);
  }
});

//get booking details

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
    res.json(
      await bookingModel.find({ user: tokenData.id }).populate("placeId")
    );
  });
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log("Server started at PORT ", port);
});
