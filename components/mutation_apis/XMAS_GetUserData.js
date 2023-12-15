import axios from "node_modules/axios/index";

export default function XMAS_GetUserData(id, token) {


  //////console.log(token, "Get user data -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_getUserData", {
      id: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      //////console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      //////console.log("UNSUCCESSFUL GET USER REQUEST");
    });
}
