import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Explore from "./Explore";

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

  const [currPageCode, setCurrPageCode] = useState(<Explore />);

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
