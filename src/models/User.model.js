import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema  = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
         email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    }
},
{timestamps: true}
)

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// 🔑 compare password (IMPORTANT)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default UserModel;