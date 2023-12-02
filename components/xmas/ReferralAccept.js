import AddGiftUnit from "@components/xmas/AddGiftUnit";
import Loading from "@components/xmas/Loading";
import { useEffect, useState } from "react";
import styles from "pages/tempInvite.module.css";
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

let curr_group;
let referralCode;

export default function ReferralAccept() {
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

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get("refid");
    //console.log('referralCode')
    //console.log(referralCode)

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

      setRefLinkPrompt("Hmmmm no group referral code provided...");

      //looks like there's no referral code
      //redirecting you now........
    }
  }, []);

  const getReferralGroup = async (refid) => {
    // const token = await getAccessTokenSilently();

    let promise = XMAS_GetGroupObjectReferral(refid);

    promise.then((data) => {
      //console.log("//////////////////////////////////////////")
      //console.log("//////////////////////////////////////////")
      //console.log("//////////////////////////////////////////")
      //console.log(data)
      //console.log(data[0].id)

      if (data.length == 0) {
        setRefLinkPrompt("Ruh roh that's not a valid referral link");
      } else {
        setRefLinkPrompt("");
        setValidHash(true);
        setRefGroup(data[0]);
        localStorage.setItem("ref_group_id", data[0].id);
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
        {/* <HomeTop /> */}
        {/* <Loading/> */}

        {validHash ? (
          <>
            <Spacer height={"5vw"} />

            {/* <h5>Login or signup to continue</h5>

            <h5>{loggedIn ? "kjasdhkjhsdsda" : "nonononononnononno"}</h5> */}

            <h5>{refLinkPrompt}</h5>
            <div className={styles.add_gift_container}>
              {/* <Spacer height="10vh"/> */}
              <div className={styles.login_container}>
                <div style={{ minHeight: "20vw" }}>
                  {/* <button onClick={validate}>TESTER</button> */}
                  <Spacer height="3vh"/>
                  <h3>You've been invited to join:</h3>
                  <Spacer height="2vh"/>

                

                  {refGroup ? (
                    <div className={styles.groups_container}>
                      <div className={styles.groups_unit}>
                        <h4> {refGroup.name} </h4>
                        <p style={{ fontSize: "1.2vw" }}>
                          {" "}
                          "{refGroup.description}"
                        </p>
                        <br />
                        {/* <p>Members:</p> */}
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          {refGroup.user_names.map((name, i) => {
                            return (
                              <p id={i} className={styles.name_unit}>
                                {name}
                              </p>
                            );
                          })}
                        </div>
                        <div> </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* <Spacer /> */}
                      <Loading />
                      {/* <Spacer /> */}
                    </>
                  )}

                  <Spacer height={"2vw"} />
                </div>
                <p>
                    {loggedIn ? (
                      <button
                        href="javascript:void(0)"
                        onClick={() => window.location.href = "/explore"}
                      >
                        Join Group
                      </button>
                    ) : (
                      <button
                        href="javascript:void(0)"
                        onClick={() => loginWithRedirect()}
                      >
                        Sign in to Join
                      </button>
                    )}
                  </p>

                <Spacer height={"4vw"} />

                {/* <ReferralLink link={`giftee.io/invite?refid=${refGroup.referral_hash}`} /> */}

                {/* <Spacer height={"10vw"} /> */}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
