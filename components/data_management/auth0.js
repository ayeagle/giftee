// // async function login() {
// //     ////console.log("the login function was triggered")
// //     try {
// //       const response = await axios.get('https://server.giftee.io/login');
// //       // handle response if necessary
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   }
// //   login()

// import axios from "node_modules/axios/index";
// // import { getGroupObject, updateGroupObject } from "../data_management/curr_group_data";

// // let testName = ''

// export default function auth0() {
//   ////console.log("The client side auth has been triggered");

//   return axios
//     // .post("https://server.giftee.io/auth0", {})

//     .post("https://localhost:3000", {})
//     .then((response) => {
//       ////console.log("this is the response which we will set group_id to + " + response.data[0].id);
//     })
//     .catch((error) => {
//       console.error(error);
//       ////console.log("get auth0  UNSUCCESSFUL REQUEST");
//     });
// }
