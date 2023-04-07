import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
  ITEM_ADD_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAIL,
} from "../constants/itemConstants";

export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, items: [] };
    case ITEM_LIST_SUCCESS:
      return { loading: false, 
                items: action.payload.items,
                pages: action.payload.pages, 
                page: action.payload.page
              };
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// not sure if i need item inside the state = { item }
export const itemDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, item: action.payload };
    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_ADD_REQUEST:
      return { loading: true };
    case ITEM_ADD_SUCCESS:
      return { loading: false, itemInfo: action.payload };
    case ITEM_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
