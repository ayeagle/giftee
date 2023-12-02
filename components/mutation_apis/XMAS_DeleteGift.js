import axios from "node_modules/axios/index";

export default function XMAS_DeleteGift(
  user_id,
  gift_id,
  token
) {

  return axios
    .post(
      "https://server.giftee.io/xmas_deleteGift",
      {
        user_id: user_id,
        gift_id: gift_id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      //console.log("gift deleted yay it worked hehe");
    })
    .catch((error) => {
      //console.log("UNSUCCESSFUL  gift deletion  CREATION REQUEST");
      console.error(error);
    });
}
