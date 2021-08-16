import { failure, success } from "../embeds/embedFunctions";
import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { getRobloxName } from "../functions/getRobloxName";
import {
  identifyDiscordProfile,
  identifyRobloxProfile,
} from "../functions/identifyProfile";

import { updateNickname } from "../functions/updateNickname";

const User = mongoose.model("Users", ProfileSchema);

module.exports = {
  name: "manual",
  description: "The stupid shit",
  async execute(msg, args) {
    msg.channel.send("Anything for you baby.");
    let guild = msg.guild;
    console.log(guild);
    let members = guild.members;
    members.fetch().then((list) => {
      let p = 0;
      let x = 0;
      list.forEach((element) => {
        x++;
        setTimeout(list, 300 * x);
        async function list() {
          p++;
          console.log(p);
          if (element.bot) return;
          const id = element.id;
          console.log(id);
          const roles = element._roles;
          let profile = await identifyDiscordProfile(id);
          if (!profile) return;
          let robloxId = profile.RobloxId;
          //console.log(x);
          const robloxUserName = await getRobloxName(robloxId);
          updateNickname(element);
          User.updateOne(
            { RobloxId: robloxId },
            { $set: { RobloxUserName: robloxUserName, Roles: roles } },
            (err, doc) => {
              if (err) throw err;
              console.log(doc);
            }
          );
        }
      });
    });
  },
};
