import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

// @desc fetch all rental Items
// @route GET /api/items
// @access Public

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});

  res.json(items);
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

// @desc add rental item by User
// @route POST /api/items
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

  const image = req.file.path;

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

export { getItems, getItemsById, addItem };
