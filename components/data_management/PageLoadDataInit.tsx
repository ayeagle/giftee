import XMAS_ResolveUser from "../mutation_apis/XMAS_ResolveUser";
import XMAS_GetAllGroupsData from "../mutation_apis/XMAS_GetAllGroupsData";
import XMAS_GetGroupObject from "../mutation_apis/XMAS_GetGroupObject";
import XMAS_AddGroupUsers from "../mutation_apis/XMAS_AddGroupUsers";
import * as local from "./CurrGroupData";
import { useEffect } from "react";
import XMAS_GetUserData from "../mutation_apis/XMAS_GetUserData";
import {
  initGroupObject,
  updateAllGroups,
  updateUserData,
} from "./CurrGroupData";
import { User, useAuth0 } from "@auth0/auth0-react";

let local_user_id;
let main_group_id;
let ref_group_id;
let user_name;

type PageLoadDataInitProps = {
  token: string;
  user: User;
};

export default function PageLoadDataInit(props: PageLoadDataInitProps) {
  execUseEffect();

  //////////////////////
  //////////////////////
  //////////////////////

  async function execUseEffect() {
    let refid_array = window.location.href.split("?");
    let refid = refid_array.pop();
    let slug = window.location.href.split("/").pop();

    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get("refid");
    localStorage.setItem("refid", referralCode);

    await props.user;
    let tempid = localStorage.getItem("user_id");
    if (tempid && tempid != "0") {
      await grabUserData();
      await grabGroupData();
      await grabAllGroupsData();
    } else if (window.location.href.split("/").pop() != "begin") {
      await props.user;
      let promise = XMAS_ResolveUser(
        props.user.name,
        props.user.email,
        props.token
      );
      promise.then(async (data) => {
        localStorage.setItem("user_name", props.user.name);
        localStorage.setItem("user_id", data.user_id);
        await grabUserData();
        await grabGroupData();
        await grabAllGroupsData();
      });
    }
  }

  //////////////////////
  //////////////////////
  //////////////////////
  //need to delete the localstorage upon logout

  const grabUserData = async () => {
    let promise = XMAS_GetUserData(
      localStorage.getItem("user_id"),
      props.token
    );
    promise.then((data) => {
      updateUserData(data);
    });
  };

  //////////////////////
  //////////////////////
  //////////////////////

  const grabGroupData = async () => {
    ref_group_id = localStorage.getItem("ref_group_id");
    user_name = localStorage.getItem("user_name");
    local_user_id = localStorage.getItem("user_id");
    if (ref_group_id) {
      let promise = XMAS_AddGroupUsers({
        user_ids_array: [local_user_id],
        user_names_array: [user_name],
        group_id: ref_group_id,
        token: props.token,
      });
      localStorage.removeItem("ref_group_id");
      promise.then((data) => {
        ////console.log("Posted user update from referral");
      });
    }
  };

  const grabAllGroupsData = async () => {
    let allGroups = XMAS_GetAllGroupsData({
      user_id: local_user_id,
      token: props.token,
    });
    await props.user;

    allGroups.then((data) => {
      updateAllGroups(data, "page load init");
      if (!localStorage.getItem("group_id")) {
        if (data.length > 1) {
          main_group_id = data[0].id;
        } else {
          main_group_id = -1;
        }
      } else {
        main_group_id = localStorage.getItem("group_id");
      }
      localStorage.setItem("group_id", main_group_id);
      if (main_group_id != -1) {
        let mainGroup = XMAS_GetGroupObject({
          xmas_group_id: main_group_id,
          token: props.token,
        });
        mainGroup.then((data) => {
          initGroupObject(data, "pageloadinit local update");
        });
      }
    });
  };
}
