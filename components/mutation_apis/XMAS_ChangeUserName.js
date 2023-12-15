import axios from "node_modules/axios/index";


export default function XMAS_ChangeUserName(user_id, username, token) {

 
    //////console.log("Change user name -- client-side invoked");

    return axios.post('https://server.giftee.io/xmas_changeUserName', {
        user_id: user_id,
        username: username,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(response => {
            //////console.log(response.data)
            // testName = response.data
            return response.data
        })
        .catch(error => {
            console.error(error);
            //////console.log("UNSUCCESSFUL xmas NEW USER CREATION REQUEST")
        })


}
