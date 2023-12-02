import { getGroupObject, updateGroupObject } from "../data_management/curr_group_data";
import axios from "node_modules/axios/index";

let testName = "";

export default function XMAS_CheckUser(xmas_group_name, token) {
  // let temp = getGroupObject();

  // ////console.log("Check User -- client-side invoked");

  // return axios
  //   .post("https://server.giftee.io/xmas_checkUser", {
  //     xmas_group_name: xmas_group_name,
  //   },
  //   {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   .then((response) => {
  //     temp.group_id = response.data.id;
  //     temp.group_members = response.data.participants;
  //     temp.group_name = response.data.name;

  //     updateGroupObject(temp);

  //     return response.data;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     ////console.log("XMAS user check UNSUCCESSFUL REQUEST");
  //   });
}
