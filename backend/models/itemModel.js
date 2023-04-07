import mongoose from "mongoose";

// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   } 
// ); 

const itemSchema = mongoose.Schema( 
  {
    // owner is the user who added the item currently all items on items is made by the admin
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "owner",
    },
    // when item is not being rented do i need to have renter attribute? maybe not
    /* renter: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "renter",
    }, */
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,  
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
