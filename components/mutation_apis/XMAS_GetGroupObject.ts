import axios from "node_modules/axios/index";

type GetGroupObjectProps = {
  xmas_group_id: string;
  token: string;
};

export default function XMAS_GetGroupObject(props: GetGroupObjectProps) {
  return axios
    .post(
      "https://server.giftee.io/xmas_getGroupObject",
      {
        xmas_group_id: props.xmas_group_id,
      },
      {
        headers: { Authorization: `Bearer ${props.token}` },
      }
    )
    .then((response) => {
      //console.log("RIGHT BEFORE THE ASSIGNMENT FUNCTION");
      //console.log(response.data);

      return response.data;
    })
    .catch((error) => {
      console.error(error);
      ////console.log("get group object  UNSUCCESSFUL REQUEST");
      // ////console.log(temp)
    });
}
