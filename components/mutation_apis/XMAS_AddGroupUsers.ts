import axios from "node_modules/axios/index";

type AddGroupUsersProps = {
  user_ids_array: string[];
  user_names_array: string[];
  group_id: string;
  token: string;
};

export default function XMAS_AddGroupUsers(props: AddGroupUsersProps) {
  // let curr_group = getGroupObject()
  let testName = "";

  //////console.log("Add group users -- client-side invoked");

  return axios
    .post(
      "https://server.giftee.io/xmas_addGroupUsers",
      {
        group_id: props.group_id,
        user_names_array: props.user_names_array,
        user_ids_array: props.user_ids_array,
      },
      {
        headers: { Authorization: `Bearer ${props.token}` },
      }
    )
    .then((response) => {
      //////console.log(response.data);
      testName = response.data;

      //////console.log("the add users request was successful");
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      //////console.log("UNSUCCESSFUL LOGIN REQUEST");
    });
}
