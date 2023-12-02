import axios from "node_modules/axios/index";


export default function XMAS_AddNewUser(username, token) {

    let timestamp = new Date().toISOString()

    let testName = ''

    ////console.log("Add New User -- client-side invoked");

    return axios.post('https://server.giftee.io/xmas_addNewUser', {
        username: username,
        password: password,
        timestamp: timestamp
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(response => {
            ////console.log(response.data)
            testName = response.data
            return response.data
        })
        .catch(error => {
            console.error(error);
            ////console.log("UNSUCCESSFUL xmas NEW USER CREATION REQUEST")
        })


}
