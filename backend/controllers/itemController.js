import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

// @desc fetch all rental Items in batches of 5
// @route GET /api/items
// @access Public

const getItems = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Item.countDocuments({ ...keyword });
  const items = await Item.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ items, page, pages: Math.ceil(count / pageSize) });
});

// @desc fetch rental item by id
// @route GET /api/items/:id
// @access Public

const getItemsById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc delete item by itemId
// @route DELETE /api/items/:id
// @access Private

const deleteItemsById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await Item.deleteOne({ _id: item._id });
    res.status(200).json({ message: "Item deleted" });
  } else {
    res.status(404);
    throw new Error("Item not found, can't be deleted");
  }
});

// @desc add rental item by User
// @route POST /api/items/create
// @access Private

const addItem = asyncHandler(async (req, res) => {
  const {
    owner,
    name,
    brand,
    category,
    description,
    pricePerDay,
    startDate,
    endDate,
  } = req.body;

  // const image = "/images/test_image.jpg";
  const image = req.file.path.replace("frontend/public", "");

  //item doesnt have to be unique

  const item = await Item.create({
    owner,
    name,
    image,
    brand,
    category,
    description,
    pricePerDay,
    startDate,
    endDate,
  });

  if (item) {
    res.status(201).json({
      _id: item._id,
      ownerId: item.owner,
      retnerId: item.retner,
      name: item.name,
      image: item.image,
      brand: item.brand,
      category: item.category,
      description: item.description,
      pricePerDay: item.pricePerDay,
      startDate: item.startDate,
      endDate: item.endDate,
    });
  } else {
    res.status(400);
    throw new Error("Invalid item data");
  }
});

// @desc update an Item by the item Id
// @route PUT /api/items/:id
// @access Private

const updateItem = asyncHandler(async (req, res) => {
  const {
    _id,
    renter,
    name,
    brand,
    category,
    description,
    pricePerDay,
    isOrderPlaced,
  } = req.body;

  const renterObjectId = new mongoose.Types.ObjectId(renter);

  const updatedItem = await Item.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        renter: renterObjectId,
        name: name,
        brand: brand,
        category: category,
        description: description,
        pricePerDay: pricePerDay,
        isOrderPlaced: isOrderPlaced,
      },
    },
    { new: true }
  );

  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc fetch all AVAILABLE rental Items isOrderPlaced == false in batches of 5
// @route GET /api/items/available
// @access Public

const getItemsAvailable = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const filter = {
    ...keyword,
    isOrderPlaced: false,
  };

  const count = await Item.countDocuments(filter);
  const items = await Item.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (items.length > 0) {
    res.json({ items, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("No available items found");
  }
});

// @desc fetch all items by user ID
// @route GET /api/items/:ownerId
// @access Private

const getItemsByOwnerId = asyncHandler(async (req, res) => {
  const ownerId = req.params.ownerId;
  const items = await Item.find({ owner: ownerId });

  if (items.length > 0) {
    res.json(items);
  } else {
    res.status(404);
    throw new Error("No items found for this owner");
  }
});

// @desc fetch all items by user ID
// @route GET /api/items/:renterId
// @access Private

const getItemsByRenterId = asyncHandler(async (req, res) => {
  const renterId = req.params.renterId;
  const items = await Item.find({ renter: renterId });

  if (items.length > 0) {
    res.json(items);
  } else {
    res.status(404);
    throw new Error("No items found for this owner");
  }
});

export {
  getItems,
  getItemsById,
  addItem,
  deleteItemsById,
  updateItem,
  getItemsAvailable,
  getItemsByOwnerId,
  getItemsByRenterId,
};
