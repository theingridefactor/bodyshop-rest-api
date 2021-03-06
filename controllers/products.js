const express = require("express");

let router = express.Router();

const { MongoClient, ObjectID } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

main = async () => {
  return client
    .connect()
    .then((myclient) => {
      return myclient.db().collection("products");
    })
    .catch((e) => console.error(e))
    .finally(client.close());
};

// Getting all
router.get("/", async (req, res) => {
  const products = await main().catch(console.error);
  products
    .find()
    .toArray()
    .then((data) => res.json(data))
    .catch((e) => console.error(e));
});

// Getting one
router.get("/:id", async (req, res) => {
  const products = await main().catch(console.error);
  products
    .find({ _id: ObjectID(req.params.id) })
    .toArray()
    .then((data) => res.json(data))
    .catch((e) => console.error(e));
});

module.exports = router;
