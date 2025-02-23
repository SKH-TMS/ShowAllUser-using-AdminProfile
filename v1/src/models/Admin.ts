import mongoose, { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define IAdmin interface
export interface IAdmin extends Document {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contact?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  profilepic: string;
  userType: string;
}

// Define Admin Schema
const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    contact: { type: String },
    profilepic: { type: String, required: true },
    userType: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Pre-save hook to hash password before saving
adminSchema.pre("save", async function (next) {
  const admin = this as IAdmin;

  if (admin.isModified("password") && admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }

  next();
});

// Method to compare passwords (for login)
adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export Admin Model
const Admin =
  models?.Admin || model<IAdmin>("Admin", adminSchema, "register_Admin");

export default Admin;
