import axios from "node_modules/axios/index";
import { getGroupObject } from "../data_management/CurrGroupData";

let testName = "";

type GetAllGroupsDataProps = {
  user_id: string;
  token: string;
};

export default function XMAS_GetAllGroupsData(props: GetAllGroupsDataProps) {
  ////console.log(token, "Get Group Object -- client-side invoked");

  return axios
    .post(
      "https://server.giftee.io/xmas_getAllGroupsData",
      {
        user_id : props.user_id,
      },
      {
        headers: { Authorization: `Bearer ${props.token}` },
      }
    )
    .then((response) => {
      let localData = response.data.map((group) => ({
        ...group, // spread operator to copy all properties from the server data
        user_ids: [...group.user_ids], // copy the user_ids array to avoid modifying the original data
        user_names: [...group.user_names], // copy the user_names array to avoid modifying the original data
        gift_exchange_date: new Date(
          group.gift_exchange_time * 1000
        ).toLocaleDateString("default"),
      }));

      return localData;
    })
    .catch((error) => {
      console.error(error);
      //////console.log("get group object  UNSUCCESSFUL REQUEST");
      // //////console.log(temp)
    });
}
