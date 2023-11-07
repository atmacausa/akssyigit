import { model, models, Schema } from "mongoose";

const ResetPasswordSchema = new Schema({
  email: {
    type: String,
    required: [true, "email zorunludur"],
  },
  code: {
    type: String,
    required: [true, "code zorunludur"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const ResetPassword =
  models.ResetPassword || model("ResetPassword", ResetPasswordSchema);

export default ResetPassword;
