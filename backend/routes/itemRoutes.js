import express from 'express'
import multer from 'multer'
import { protect, admin } from '../middleware/authMiddleware.js'
import * as path from 'path'

const router = express.Router()
import {
  addItem,
  getItems,
  getItemsById,
  deleteItemsById,
  updateItem,
  getItemsAvailable,
  getItemsByOwnerId,
  getItemsByRenterId,
  deleteItem,
  createItemReview,
} from '../controllers/itemController.js'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'frontend/public/images/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({ storage })

router.route('/').get(getItems)
router.route('/available').get(getItemsAvailable)
router.route('/reviews/:id').post(protect, createItemReview)

router
  .route('/:id')
  .get(getItemsById)
  .delete(protect, admin, deleteItem)
  .put(protect, admin, updateItem)
  .delete(deleteItemsById)
  .put(updateItem)
router.route('/create').post(protect, upload.single('image'), addItem)

//might need to add protect?
router.route('/delete/:id').delete(protect, deleteItemsById)
router.route('/updateitem/:id').put(protect, updateItem)

router.route('/owner/:ownerId').get(getItemsByOwnerId)
router.route('/renter/:renterId').get(getItemsByRenterId)

export default router
