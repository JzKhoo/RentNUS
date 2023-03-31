import axios from "axios";
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

export const listItems = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });

    const { data } = await axios.get("/api/items");

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

export const listItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/items/${id}`);

    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addItem = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/items", formData, config);

    dispatch({ type: ITEM_ADD_SUCCESS, payload: data });
    localStorage.setItem("itemInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ITEM_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};