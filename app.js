const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const GraphQlSchema = require("./schema");
const GraphRootValue = require("./resolver");
const CarController = require("./controller/cars");
const UserController = require("./controller/user");

const app = express();
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQlSchema,
    rootValue: GraphRootValue,
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.json({ test: "helloworld" });
});

app.get("/users", UserController.all);
app.get("/user/create", UserController.create);
app.get("/user/:email", UserController.find);
app.get("/user/:email/cars", UserController.getAllCars);

app.get("/cars", CarController.getAllCars);
app.post("/car/create", CarController.create);

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ds137102.mlab.com:37102/graphql`
  )
  .then(() => {
    console.log("connected mongodb successful");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
