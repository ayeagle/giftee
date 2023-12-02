import { useEffect, useState } from "react";
import styles from "pages/xmas.module.css";
import Spacer from "@components/Spacer";
import { getGroupObject } from "@components/data_management/CurrGroupData";
import Gifts from "@components/xmas/Gifts";
import HomeTop from "@components/xmas/HomeTop";
import HomeBottom from "@components/xmas/HomeBottom";
import Loading from "@components/xmas/Loading";
import XMAS_GetGroupObjectReferral from "@components/mutation_apis/XMAS_GetGroupObjectReferral";
import { useAuth0 } from "@auth0/auth0-react";
import ReferralAccept from "@components/xmas/ReferralAccept";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";

let curr_group;
let referralCode;

export default function Invite({errorHappening, setErrorHappening}) {
  const [groupData, setGroupData] = useState("");
  const [groupName, setGroupName] = useState("");
  const [oneOpen, setOneOpen] = useState(false);
  const [currPageName, setCurrPageName] = useState("explore");
  const [runOnce, setRunOnce] = useState(0);
  const [dataChange, setDataChange] = useState(false);
  const [userName, setUserName] = useState("");
  const [validHash, setValidHash] = useState(false);
  const [refGroup, setRefGroup] = useState();
  const { user, getAccessTokenSilently } = useAuth0();

  const [refLinkPrompt, setRefLinkPrompt] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get("refid");
    localStorage.setItem("refid", referralCode);

    if (referralCode) {
      // If a referral code was found, show a prompt to join the group
      ////console.log("REFERRAL TRIGGERED");
      ////console.log("REFERRAL TRIGGERED");
      ////console.log("REFERRAL TRIGGERED");
      ////console.log("REFERRAL TRIGGERED");
      getReferralGroup(referralCode);

      //check referral code

      // prompt(`You were referred by someone with the code ${referralCode}. Would you like to join the group?`);
    } else {
      // If no referral code was found, simply show the group joining page
      // showGroupJoinPage();
      ////console.log("NO NON OREFERRAL TRIGGERED");
      ////console.log("NO NON OREFERRAL TRIGGERED");
      ////console.log("NO NON OREFERRAL TRIGGERED");
      ////console.log("NO NON OREFERRAL TRIGGERED");
      ////console.log("NO NON OREFERRAL TRIGGERED");
      setRefLinkPrompt("Hmmmm no group referral code provided...");

      //looks like there's no referral code
      //redirecting you now........
    }
  }, []);

  const getReferralGroup = async (refid) => {
    const token = await getAccessTokenSilently();

    let promise = XMAS_GetGroupObjectReferral(refid, token);

    ////console.log(refid);
    ////console.log(refid);
    ////console.log(refid);
    ////console.log(refid);
    ////console.log(refid);
    ////console.log(refid);
    ////console.log(refid);
    ////console.log(refid);

    promise.then((data) => {
      // ////console.log(
      //   "data returned to the get ref group function within the invite page"
      // );
      // ////console.log(data);
      ////console.log(data);
      ////console.log(data);
      ////console.log(data);
      ////console.log(data);
      ////console.log(data);

      if (data.length == 0) {
        setRefLinkPrompt("Ruh roh that's not a valid referral link");
      } else {
        setRefLinkPrompt("Are we trying to join this group or nah?");
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
      <div>
        <HomeTop />
        {/* <Loading/> */}
        <MasterBodyContainer>
          <ReferralAccept />

          <Spacer height={"20vw"} />
        </MasterBodyContainer>

        <HomeBottom />
      </div>
    </>
  );
}
