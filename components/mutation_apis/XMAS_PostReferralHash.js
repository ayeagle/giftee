import axios from "node_modules/axios/index";
import { getGroupObject, updateGroupObject } from "../data_management/curr_group_data";

let testName = "";

export default function XMAS_PostReferralHash(group_id, hash, token) {
  ////console.log("Post group code send -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_postReferralHash", {
      group_id: group_id,
      hash: hash,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      ////console.log("this is the response which we will set group_id to + " + response.data);
      // localStorage.setItem('group_id', response.data)

      // temp.group_id = response.data

      // updateGroupObject(temp)

      return response.data;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("get group object  UNSUCCESSFUL REQUEST");
    });
}
