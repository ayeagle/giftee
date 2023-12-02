import { Children, useEffect, useState } from "react";
import styles from "./Home.module.css";
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
import rootAuthCheck from "@components/data_management/rootAuthCheck";
// import Begin from "./begin";
import Groups from "pages/groups";
import PageLoadDataInit from "@components/data_management/PageLoadDataInit";
import ProfileCheck from "@components/data_management/profileCheck";
import Login from "pages/login";
import Loading from "./Loading";
// import NavBar from "@components/xmas/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "./LoadingPage";
import { isReady } from "@components/data_management/curr_group_data";
// import getStarted from "@pages/getStarted"
import MetaHead from "./MetaHead";

let position;

let curr_group;
let slug;

export default function HomeTop({ oneOpen }) {
  const [groupData, setGroupData] = useState("");
  const [groupName, setGroupName] = useState("");
  // const [oneOpen, setOneOpen] = useState(false);
  const [currPageName, setCurrPageName] = useState("");
  const [runOnce, setRunOnce] = useState(0);
  const [dataChange, setDataChange] = useState(false);
  const [userName, setUserName] = useState("");
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    error,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  const [hideMenu, setHideMenu] = useState(false);

  const [scroll, setScroll] = useState(0);

  if (dataChange) {
    setDataChange(false);
  }

  useEffect(() => {
    setGroupName(localStorage.getItem("group_name"));
    setUserName(localStorage.getItem("user_name"));
    ////console.log("this is the group_name : " + groupName);
    // slug = window.location.href.split("/").pop();
  }, []);

  useEffect(() => {
    setGroupName(localStorage.getItem("group_name"));
    setUserName(localStorage.getItem("user_name"));
    // validate()
    ////console.log("this is the group_name : " + groupName);
  }, [dataChange, setDataChange]);

  // ////console.log("%cUSER", "color: green; background: yellow; font-size: 30px");

  // console.warn(user);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      handleScroll();
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const handleScroll = () => {
    let position = window.scrollY;
    // ////console.log("position");

    // ////console.log(position);

    setScrollPosition(position);
    // ////console.log("scrollPosition");

    // ////console.log(scrollPosition);

    setScrollDistance(position - previousScrollPosition);
    // ////console.log("scrollDistance");

    // ////console.log(scrollDistance);

    setPreviousScrollPosition(position);
    // ////console.log("previousScrollPosition");

    // ////console.log(previousScrollPosition);

    if (position <= 100) {
      setScroll(0);
      setHideMenu(true);
    } else if (scrollDistance > 0) {
      setScroll(-100);
      setHideMenu(true);
    } else if (scrollDistance < 0) {
      setScroll(0);
      setHideMenu(true);
    } else {
      setScroll(Math.min(scroll + scrollDistance, 0));
      setHideMenu(false);
    }
  };


  // if (user) {
  return (
    <>
      <LoadingPage />
      <MetaHead />
      <PageLoadDataInit />
      <div
        style={{
          backgroundColor: oneOpen ? "rgba(0, 0, 0, 0.657)" : "",
          background: oneOpen ? "rgba(0, 0, 0, 0.657)" : "",
          top: `${scroll}px`,
          position: "fixed",
          maxHeight: "8vh",
          width: "100%",
          zIndex: "100000",
          transition: scroll == 0 ? ".5s" : "1s",
        }}
      >
        <div className={styles.gift_header_container}>
          <div className={styles.gift_header}>
            <div
              className={styles.giftly_style}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              href="/explore"
            >
              <h1>
                <a
                  href="/explore"
                  style={{ textDecoration: "none", color: "inherit" }}
                  className={styles.typing_animate}
                >
                  Giftee.io
                </a>
              </h1>
              {/* <div style={{ fontSize: "2vw" }}>Give a little {":)"}</div> */}
            </div>
            <NavBar
              style={{ margin: "0 auto" }}
              hideMenu={hideMenu}
              setHideMenu={setHideMenu}
            />
            {/* <img src="/IMGassets/bow.png" className={styles.image} /> */}
            {/* <a href='/begin' style={{ textDecoration: "none", color: "white" }}> */}
            {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: "2vw",
                }}
              ></div> */}
            {/* </a> */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexWrap: "wrap",
                // maxHeight: "10px",
                // fontSize: "1.8vw",
              }}
              onClick={() => setCurrPageName("profile")}
            >
              {/* <p>{userName}</p> */}
              {/* <div>{groupName}</div>
                <div>{groupData ? groupData.year : ""}</div> */}
              <button
                href="javascript:void(0)"
                style={{
                  textDecoration: "none",
                  // color: "black",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => {
                  localStorage.setItem("user_id", 0);
                  logout();
                }}
              >
                <p>Logout </p>
              </button>
            </div>
          </div>
        </div>
        {/* <NavBar currPageName={currPageName} setCurrPageName={setCurrPageName} /> */}
        {/* {currPageCode} */}
        {/* <Explore  oneOpen={oneOpen} setOneOpen={setOneOpen} groupData={groupData} setGroupData={setGroupData}/>
                <AddGift /> */}
      </div>

      {/* <Spacer height="10vh"/> */}
    </>
  );
  // }
}
