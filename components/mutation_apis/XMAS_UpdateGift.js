import axios from "node_modules/axios/index";

export default function XMAS_UpdateGift(
  user,
  group_id,
  giftName,
  giftURL,
  giftCost,
  giftDetails,
  attachedGroups,
  gift_id, token
) {
  let timestamp = new Date().toISOString();

  let testName = "";

  ////console.log("Update Gift -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_updateGift", {
      gift_id: gift_id,
      user: user,
      group_id: group_id,
      giftName: giftName,
      giftURL: giftURL,
      giftCost: giftCost,
      giftDetails: giftDetails,
      attachedGroups: attachedGroups,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      testName = response.data;
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("UNSUCCESSFUL  gift update  CREATION REQUEST");
    });
}
