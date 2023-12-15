import axios from "node_modules/axios/index";

export default function XMAS_ResolveUser(name, email, token) {
  let timestamp = new Date().toISOString();

  let testName = "";

  //////console.log(token, "Resolve User -- client-side invoked");

  return axios
    .post("https://server.giftee.io/xmas_resolveUser", {
      name: name,
      email: email,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      //////console.log(response.data);
      // testName = response.data
      return response.data;

      //should I just write the localstorage here
      //or should I handle it in the other function?
    })
    .catch((error) => {
      console.error(error);
      //////console.log("UNSUCCESSFUL GET OR CREATE REQUEST");
    });
}
