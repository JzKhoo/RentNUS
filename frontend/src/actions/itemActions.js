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
  ITEM_UPDATE_FAIL
} from '../constants/itemConstants'

export const listItems =
  (keyword = '', pageNumber = '') =>
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

    const { data } = await axios.post('/api/items', formData, config)

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

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/items/${id}`, config)

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

export const updateItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({ 
      type: ITEM_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application.json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/items/${item._id}`, item, config)

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