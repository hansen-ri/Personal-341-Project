// const { MongoDBNamespace } = require('mongodb');
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("firearms").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("firearms")
    .find({ _id: itemId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const postFirearm = async (req, res, next) => {
  // req.body holds the recieved data. Access to that data is through req.body.keyName
  // this is how we fill the function with custom data every time
  const firearm = {
    brand: req.body.brand,
    model: req.body.model,
    caliber: req.body.caliber,
    msrp: req.body.msrp,
    color: req.body.color,
    type: req.body.type,
    use: req.body.use,
  };
  console.log(firearm);
  // insertOne() only takes one parameter since it only needs to know what to place
  const response = await mongodb
    .getDb()
    .db()
    .collection("firearms")
    .insertOne(firearm);
  console.log(response);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the firearm."
      );
  }
};

const updateFirearm = async (req, res, next) => {
  const itemId = new ObjectId(req.params.id);
  const firearm = {
    brand: req.body.brand,
    model: req.body.model,
    caliber: req.body.caliber,
    msrp: req.body.msrp,
    color: req.body.color,
    type: req.body.type,
    use: req.body.use,
  };
  // replaceOne() takes a filter, in this case we want the specific itemId; and what to replace it with (firearm)
  const response = await mongodb
    .getDb()
    .db()
    .collection("firearms")
    .replaceOne({ _id: itemId }, firearm);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the firearm."
      );
  }
};

const deleteFirearm = async (req, res, next) => {
  const itemId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("firearms")
    .remove({ _id: itemId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the firearm."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  postFirearm,
  updateFirearm,
  deleteFirearm,
};
