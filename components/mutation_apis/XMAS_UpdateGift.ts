import axios from "node_modules/axios/index";

type UpdateGiftProps = {
  user: string;
  group_id: string;
  giftName: string;
  giftURL: string;
  giftCost: number;
  giftDetails: string;
  attachedGroups: string[];
  gift_id: string;
  token: string;
};

export default function XMAS_UpdateGift(props: UpdateGiftProps) {
  let timestamp = new Date().toISOString();

  let testName = "";

  ////console.log("Update Gift -- client-side invoked");

  return axios
    .post(
      "https://server.giftee.io/xmas_updateGift",
      {
        gift_id: props.gift_id,
        user: props.user,
        group_id: props.group_id,
        giftName: props.giftName,
        giftURL: props.giftURL,
        giftCost: props.giftCost,
        giftDetails: props.giftDetails,
        attachedGroups: props.attachedGroups,
      },
      {
        headers: { Authorization: `Bearer ${props.token}` },
      }
    )
    .then((response) => {
      testName = response.data;
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("UNSUCCESSFUL  gift update  CREATION REQUEST");
    });
}
