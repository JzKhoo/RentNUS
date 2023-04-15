import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  IS_BORROWED_LENDER_REQUEST,
  IS_BORROWED_LENDER_SUCCESS,
  IS_BORROWED_LENDER_FAIL,
  IS_BORROWED_BORROWER_REQUEST,
  IS_BORROWED_BORROWER_SUCCESS,
  IS_BORROWED_BORROWER_FAIL,
  ORDER_MY_ITEM_REQUEST,
  ORDER_MY_ITEM_SUCCESS,
  ORDER_MY_ITEM_FAIL,
} from '../constants/orderConstants'
import { logout } from './userActions'

export const createOrder = (order) => async (dispatch, getState) => {
  console.log(order)
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}
//payment res from paypal
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      )

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      })
    }
  }

// export const deliverOrder = (order) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_DELIVER_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.put(
//       `/api/orders/${order._id}/deliver`,
//       {},
//       config
//     )

//     dispatch({
//       type: ORDER_DELIVER_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: ORDER_DELIVER_FAIL,
//       payload: message,
//     })
//   }
// }

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

export const listMyItemOrders = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_MY_ITEM_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${userId}`, config)
    dispatch({
      type: ORDER_MY_ITEM_SUCCESS,
      payload: {
        orders: data,
      },
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_MY_ITEM_FAIL,
      payload: message,
    })
  }
}

export const setIsBorrowedBorrowerConfirmed =
  (order, orderItemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: IS_BORROWED_BORROWER_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      order.orderItems.map((orderItem) =>
        orderItem._id == orderItemId
          ? (orderItem.isBorrowed.borrowerConfirmation = true)
          : orderItem
      )

      var dataInput = JSON.stringify({
        orderItems: order.orderItems,
      })

      var config = {
        method: 'put',
        url: `/api/orders/${order._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: dataInput,
      }
      const { data } = axios(config)

      dispatch({ type: IS_BORROWED_BORROWER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: IS_BORROWED_BORROWER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const setIsBorrowedLenderConfirmed =
  (order, orderItemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: IS_BORROWED_LENDER_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      order.orderItems.map((orderItem) =>
        orderItem._id == orderItemId
          ? (orderItem.isBorrowed.lenderConfirmation = true)
          : orderItem
      )

      var dataInput = JSON.stringify({
        orderItems: order.orderItems,
      })

      var config = {
        method: 'put',
        url: `/api/orders/${order._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: dataInput,
      }
      const { data } = axios(config)

      dispatch({ type: IS_BORROWED_LENDER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: IS_BORROWED_LENDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const setIsReturnedBorrowerConfirmed =
  (order, orderItemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: IS_BORROWED_BORROWER_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      order.orderItems.map((orderItem) =>
        orderItem._id == orderItemId
          ? (orderItem.isReturned.borrowerConfirmation = true)
          : orderItem
      )

      var dataInput = JSON.stringify({
        orderItems: order.orderItems,
      })

      var config = {
        method: 'put',
        url: `/api/orders/${order._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: dataInput,
      }
      const { data } = axios(config)

      dispatch({ type: IS_BORROWED_BORROWER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: IS_BORROWED_BORROWER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const setIsReturnedLenderConfirmed =
  (order, orderItemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: IS_BORROWED_BORROWER_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      order.orderItems.map((orderItem) =>
        orderItem._id == orderItemId
          ? (orderItem.isReturned.lenderConfirmation = true)
          : orderItem
      )

      var dataInput = JSON.stringify({
        orderItems: order.orderItems,
      })

      var config = {
        method: 'put',
        url: `/api/orders/${order._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: dataInput,
      }
      const { data } = axios(config)

      dispatch({ type: IS_BORROWED_BORROWER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: IS_BORROWED_BORROWER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
