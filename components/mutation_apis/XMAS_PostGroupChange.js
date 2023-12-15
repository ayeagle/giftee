import axios from "node_modules/axios/index";
import { getGroupObject, updateGroupObject } from "../data_management/CurrGroupData";

let testName = "";

//NOT test covered

export default function XMAS_PostGroupChange(variable, updateValue, group_id, token) {
  let temp = getGroupObject();
  let timestamp = new Date().toISOString();

  //////console.log("Post Group Change -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_postGroupChange", {
      variable: variable,
      updateValue: updateValue,
      group_id: group_id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      //////console.log("this is the response which we will set group_id to + " + response.data);
      // localStorage.setItem('group_id', response.data)

      // temp.group_id = response.data

      // updateGroupObject(temp)

      return response.data;
    })
    .catch((error) => {
      console.error(error);
      //////console.log("get group object  UNSUCCESSFUL REQUEST");
    });
}
