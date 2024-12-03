const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const connection = require("./contexts/AppContext");

const BookRoutes = require("./routes/BookRoutes");
const AuthorRoutes = require("./routes/AuthorRoutes");
const GenreRoutes = require("./routes/GenreRoute");
const PublisherRoutes = require("./routes/PublisherRoutes");
const home = require("./routes/HomeRoutes");

const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const compare = require("./utils/comparevalues");

const port = process.env.PORT || 3000;
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
      compare: compare,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.urlencoded({ extended: false }));

//static directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pictures");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

app.use(multer({storage : imageStorage}).single("Image"));
//routes
app.use("/book",BookRoutes);
app.use("/author",AuthorRoutes);
app.use("/genre",GenreRoutes);
app.use("/publisher",PublisherRoutes);
app.use("/home",home);



app.use((req, res, next) => {
  res.status(400).render("404");
});


connection
  .sync({ force: false })
  .then((resut) => {
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
