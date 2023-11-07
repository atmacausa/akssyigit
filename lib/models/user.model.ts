import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "İsim zorunludur"],
  },
  surname: {
    type: String,
    required: [true, "Soyad zorunludur"],
  },
  email: {
    type: String,
    required: [true, "Email zorunludur"],
    unique: [true, "Bu email zaten alınmış"],
  },
  password: {
    type: String,
    required: [true, "Şifre zorunludur"],
    minlength: [6, "Şifre en az 6 karakterden oluşmalı"],
    maxlength: [20, "Şifre en fazla 20 karakterden oluşmalı"],
  },
  phone: {
    type: String,
    maxlength: [11, "Telefon numarası en fazla 11 karakterden oluşmalı"],
    required: [true, "Telefon numarası zorunludur"],
    unique: [true, "Bu telefon numarası zaten alınmış"],
  },
  address: {
    type: String,
    required: [true, "Adres zorunludur"],
  },
  city: {
    type: String,
    required: [true, "Şehir zorunludur"],
  },
  district: {
    type: String,
    required: [true, "İlçe zorunludur"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ownedProducts: [
    {
      type: Array,
      default: [],
    },
  ],
  logIns: [
    {
      type: String,
      default: [],
    },
  ],
  isAccountCompleted: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPasswordChangeState: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
