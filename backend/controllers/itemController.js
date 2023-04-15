import asyncHandler from 'express-async-handler'
import Item from '../models/itemModel.js'

// @desc Fetch all items
// @route GET /api/items
// @access Public
const getItems = asyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Item.countDocuments({ ...keyword })
  const items = await Item.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ items, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch single item
// @route GET /api/items/:id
// @access Public
const getItemsById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (item) {
    res.json(item)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

// @desc Delete an item
// @route DELETE /api/items/:id
// @access Private
const deleteItemsById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (item) {
    await Item.deleteOne({ _id: item._id })
    res.status(200).json({ message: 'Item deleted' })
  } else {
    res.status(404)
    throw new Error("Item not found, can't be deleted")
  }
})

// @desc Add an item
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
  } = req.body

  // const image = "/images/test_image.jpg";
  const image = req.file.path.replace("frontend\\public\\images\\" , '/images/')

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
  })

  if (item) {
    res.status(201).json({
      _id: item._id,
      ownerId: item.owner,
      renterId: item.renter,
      name: item.name,
      image: item.image,
      brand: item.brand,
      category: item.category,
      description: item.description,
      pricePerDay: item.pricePerDay,
      startDate: item.startDate,
      endDate: item.endDate,
    })
  } else {
    res.status(400)
    throw new Error('Invalid item data')
  }
})

// @desc Update an item
// @route PUT /api/items/:id
// @access Private/Admin
const updateItem = asyncHandler(async (req, res) => {
  // const {
  //   _id,
  //   renter,
  //   name,
  //   brand,
  //   category,
  //   description,
  //   pricePerDay,
  //   startDate,
  //   endDate,
  //   isOrderPlaced,
  //   isBorrowed,
  //   isReturned

  // } = req.body;

  // const item = await Item.findById(req.params.id)

  const {
    owner,
    name,
    brand,
    category,
    description,
    pricePerDay,
    startDate,
    endDate,
    isOrderPlaced,
    isBorrowed,
    isReturned,
  } = req.body

  const item = await Item.findById(req.params.id)

  const updatedItem = await Item.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: name,
        brand: brand,
        category: category,
        description: description,
        pricePerDay: pricePerDay,
        startDate: startDate,
        endDate: endDate,
      },
    },
    { new: true }
  );

  //   const updatedItem = await item.save()
  //   res.json({
  //     name: updateItem.name,
  //     brand: updateItem.brand,
  //     category: updateItem.category,
  //     description: updateItem.description,
  //     pricePerDay: updateItem.pricePerDay,
  //     isOrderPlaced: updateItem.isOrderPlaced
  //   })
  // } else {
  //   res.status(404)
  //   throw new Error('Item not found')
  // }

  // const renterObjectId = new mongoose.Types.ObjectId(renter)

  // const updatedItem = await Item.findOneAndUpdate(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       renter: renterObjectId,
  //       name: name,
  //       brand: brand,
  //       category: category,
  //       description: description,
  //       pricePerDay: pricePerDay,
  //       isOrderPlaced: isOrderPlaced,
  //     },
  //   },
  //   { new: true }
  // )

  if (updatedItem) {
    res.json(updatedItem)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

// @desc fetch all AVAILABLE rental Items isOrderPlaced == false in batches of 5
// @route GET /api/items/available
// @access Public
const getItemsAvailable = asyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const filter = {
    ...keyword,
    isOrderPlaced: false,
  }

  const count = await Item.countDocuments(filter)
  const items = await Item.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  if (items.length > 0) {
    res.json({ items, page, pages: Math.ceil(count / pageSize) })
  } else {
    res.status(404)
    throw new Error('No available items found')
  }
})

// @desc fetch all items by user ID
// @route GET /api/items/:ownerId
// @access Private
const getItemsByOwnerId = asyncHandler(async (req, res) => {
  const ownerId = req.params.ownerId
  const items = await Item.find({ owner: ownerId })

  const itemsPerPage = 10
  const pages = Math.ceil(items.length / itemsPerPage)
  const page = 1 // You can update this value based on the request's query parameters.

  if (items.length > 0) {
    res.json({ items: items, pages: pages, page: page })
  } else {
    res.json({ items: [], pages: 0, page: 0 })
    // res.status(404)
    // throw new Error('No items found for this owner')
  }
})

// @desc fetch all items by user ID
// @route GET /api/items/:renterId
// @access Private
const getItemsByRenterId = asyncHandler(async (req, res) => {
  const renterId = req.params.renterId
  const items = await Item.find({ renter: renterId })

  if (items.length > 0) {
    res.json(items)
  } else {
    res.status(404)
    throw new Error('No items found for this owner')
  }
})

// @desc Delete an item
// @route DELETE /api/items/:id
// @access Private/Admin
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (item) {
    await Item.deleteOne({ _id: item._id })
    res.json({ message: 'Item removed' })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

// @desc Create new review
// @route POST /api/items/:id/reviews
// @access Private
const createItemReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  console.log(rating, comment)

  const item = await Item.findById(req.params.id)

  if (item) {
    const alreadyReviewed = item.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Item already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    item.reviews.push(review)

    item.numReviews = item.reviews.length

    item.rating =
      item.reviews.reduce((acc, item) => item.rating + acc, 0) /
      item.reviews.length

    await item.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

export {
  getItems,
  getItemsById,
  addItem,
  deleteItemsById,
  updateItem,
  getItemsAvailable,
  getItemsByOwnerId,
  getItemsByRenterId,
  deleteItem,
  createItemReview,
}
