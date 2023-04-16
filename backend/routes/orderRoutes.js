import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyItemOrders,
  getMyOrders,
  updateOrder,
  getOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:userId').get(protect, getMyItemOrders)
router.route('/myorders/:id').get(protect, getOrderById)
router.route('/:id').put(updateOrder)

export default router
