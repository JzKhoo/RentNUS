import axios from 'axios'
import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_MY_LIST_REQUEST,
  ITEM_MY_LIST_SUCCESS,
  ITEM_MY_LIST_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
  ITEM_ADD_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_RESET,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_CREATE_REVIEW_REQUEST,
  ITEM_CREATE_REVIEW_SUCCESS,
  ITEM_CREATE_REVIEW_FAIL,
} from '../constants/itemConstants'
import { logout } from './userActions'

export const listItemsAvailable =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ITEM_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/items/available?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: ITEM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ITEM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listItems =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ITEM_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/items?keyword=${keyword}&pageNumber=${pageNumber}`
      )

      dispatch({
        type: ITEM_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ITEM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listMyItems = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_MY_LIST_REQUEST })

    const { data } = await axios.get(`/api/items/owner/${userId}`)

    dispatch({
      type: ITEM_MY_LIST_SUCCESS,
      payload: {
        items: data.items,
        pages: data.pages,
        page: data.page,
      },
    })
  } catch (error) {
    dispatch({
      type: ITEM_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/items/${id}`)

    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addItem = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_ADD_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/items/create', formData, config)

    dispatch({ type: ITEM_ADD_SUCCESS, payload: data })
    localStorage.setItem('itemInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ITEM_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    var config = {
      method: 'delete',
      url: `/api/items/delete/${id}`,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }
    };
    await axios(config)


    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // }

    // await axios.delete(`/api/items/${id}`, config)

    dispatch({
      type: ITEM_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ITEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateItem = (itemId, formData) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: ITEM_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    // const config = {
    //   headers: {
    //     'Content-Type': 'application.json',
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // }

    // const { data } = await axios.put(`/api/items/${itemId}`, formData, config)

    var dataInput = JSON.stringify({
      "name": formData.get("name"),
      "brand": formData.get("brand"),
      "category": formData.get("category"),
      "description": formData.get("description"),
      "pricePerDay": formData.get("pricePerDay"),
      "startDate": formData.get("startDate"),
      "endDate": formData.get("endDate")

    });

    console.log("form data:" + formData.get("name"))
    
    var config = {
      method: 'put',
      url: `/api/items/updateitem/${itemId}`,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      data : dataInput
    };
    const { data } = axios(config)

    dispatch({ type: ITEM_UPDATE_SUCCESS })
    
    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createItemReview =
  (itemId, rating, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ITEM_CREATE_REVIEW_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      // const config = {
      //   headers: {
      //     'Content-Type': 'application.json',
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // }

      // await axios.post(`/api/items/${itemId}/reviews`, review, config)

      var dataInput = JSON.stringify({
        rating: rating,
        comment: comment,
      })

      var config = {
        method: 'post',
        url: `/api/items/reviews/${itemId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: dataInput,
      }
      await axios(config)

      dispatch({ type: ITEM_CREATE_REVIEW_SUCCESS })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ITEM_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }