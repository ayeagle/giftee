import axios from "node_modules/axios/index";
import { getGroupObject, initGroupObject } from "../data_management/curr_group_data";
import { useAuth0 } from "@auth0/auth0-react";

export default async function XMAS_SetTaken(taken_value, gift_unique_id, giver_id, giver_name, token) {
  let curr_group = getGroupObject();
  let testName = "";

  ////console.log("Set Taken -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_setTaken", {
      taken_value: taken_value,
      gift_unique_id: gift_unique_id,
      giver_id: giver_id,
      giver_name: giver_name,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      ////console.log(response.data);
      testName = response.data;
      let giftIndex = curr_group_data.gifts.findIndex((gift) => gift.unique_id === gift_unique_id);

      if (giftIndex !== -1) {
        curr_group_data.gifts[giftIndex].taken = taken_value;
      }

      initGroupObject(curr_group, "taken api");

      ////console.log("the login request was successful");
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("UNSUCCESSFUL LOGIN REQUEST");
    });
}
