import { failure, success, notification } from "../embeds/embedFunctions";
import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { identifyDiscordProfile } from "../functions/identifyProfile";
const User = mongoose.model("Users", ProfileSchema);

module.exports = {
  name: "balance",
  description: "balance",
  async execute(msg) {
    let docs = await identifyDiscordProfile(msg.member.id);

    if (!docs) {
      failure(msg.channel, "Failure!", "You are not in the database!");
      return;
    }

    let meritum = 0;
    let capitum = 0;

    if (docs.Meritum) meritum = parseInt(docs.Meritum);
    if (docs.Capitum) capitum = parseInt(docs.Capitum);
    notification(
      msg.channel,
      "Balance.",
      `You have ${meritum} Meritum and ${capitum} Capitum!`
    );
  },
};
