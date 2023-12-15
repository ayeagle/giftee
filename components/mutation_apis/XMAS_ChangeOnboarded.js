import axios from "node_modules/axios/index";


export default function XMAS_ChangeOnboarded(user_id, value, token) {

 
    //////console.log("Change onboarded -- client-side invoked");

    return axios.post('https://server.giftee.io/xmas_changeOnboarded', {
        user_id: user_id,
        value: value,
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
            //////console.log("UNSUCCESSFUL xmas onboard chnage REQUEST")
        })


}
