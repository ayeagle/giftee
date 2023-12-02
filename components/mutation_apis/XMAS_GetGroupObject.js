import axios from "node_modules/axios/index";
import { getGroupObject, updateGroupObject } from "../data_management/CurrGroupData";

let testName = "";

export default function XMAS_GetGroupObject(xmas_group_id, token) {
  let temp;


  return axios
    .post("https://server.giftee.io/xmas_getGroupObject", {
      // xmas_group_name: xmas_group_name,
      xmas_group_id: xmas_group_id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      //console.log("RIGHT BEFORE THE ASSIGNMENT FUNCTION");
      //console.log(response.data);
    
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("get group object  UNSUCCESSFUL REQUEST");
      // ////console.log(temp)
    });
}
