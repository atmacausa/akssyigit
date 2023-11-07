import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Ürün adı zorunludur"],
    minlength: [3, "Ürün adı en az 3 karakterden oluşmalı"],
    maxlength: [20, "Ürün adı en fazla 20 karakterden oluşmalı"],
  },
  price: {
    type: String,
    required: [true, "Ürün fiyatı zorunludur"],
  },
  description: {
    type: String,
    required: [true, "Ürün açıklaması zorunludur"],
    minlength: [3, "Ürün açıklaması en az 3 karakterden oluşmalı"],
    maxlength: [200, "Ürün açıklaması en fazla 200 karakterden oluşmalı"],
  },
  image: {
    type: String,
    //required: [true, "Ürün resmi zorunludur"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
