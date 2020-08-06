const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./app/models");
const User = db.user;
const Role = db.role;

db.mongoose
  .connect(
    "mongodb+srv://kbatavia12:karan@123@cluster0.fml20.mongodb.net/test?retryWrites=true&w=majority", 
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database connection established!");
    initial(); //Add the roles to the database for future authentication
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  User.estimatedDocumentCount((err, count) => {
    res.json({count: count})
  })
});

const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        console.log(count);
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log(`Added "user" to the roles collection`);
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log(`Added "moderator" to the roles collection`);
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log(err);
        }
        console.log(`Added "admin" to the roles collection`);
      });
    }
  });
};

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


const PORT = 8181;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
