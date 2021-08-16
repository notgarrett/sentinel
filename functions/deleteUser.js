import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";

const User = mongoose.model("Users", ProfileSchema);

export const deleteUser = async (member) => {
  User.deleteOne({ DiscordId: member.user.id });
  console.log("They are gone.");
};
