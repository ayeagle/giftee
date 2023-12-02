import AddGiftUnit from "@components/xmas/AddGiftUnit";
import Loading from "@components/xmas/Loading";
import { useEffect, useState } from "react";
import styles from "./tempInvite.module.css";
import Spacer from "@components/Spacer";
import { getGroupObject } from "@components/data_management/curr_group_data";
import Gifts from "@components/xmas/Gifts";
import HomeTop from "@components/xmas/HomeTop";
import HomeBottom from "@components/xmas/HomeBottom";
import XMAS_GetGroupObjectReferral from "@components/mutation_apis/XMAS_GetGroupObjectReferral";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "@components/xmas/NavBar";
import ReferralLink from "@components/xmas/ReferralLink";
import LoadingPage from "@components/xmas/LoadingPage";
import ReferralAccept from "@components/xmas/ReferralAccept";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";

let curr_group;
let referralCode;

export default function tempInvite({errorHappening, setErrorHappening}) {
  const [groupData, setGroupData] = useState("");
  const [groupName, setGroupName] = useState("");
  const [oneOpen, setOneOpen] = useState(false);
  const [currPageName, setCurrPageName] = useState("explore");
  const [runOnce, setRunOnce] = useState(0);
  const [dataChange, setDataChange] = useState(false);
  const [userName, setUserName] = useState("");
  const [validHash, setValidHash] = useState(false);
  const [refGroup, setRefGroup] = useState();
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [refLinkPrompt, setRefLinkPrompt] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get("refid");

    localStorage.setItem("refid", referralCode);

    if (referralCode) {
      getReferralGroup(referralCode);

      //check referral code

      // prompt(`You were referred by someone with the code ${referralCode}. Would you like to join the group?`);
    } else {
      // If no referral code was found, simply show the group joining page
      // showGroupJoinPage();
      ////console.log("NO NON OREFERRAL TRIGGERED");
      setRefLinkPrompt("Hmmmm no group referral code provided...");

      //looks like there's no referral code
      //redirecting you now........
    }
  }, []);

  const getReferralGroup = async (refid) => {
    // const token = await getAccessTokenSilently();

    let promise = XMAS_GetGroupObjectReferral(refid);

    promise.then((data) => {

      if (data.length == 0) {
        setRefLinkPrompt("Ruh roh that's not a valid referral link");
      } else {
        setRefLinkPrompt("");
        setValidHash(true);
        setRefGroup(data[0]);
      }
    });
  };

  // const [groupName, setGroupName] = useState('')

  ////console.log("EXPLORE PAGE EXPLORE PAGE");
  ////console.log(curr_group);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const curr_group = await getGroupObject();
        setGroupName(localStorage.getItem("group_name"));
        setGroupData(curr_group);
        // ////console.log(
        //   "EXPLOREEXPLOREEXPLOREEXPLOREEXPLOREEXPLOREEXPLORE PAGE EXPLORE PAGE"
        // );

        ////console.log(curr_group);
      } catch (error) {
        console.error("Error fetching group data", error);
      }
    };
    fetchData();
  }, [oneOpen, dataChange, groupData]);

  return (
    <>
      {/* <PageLoadDataInit /> */}
      {/* <div
                style={{
                    backgroundColor: oneOpen ? "rgba(0, 0, 0, 0.657)" : "",
                    background: oneOpen ? "rgba(0, 0, 0, 0.657)" : "",
                    top: "0px",
                    position: "fixed",
                    width: "100%",
                    zIndex: "100000",
                }}
            > */}
      <LoadingPage />
      <div className={styles.gift_header_container}>
        <div className={styles.gift_header}>
          <div
            className={styles.giftly_style}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1>Giftee.io</h1>
            {/* <div style={{ fontSize: "2vw" }}>Give a little {":)"}</div> */}
          </div>
          <NavBar />
          {/* <img src="/IMGassets/bow.png" className={styles.image} /> */}
          {/* <a href='/begin' style={{ textDecoration: "none", color: "white" }}> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "2vw",
            }}
          ></div>
          {/* </a> */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "1.8vw",
            }}
            onClick={() => setCurrPageName("profile")}
          ></div>
        </div>
      </div>
      {/* <NavBar currPageName={currPageName} setCurrPageName={setCurrPageName} /> */}
      {/* {currPageCode} */}
      {/* <Explore  oneOpen={oneOpen} setOneOpen={setOneOpen} groupData={groupData} setGroupData={setGroupData}/>
                <AddGift /> */}
      {/* <Spacer height="15vh"/> */}
      <MasterBodyContainer>
        <ReferralAccept />
      </MasterBodyContainer>

      <HomeBottom />
    </>
  );
}
