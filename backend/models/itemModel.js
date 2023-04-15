import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const itemSchema = mongoose.Schema(
  {
    // owner is the user who added the item currently all items on items is made by the admin
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // required to display -> myItems borrowed
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
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
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
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
    // used to check if item has an OderPlaced -> if orderPlaced remove from HomeScreen
    isOrderPlaced: {
      type: Boolean,
      required: true,
      default: false,
    }, 
    isBorrowed: {
      borrowerConfirmation: {type: Boolean, required:false, default:false},
      lenderConfirmation: {type: Boolean, required:false, default:false},
    },
    isReturned: {
      borrowerConfirmation: {type: Boolean, required:false, default:false},
      lenderConfirmation: {type: Boolean, required:false, default:false},
    },
    returnedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
