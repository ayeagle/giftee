import axios from "node_modules/axios/index";
import { getGroupObject, updateGroupObject } from "../data_management/curr_group_data";

let testName = "";

export default function XMAS_PostGroupObject(name, mode, description, gift_exchange_time, user_id, token) {
  let temp = getGroupObject();
  let timestamp = new Date().toISOString();

  ////console.log("Post Group Object -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_postGroupObject", {
      name: name,
      mode: mode,
      // participants: participants,
      description: description,
      timestamp: timestamp,
      gift_exchange_time: gift_exchange_time,
      user_id: user_id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      ////console.log(response.data);
      localStorage.setItem("group_id", response.data.id);

      // temp.group_id = response.data.id

      // updateGroupObject(temp)

      return response.data.id;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("get group object  UNSUCCESSFUL REQUEST");
    });
}
