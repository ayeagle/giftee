import React, { Component, useState, useEffect, forceUpdate } from "react";
import styles from "./Groups.module.css";
import Spacer from "@components/Spacer";
import { useRef } from "react";
import HomeTop from "@components/xmas/HomeTop";
import HomeBottom from "@components/xmas/HomeBottom";
import Loading from "@components/xmas/Loading";
import CreatGroupFlow from "@components/xmas/CreateGroupFlow";
import {
  isReady,
  getGroupObject,
  getAllGroups,
} from "@components/data_management/CurrGroupData";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";
import XMAS_ChangeOnboarded from "@components/mutation_apis/XMAS_ChangeOnboarded";
import { getUserData } from "@components/data_management/CurrGroupData";

let curr_group;
let name = "";

let colors = [
  "rgba(238, 99, 82,",
  "rgba(89, 205, 144,",
  "rgba(63, 167, 214,",
  "rgba(250, 192, 94,",
  "rgba(247, 157, 132,",
  "rgba(100, 233, 238,",
  "rgba(100, 233, 238,",
  "rgba(35, 61, 77,",
  "rgba(137, 170, 230,",
  "rgba(252, 171, 100,",
  "rgba(217, 249, 165,",
  "rgba(98, 108, 102,",
];

function getRandomColor(input) {
  return colors[input % colors.length];
}

export default function Groups({ errorHappening, setErrorHappening }) {
  const [runOnce, setRunOnce] = useState(0);
  const [ready, setReady] = useState(false);
  const [currentGroupID, setCurrentGroupID] = useState(-1);
  const [groupCreationStage, setGroupCreationStage] = useState(0);
  const [groupData, setGroupData] = useState();
  const [allGroupsData, setAllGroupsData] = useState();
  const { user, getAccessTokenSilently } = useAuth0();
  const [bool, setBool2] = useState(true);
  const [height, updateHeight] = useState(0);
  const [width, updateWidth] = useState(0);
  const [giftAdded, setGiftAdded] = useState(false);
  const [successPrompt, setSuccessPrompt] = useState("");
  const [buttonStyle, setButtonStyle] = useState(styles.add_groups_button);
  const [userData, setUserData] = useState([]);
  const [numUsersDisplayed, setNumUsersDisplayed] = useState(5);

  useEffect(() => {
    updateHeight(window.scrollHeight);
    updateWidth(window.innerWidth);
    // setTotalHeight(window.outerHeight);

    function handleWindowResize() {
      updateHeight(window.innerHeight);
      updateWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);
  }, [height, width]);

  useEffect(() => {
    setTimeout(() => {
      getGroup();
    }, [1000]);
    setTimeout(() => {
      // evalButtonBlink(allGroupsData);
    }, [3000]);
  }, [ready]);

  if (isReady() && runOnce % 10 == 1) {
    setReady(true);
    setRunOnce(runOnce + 1);
    // setTimeout(() => {
    //     getGroup()
    // }, [1000])
  }

  useEffect(() => {
    setTimeout(() => {
      handleOnboardedChange();
    }, [1000]);
  }, [ready]);

  async function handleOnboardedChange() {
    const token = await getAccessTokenSilently();

    let curr_user = getUserData();
    curr_user.then((data) => {
      const temp = data;
      setUserData(temp);
      ////console.log(
      ("this is the retrieved user data within the get started page");
    });

    let promise = await XMAS_ChangeOnboarded(
      localStorage.getItem("user_id"),
      true,
      token
    );
  }

  const getGroup = () => {
    // curr_group = getGroupObject()

    let temple = getGroupObject();

    temple.then((data) => {
      setGroupData(data);
    });

    let booble = getAllGroups();

    booble.then((data) => {
      setAllGroupsData(data);
    });
    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log(getGroupObject());
    ////console.log(groupData);
  };

  useEffect(() => {
    setGiftAdded(false);
  }, [giftAdded, setGiftAdded]);

  const shouldStop = useRef(false);

  if (allGroupsData && shouldStop.current == false) {
    if (allGroupsData.length != 0) {
      shouldStop.current = true;
    }
  }

  useEffect(() => {
    let styleBool = true;

    const blinking = setInterval(() => {
      ////console.log("evalblink interval");

      ////console.log("evalblink interval after");

      if (styleBool) {
        ////console.log("style 2 set");
        setButtonStyle(styles.add_button_blink2);
      } else {
        ////console.log("style 1 set");
        setButtonStyle(styles.add_button_blink1);
      }
      styleBool = !styleBool;

      if (shouldStop.current == true) {
        setButtonStyle(styles.add_button_blink1);
        clearInterval(blinking);
      }
    }, 1000);
    // }
  }, [allGroupsData]);

  useEffect(() => {
    setTimeout(() => {
      getGroups();
      setBool2(true);
    }, [1000]);
  }, [ready, bool]);

  // useEffect(() => {
  // }, [bool])

  useEffect(() => {
    setCurrentGroupID(localStorage.getItem("group_id"));
  }, []);

  if (isReady() && runOnce % 10 == 1) {
    setReady(true);
    setRunOnce(runOnce + 1);
  }

  async function getGroups() {
    // curr_group = getGroupObject()

    let temple = await getAllGroups();

    setAllGroupsData(temple);
    curr_group = temple;
    ////console.log("this is the groupdata");
    ////console.log(data);

    ////console.log("this is the groupdata returned to the main compoennt");
  }

  // const getReferralHash = () => {};

  useEffect(() => {}, []);

  const changeGroup = (group_id) => {
    if (group_id != localStorage.getItem("group_id")) {
      localStorage.setItem("group_id", group_id);
      setCurrentGroupID(group_id);
      setGiftAdded(true);
    }
  };

  const createGroup = () => {
    setGroupCreationStage(1);
  };

  const backButton = () => {
    setGroupCreationStage(groupCreationStage - 1);
  };

  // //console.log(allGroupsData);
  ////console.log(allGroupsData);
  ////console.log(allGroupsData);
  ////console.log(allGroupsData);
  ////console.log(allGroupsData);
  ////console.log(allGroupsData);

  return (
    <>
      <HomeTop />
      <Spacer height={"100px"} />

      <MasterBodyContainer>
        <div className={styles.positional_container}>
          <div className={styles.groups_wrapper_container}>
            <Spacer height={"50px"} />
            <p
              style={{
                position: "absolute",
                top: "5vh",
                left: "10%",
                display: groupCreationStage == 0 ? "" : "none",
              }}
            >
              <button className={buttonStyle} onClick={createGroup}>
                {width > 1 ? (
                  <img
                    src="IMGassets/plus.png"
                    style={{ width: "3vh", display: "flex" }}
                  />
                ) : (
                  <p>Create group</p>
                )}
              </button>
            </p>
            <p
              style={{
                position: "absolute",
                top: "5vh",
                left: "10%",
                display: groupCreationStage != 0 ? "" : "none",
              }}
            >
              <button onClick={backButton} className={styles.back_button}>
                <img
                  src={"/IMGassets/arrow.png"}
                  className={styles.back_button_img}
                />
              </button>
            </p>
            <h1>My Groups</h1>
            {giftAdded ? (
              <div className={styles.gift_added}>
                <p>Group Changed!</p>
                <img
                  src="/IMGassets/good_check.png"
                  style={{
                    width: "2vh",
                    height: "2vh",
                    // marginLeft: "1vw",
                    // marginTop: "-.2vw",
                  }}
                />
              </div>
            ) : (
              <div className={styles.gift_added_after}>
                <p>Group Changed!</p>
                <img
                  src="/IMGassets/good_check.png"
                  style={{
                    width: "2vh",
                    height: "2vh",
                    // marginLeft: "1vw",
                    // marginTop: "7px",
                  }}
                />
              </div>
            )}

            {/* <Spacer height={"4vh"} /> */}

            {groupCreationStage == 0 ? (
              <>
                <div style={{ minHeight: "20vw" }}>
                  {/* <button onClick={validate}>TESTER</button> */}

                  {allGroupsData && bool ? (
                    allGroupsData.length == 0 ? (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          margin: "0 auto",
                          width: "40%",
                          minHeight: "20vh",
                          // margin: "0 auto"
                        }}
                      >
                        <h3>
                          Looks like you're not part of any groups yet... make
                          your first one now!
                        </h3>
                      </div>
                    ) : (
                      <div className={styles.groups_container}>
                        {allGroupsData.map((group, i) => {
                          ////console.log(allGroupsData);
                          ////console.log(i);
                          ////console.log(group);
                          // if (currentGroupID == group.id) {
                          //     return (
                          //         <div
                          //             id={group.id}
                          //             className={styles.groups_unit}
                          //             style={{ backgroundColor: "rgba(60, 179, 113,.3)", border: "3px solid black", transition: "2s" }}>
                          //             <div style={{ position: "absolute", top: "2%", left: "2%", fontSize: "1.5vw" }}>
                          //                 Current
                          //                 Group
                          //             </div>
                          //             <h4> {group.name} </h4>
                          //             <p style={{ fontSize: "1.2vw" }}> "{group.description}"</p>
                          //             <br />
                          //             {/* <p>Members:</p> */}
                          //             <div style={{ position: "relative", display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                          //                 {group.user_names.map((name, i) => {
                          //                     return (
                          //                         <p id={i} className={styles.name_unit}>{name}</p>
                          //                     )
                          //                 })}
                          //             </div>
                          //             <div> </div>
                          //         </div>
                          //     )
                          // }
                        })}
                        {allGroupsData.map((group, i) => {
                          ////console.log(allGroupsData);
                          ////console.log(i);
                          ////console.log(group);
                          // if (currentGroupID != group.id) {

                          return (
                            <p
                              id={group.id}
                              className={styles.groups_unit}
                              onClick={() => {
                                changeGroup(group.id);
                                //console.log(group.id);
                                //console.log(allGroupsData);
                              }}
                              style={{
                                backgroundColor:
                                  currentGroupID == group.id ? "#ef8c86" : "",
                                border:
                                  currentGroupID == group.id
                                    ? "3px solid black"
                                    : "",
                                transition: ".2s",
                                transition: "color 0s",

                                color:
                                  currentGroupID == group.id ? "white" : "",
                              }}
                            >
                              {/* {currentGroupID == group.id ? (
                                                        <div style={{ position: "absolute", top: "2%", left: "2%", fontSize: "1.5vw" }}>
                                                            Current <br/>
                                                            Group
                                                        </div>

                                                    ) : (
                                                        <></>
                                                    )} */}

                              {currentGroupID == group.id && (
                                <>
                                  {/* <img
                                    src="IMGassets/select.png"
                                    style={{
                                      position: "absolute",
                                      top: "-1.2vh",
                                      left: "-1.2vh",
                                      borderRadius: "200px",
                                      width: "3vh",
                                    }}
                                  /> */}
                                  <a href="/explore">
                                    <button
                                      style={{
                                        position: "absolute",
                                        top: "-1.2vh",
                                        left: "-1.2vh",
                                        padding: ".5vh",
                                      }}
                                    >
                                      Go to gifts
                                    </button>
                                  </a>
                                </>
                              )}
                              <h2> {group.name} </h2>
                              <p style={{ fontSize: "1.2vh" }}>
                                "{group.description}"
                              </p>
                              <p style={{ fontSize: "1.2vh" }}>
                                {" "}
                                {group.gift_exchange_date}
                              </p>
                              <br />
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
                                {group.user_names.map((name, i) => {
                                  return i < numUsersDisplayed ? (
                                    <p id={i} className={styles.name_unit}>
                                      {name}
                                    </p>
                                  ) : i == 5 ? (
                                    <>
                                      <p id={i} className={styles.name_unit} onClick={()=>setNumUsersDisplayed(1000)}>
                                        and more...
                                      </p>
                                    </>
                                  ) : (
                                    <></>
                                  );
                                })}
                              </div>
                              <div> </div>
                            </p>
                          );
                          // }
                        })}
                      </div>
                    )
                  ) : (
                    <>
                      {/* <Spacer /> */}
                      <Loading />
                      {/* <Spacer /> */}
                    </>
                  )}

                  {/* <Spacer height={"10vw"} /> */}
                </div>
              </>
            ) : (
              <>
                <CreatGroupFlow
                  groupCreationStage={groupCreationStage}
                  setGroupCreationStage={setGroupCreationStage}
                  setBool2={setBool2}
                />
              </>
            )}
            {/* <Spacer height="50px" /> */}
          </div>
        </div>
        {/* <Spacer height={"10vh"} /> */}
      </MasterBodyContainer>
      <Spacer height={"100px"} />

      <HomeBottom />
    </>
  );
}

// export default withAuthenticationRequired(Groups, {
//   // onRedirecting: () => <LoadingPage />,
//   // onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
// });
