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
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_RESET,
  ITEM_CREATE_REVIEW_REQUEST,
  ITEM_CREATE_REVIEW_SUCCESS,
  ITEM_CREATE_REVIEW_FAIL,
  ITEM_CREATE_REVIEW_RESET,
} from '../constants/itemConstants'

export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, items: [] }
    case ITEM_LIST_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const itemMyListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_MY_LIST_REQUEST:
      return { loading: true, items: [] }
    case ITEM_MY_LIST_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ITEM_MY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// not sure if i need item inside the state = { item }
export const itemDetailsReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { loading: true, ...state }
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, item: action.payload }
    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const itemAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_ADD_REQUEST:
      return { loading: true }
    case ITEM_ADD_SUCCESS:
      return { loading: false, itemInfo: action.payload }
    case ITEM_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true }
    case ITEM_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const itemUpdateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true }
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ITEM_UPDATE_RESET:
      return { item: {} }
    default:
      return state
  }
}

export const itemReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case ITEM_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case ITEM_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case ITEM_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
