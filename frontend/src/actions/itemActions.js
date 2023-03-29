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

export const addItem =
  (
    owner,
    name,
    image,
    brand,
    category,
    description,
    pricePerDay,
    startDate,
    endDate
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ITEM_ADD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/items",
        {
          owner,
          name,
          image,
          brand,
          category,
          description,
          pricePerDay,
          startDate,
          endDate,
        },
        config
      );

      dispatch({
        type: ITEM_ADD_SUCCESS,
        payload: data,
      });

      //do i really need this? probably not..
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

// export const addItem =
// (
//   owner,
//   name,
//   image,
//   brand,
//   category,
//   description,
//   pricePerDay,
//   startDate,
//   endDate
// ) =>
// async (dispatch) => {
//   try {
//     // Validate input parameters
//     if (
//       !owner ||
//       !validator.isString(owner) ||
//       !name ||
//       !validator.isString(name) ||
//       !image ||
//       !validator.isURL(image) ||
//       !brand ||
//       !validator.isString(brand) ||
//       !category ||
//       !validator.isString(category) ||
//       !description ||
//       !validator.isString(description) ||
//       !pricePerDay ||
//       !validator.isFloat(pricePerDay) ||
//       !startDate ||
//       !validator.isISO8601(startDate) ||
//       !endDate ||
//       !validator.isISO8601(endDate)
//     ) {
//       throw new Error("Invalid input parameters");
//     }

//     dispatch({ type: ITEM_ADD_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "/api/items",
//       {
//         owner,
//         name,
//         image,
//         brand,
//         category,
//         description,
//         pricePerDay,
//         startDate,
//         endDate,
//       },
//       config
//     );

//     dispatch({
//       type: ITEM_ADD_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ITEM_ADD_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
