import axios from "node_modules/axios/index";

type AddGiftProps = {
  user_id: string;
  user_name: string;
  group_id: string;
  giftName: string;
  giftURL: string;
  giftCost: number;
  giftDetails: string;
  attachedGroups: string[];
  token: string;
};

export default function XMAS_AddGift(
  props: AddGiftProps) {
  let timestamp = new Date().toISOString();

  let testName = "";

  return axios
    .post(
      "https://server.giftee.io/xmas_addGift",
      {
        user_id: props.user_id,
        user_name: props.user_name,
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
    });
}
