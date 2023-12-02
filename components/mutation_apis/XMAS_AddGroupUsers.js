import axios from "node_modules/axios/index";
import { getGroupObject, updateGroupObject } from "../data_management/curr_group_data";

export default function XMAS_AddGroupUsers(user_ids_array, user_names_array, group_id, token) {
  // let curr_group = getGroupObject()
  let testName = "";

  ////console.log("Add group users -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_addGroupUsers", {
      group_id: group_id,
      user_names_array: user_names_array,
      user_ids_array: user_ids_array,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      ////console.log(response.data);
      testName = response.data;

      ////console.log("the add users request was successful");
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("UNSUCCESSFUL LOGIN REQUEST");
    });
}
