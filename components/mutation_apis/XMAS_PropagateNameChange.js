import axios from "node_modules/axios/index";
import { getGroupObject, updateGroupObject } from "../data_management/CurrGroupData";

let testName = "";

export default function XMAS_PropagateNameChange(old_name, new_name, group_id, token) {
  let temp = getGroupObject();
  let timestamp = new Date().toISOString();

  //////console.log("Propogate name change -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_propagateNameChange", {
      old_name: old_name,
      new_name: new_name,
      group_id: group_id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      //////console.log("this is the response which we will set group_id to + " + response.data);
      // localStorage.setItem('group_id', response.data)

      // temp.group_id = response.data

      updateGroupObject(temp);

      return response.data;
    })
    .catch((error) => {
      console.error(error);
      //////console.log("propagate change UNSUCCESSFUL REQUEST");
    });
}
