import { getGroupRank, getSecondaryGroupRank } from "./getGroupRank";
import {
  identifyDiscordProfile,
  identifyRobloxProfile,
} from "../functions/identifyProfile";
import { getRobloxName } from "./getRobloxName";
import { academiatable, aetable } from "../ranks.json";
import { addUsername } from "./addUsername";

export const updateNickname = async (member, check) => {
  if (!member) return;

  console.log("Member exists");

  const discordId = await member.user.id;

  if (!discordId) return;

  console.log("DiscordId exists");

  const profile = await identifyDiscordProfile(discordId);

  if (!profile) {
    if (check === true) member.setNickname(`X | ${member.user.username}`);
    return;
  }

  const academiaRank = await getGroupRank(profile.RobloxId); //Academia
  const aeRank = await getSecondaryGroupRank(profile.RobloxId); //AE

  console.log(aeRank);
  console.log(academiaRank);

  if (!academiaRank) {
    member.setNickname(`X | ${member.user.username}`);
    return;
  }

  if (!aeRank) {
    console.log("Member is not in AE");
  }

  let robloxName = await getRobloxName(profile.RobloxId);
  console.log("User is in the database");

  console.log("User has a rank in academia");
  addUsername(discordId);

  if (aetable[`${aeRank}`]) {
    member.setNickname(`${aetable[`${aeRank}`]} | ${robloxName}`);
    return;
  }

  if (academiatable[`${academiaRank}`]) {
    member.setNickname(`${academiatable[`${academiaRank}`]} | ${robloxName}`);
    return;
  }
};
