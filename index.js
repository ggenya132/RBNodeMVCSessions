const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
//pass session middleware to sesssion store
const MongoDbSessionStore = require("connect-mongodb-session")(session);
const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");
const workoutRoutes = require("./routes/workout");
const loginRoutes = require("./routes/login");
const { mongoUri, sessionSecret } = require("./config/keys");
const isAuth = require("./auth/isAuth");

//init and configure store
const store = new MongoDbSessionStore({
  uri: mongoUri,
  collection: "sessions"
});
const mongoose = require("mongoose");

mongoose
  .connect(
    mongoUri,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(`There is an err:${err}`));

//init session with store for the app
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/email", isAuth, emailRoutes);
app.use("/login", loginRoutes);
app.use("/workout", isAuth, workoutRoutes);

//generic catch all route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to RBE Node</h1>");
});

//why are we here
app.use((req, res) => {
  res.send("<h1>Something went wrong</h1> <a href='/'>home</a>");
});
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => console.log(`app starting on ${PORT}`));
