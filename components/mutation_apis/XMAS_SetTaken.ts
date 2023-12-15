import axios from "node_modules/axios/index";
import {
  getGroupObject,
  initGroupObject,
} from "../data_management/CurrGroupData";
import { useAuth0 } from "@auth0/auth0-react";

type SetTakenProps = {
  taken_value: boolean;
  gift_unique_id: string;
  giver_id: string;
  giver_name: string;
  token: string;
};

export default async function XMAS_SetTaken(props: SetTakenProps) {
  let curr_group_data = await getGroupObject();
  let testName = "";

  //////console.log("Set Taken -- client-side invoked");

  return axios
    .post(
      "https://server.giftee.io/xmas_setTaken",
      {
        taken_value: props.taken_value,
        gift_unique_id: props.gift_unique_id,
        giver_id: props.giver_id,
        giver_name: props.giver_name,
      },
      {
        headers: { Authorization: `Bearer ${props.token}` },
      }
    )
    .then((response) => {
      //////console.log(response.data);
      testName = response.data;
      let giftIndex = curr_group_data.gifts.findIndex(
        (gift) => gift.gift_id === props.gift_unique_id
      );

      if (giftIndex !== -1) {
        curr_group_data.gifts[giftIndex].taken = props.taken_value;
      }


      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // initGroupObject(curr_group_data.gifts, "taken api");
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE
      // POTENTIALLY NEED TO RE-INCLUDE

      //////console.log("the login request was successful");
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      //////console.log("UNSUCCESSFUL LOGIN REQUEST");
    });
}
