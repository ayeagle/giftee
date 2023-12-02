import axios from "node_modules/axios/index";
import { getGroupObject, updateGroupObject } from "../data_management/CurrGroupData";


export default function XMAS_GetGroupObjectReferral(xmas_referral_hash, token) {

  ////console.log("Get Group Object by REF -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_getGroupObjectReferral", {
      xmas_referral_hash: xmas_referral_hash,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      ////console.log("RIGHT BEFORE THE ASSIGNMENT FUNCTION");
      ////console.log(response.data);
      return response.data;

    })
    .catch((error) => {
      console.error(error);
      ////console.log("get group object  UNSUCCESSFUL REQUEST");
      // ////console.log(temp)
    });
}
