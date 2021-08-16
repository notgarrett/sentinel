const roleName = "Guardian";

export const checkBotAdmin = (msg) => {
  if (msg.member.roles.cache.find((r) => r.name === roleName)) return true;
  else return false;
};
