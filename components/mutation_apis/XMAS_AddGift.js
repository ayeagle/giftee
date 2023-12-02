import axios from "node_modules/axios/index";

export default function XMAS_AddGift(
  user_id,
  user_name,
  group_id,
  giftName,
  giftURL,
  giftCost,
  giftDetails,
  attachedGroups,
  token
) {
  let timestamp = new Date().toISOString();

  let testName = "";

  ////console.log("Add Gift -- client-side invoked");

  return axios
    .post(
      "https://server.giftee.io/xmas_addGift",
      {
        user_id: user_id,
        user_name: user_name,
        group_id: group_id,
        giftName: giftName,
        giftURL: giftURL,
        giftCost: giftCost,
        giftDetails: giftDetails,
        attachedGroups: attachedGroups,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      //console.log("it worked hehe");

      testName = response.data;
      return response.data;
    })
    .catch((error) => {
      //console.log("UNSUCCESSFUL  gift add  CREATION REQUEST");
      //console.log("UNSUCCESSFUL  gift add  CREATION REQUEST");
      //console.log("UNSUCCESSFUL  gift add  CREATION REQUEST");
      console.error(error);

      //console.log("UNSUCCESSFUL  gift add  CREATION REQUEST");
    });
}
