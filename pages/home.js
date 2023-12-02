import { useEffect, useState } from "react";
import styles from "./xmas.module.css";
import Spacer from "@components/Spacer";
import {
  getGroupObject,
  updateGroupObject,
} from "@components/data_management/curr_group_data";
import XMAS_GetGroupObject from "@components/mutation_apis/XMAS_GetGroupObject";
import NavBar from "@components/xmas/NavBar";
// import Explore from "@components/xmas/Explore";
import AddGift from "@components/xmas/AddGiftUnit";
import Profile from "@components/xmas/Profile";
import Begin from "./begin";
import Groups from "pages/groups";
import { useAuth0 } from "@auth0/auth0-react";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";

let curr_group;

export default function Home() {
  //this file should be moving forward for when users are not logged in

  const [groupData, setGroupData] = useState("");
  const [groupName, setGroupName] = useState("");
  const [oneOpen, setOneOpen] = useState(false);
  const [currPageName, setCurrPageName] = useState("explore");
  const [runOnce, setRunOnce] = useState(0);
  const [dataChange, setDataChange] = useState(false);
  const [userName, setUserName] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();

  const [currPageCode, setCurrPageCode] = useState(
    <Explore
      oneOpen={oneOpen}
      setOneOpen={setOneOpen}
      groupData={groupData}
      setGroupData={setGroupData}
      dataChange={dataChange}
      setDataChange={setDataChange}
    />
  );

  return (
    <>
      <div
        style={{
          backgroundColor: oneOpen ? "rgba(0, 0, 0, 0.657)" : "",
          background: oneOpen ? "rgba(0, 0, 0, 0.657)" : "",
        }}
      ></div>
    </>
  );
}
