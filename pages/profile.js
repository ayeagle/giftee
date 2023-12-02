import React, { Component, useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { getGroupObject } from "@components/data_management/curr_group_data";
import XMAS_GetGroupObject from "@components/mutation_apis/XMAS_GetGroupObject";
import XMAS_PostGroupChange from "@components/mutation_apis/XMAS_PostGroupChange";
import Spacer from "@components/Spacer";
// import React from 'react';
import HomeTop from "@components/xmas/HomeTop";
import HomeBottom from "@components/xmas/HomeBottom";
import { isReady } from "@components/data_management/curr_group_data";
import Loading from "@components/xmas/Loading";
import * as icons from "react-icons/fa";
import ReferralLink from "@components/xmas/ReferralLink";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "@components/xmas/LoadingPage";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";
import DatePicker from "react-datepicker";

let curr_group = getGroupObject();

export default function  Profile({ errorHappening, setErrorHappening }) {
  // const [userCheckVal, setUserCheckVal] = useState('')
  // const [userPasswordCheckVal, setUserPasswordCheckVal] = useState('')
  // const [validName, setValidName] = useState('')
  // const [addPrompt, setAddPrompt] = useState('')
  // const [addSecPrompt, setAddSecPrompt] = useState('')
  const [greenSwitch, setGreenSwitch] = useState(true);
  const [bool, setBool] = useState(true);
  const [ready, setReady] = useState(true);
  const [groupData, setGroupData] = useState();
  const [runOnce, setRunOnce] = useState(0);

  // const [greenSecSwitch, setSecGreenSwitch] = useState(true)
  // const [viewPassword, setViewPassword] = useState('password')
  // const [createNew, setCreateNew] = useState(false)
  // const [numUsers, setNumUsers] = useState(0)
  // const [groupData, setGroupData] = useState(curr_group)
  const [giftAdded, setGiftAdded] = useState(false);
  const [currUser, setCurrUser] = useState("");
  const [currGroup, setCurrGroup] = useState("");
  const [currDesc, setCurrDesc] = useState("");
  const [currDate, setCurrDate] = useState();

  const [currMemb, setCurrMemb] = useState([]);

  const [nameE, setNameE] = useState(false);
  const [gnameE, setGnameE] = useState(false);
  const [descE, setDescE] = useState(false);
  const [dateE, setDateE] = useState(false);
  const [modeE, setModeE] = useState(false);
  const [membE, setMembE] = useState(false);

  const [tempName, setTempName] = useState("");
  const [tempGName, setTempGName] = useState("");
  const [tempDesc, setTempDesc] = useState("");
  const [tempDate, setTempDate] = useState();
  const [tempMode, setTempMode] = useState("");
  const [tempMemb, setTempMemb] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setGiftAdded(false);
    setGreenSwitch(true);
  }, [giftAdded, setGiftAdded, setGreenSwitch, greenSwitch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isReady()) {
        clearInterval(intervalId);
        getGroup();
      }
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // if (isReady() && runOnce % 10 == 1) {
  //   setReady(true);
  //   setRunOnce(runOnce + 1);
  // }

  const getGroup = () => {
    // curr_group = getGroupObject()

    let temple = getGroupObject();

    temple.then((data) => {
      setGroupData(data);
      curr_group = data;
      //console.log("this is the groupdata");
      //console.log(data);

      setCurrUser(localStorage.getItem("current_user"));
      setCurrGroup(data.group_name);
      setCurrDesc(curr_group.description);
      setCurrDate(new Date(curr_group.gift_exchange_time * 1000));
      setCurrMemb(curr_group.user_names);

      const curr_user = localStorage.getItem("user_id");

      for (let i = 0; i < curr_group.admin_ids.length; i++) {
        if (curr_group.admin_ids[i] == curr_user) {
          setIsAdmin(true);
          break;
        }
      }
      // setReady(true);
    });
    //////console.log("this is the groupdata returned to the main compoennt");
  };

  // useEffect(() => {
  //     // getGroup()
  //     curr_group = groupData
  //     //////console.log("this is the groupdata")
  //     //////console.log(groupData)

  //     setCurrUser(localStorage.getItem('current_user'))
  //     setCurrGroup(curr_group.group_name)
  //     setCurrDesc(curr_group.description)
  //     setCurrMemb(curr_group.group_members)
  // }, [setGroupData])

  const editInfo = (val, variable, updateValue, current) => {
    if (variable) {
      setGiftAdded(true);
    }

    switch (val) {
      case "nameE":
        setNameE(!nameE);
        if (updateValue != current && updateValue != "") {
          let tempUpdateVal = currMemb;
          tempUpdateVal[findIndex(current)] = updateValue;

          setCurrUser(updateValue);
          dispatchComplexChange(val, variable, tempUpdateVal);
        }

        /// need to go and update all instances of gifts matching this name and group ID across
        /// recipient and giver fields
        break;
      case "gnameE":
        setGnameE(!gnameE);
        if (updateValue != current && updateValue != "") {
          setCurrGroup(updateValue);
          dispatchDBChange(variable, updateValue);
        }
        break;
      case "descE":
        setDescE(!descE);
        if (updateValue != current && updateValue != "") {
          setCurrDesc(updateValue);
          dispatchDBChange(variable, updateValue);
        }
        break;
      case "dateE":
        setDateE(!dateE);

        if (updateValue) {
          let temp_event_unix = Math.floor(
            new Date(updateValue).getTime() / 1000
          );
          let temp_current = new Date(updateValue);

          //console.log("time data cycle");
          //console.log("time data cycle");
          //console.log("temp_event_unix");
          //console.log(temp_event_unix);
          //console.log("tempDate");
          //console.log(tempDate);
          //console.log("currDate");
          //console.log(currDate);
          //console.log("temp_current");
          //console.log(temp_current);
          //console.log("current");
          //console.log(current);
          //console.log("updateValue");
          //console.log(updateValue);
          //console.log("variable");
          //console.log(variable);
          //console.log("time data cycle END");

          if (temp_event_unix != current && updateValue != "") {
            setCurrDate(temp_current);
            dispatchDBChange(variable, temp_event_unix);
          }
        }
        break;
      case "membE":
        setMembE(!membE);
        if (updateValue != current && updateValue != "") {
          //////console.log("IDK WHAT THE FUCK IS NEEDED HERE");
          setCurrMemb(updateValue);
          dispatchDBChange(variable, tempUpdateVal);
        }
        break;
    }
    //////console.log(this);
    setBool(!bool);
  };

  const dispatchDBChange = async (variable, updateValue) => {
    const token = await getAccessTokenSilently();

    setGiftAdded(true);

    let group_id = localStorage.getItem("group_id");

    let promise = XMAS_PostGroupChange(variable, updateValue, group_id, token);

    promise.then((data) => {
      //////console.log("data returned from the page load API call");
      //////console.log(data);
      // curr_group = data
      // updateGroupObject(data)
      // setGroupData(data)
    });
  };

  const dispatchComplexChange = async (variable, updateValue) => {
    const token = await getAccessTokenSilently();

    setGiftAdded(true);

    let group_id = localStorage.getItem("group_id");

    let promise = XMAS_PostGroupChange(variable, updateValue, group_id, token);

    promise.then((data) => {
      //////console.log("data returned from the page load API call");
      //////console.log(data);
      // curr_group = data
      // updateGroupObject(data)
      // setGroupData(data)
    });
  };

  // export default function Profile() {

  // return (
  //     user && (
  //         <div style={{height: "30vw"}}>
  //             <img src={user.picture} alt={user.name} />
  //             <h2>{user.name}</h2>
  //             <p>{user.email}</p>
  //         </div>
  // //     )
  // // );
  // const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  const { user, error, isLoading } = useAuth0();
  if (isLoading) return <></>;

  if (error) return <div>{error.message}</div>;

  //console.log("groupData");
  //console.log("groupData");
  //console.log("groupData");
  //console.log(groupData);
  //console.log("groupData");
  //console.log("groupData");
  //console.log("groupData");

  return (
    <>
      <HomeTop />
      <Spacer height={"50px"} />

      <MasterBodyContainer>
        <div className={styles.add_gift_container}>
          <div className={styles.login_container}>
            <h1 className={styles.title}>Settings</h1>
            <Spacer height="40px" />

            {groupData && groupData.group_name !== "" && user ? (
              <>
                <img
                  src={user.picture}
                  alt={user.name}
                  className={styles.profile_photo}
                />

                <div className={styles.login_signup_wrapper}>
                  <div className={styles.form}>
                    {/* 
                            <div className={styles.row_align}>
                                <div>
                                    Logged in as:
                                </div>
                                {!nameE || bool ? (
                                    <div>
                                        {currUser} <button className={styles.change_data_button} onClick={() => editInfo("nameE")}><img className={styles.change_data_button_image} src='/IMGassets/edit.png' /></button>
                                    </div>
                                ) : (
                                    <div>

                                        <input
                                            className={styles.input}
                                            placeholder={currUser}
                                            onChange={(e) => {
                                                setTempName(e.target.value)
                                            }}

                                        /> <button
                                            className={styles.change_data_button}
                                            onClick={() =>
                                                editInfo("nameE", "participants", tempName, currUser)

                                            }><img className={styles.change_data_button_image} src='/IMGassets/save.png' /></button>
                                    </div>
                                )}
                            </div> */}

                    <div className={styles.row_align}>
                      <p>Username:</p>
                      <p>{user.name}</p>
                    </div>
                    <div style={{ border: ".1px solid rgba(0,0,0,.2)" }} />
                    <div className={styles.row_align}>
                      <p>Email:</p>
                      <p>{user.email}</p>
                    </div>
                    <div style={{ border: ".1px solid rgba(0,0,0,.2)" }} />

                    <div className={styles.row_align}>
                      <p>Group Name:</p>
                      {!gnameE ? (
                        <p>
                          {currGroup}
                          {isAdmin ? (
                            // <button
                            //   className={styles.change_data_button}
                            // >
                            <img
                              className={styles.change_data_button_image}
                              onClick={() => editInfo("gnameE")}
                              src="/IMGassets/edit.png"
                            />
                          ) : (
                            // </button>
                            <></>
                          )}
                        </p>
                      ) : (
                        <p>
                          <input
                            className={styles.input}
                            placeholder={currGroup}
                            onChange={(e) => {
                              setTempGName(e.target.value);
                            }}
                          />{" "}
                          <img
                            className={styles.change_data_button_image}
                            onClick={() =>
                              editInfo(
                                "gnameE",
                                "name",
                                tempGName,
                                curr_group.group_name
                              )
                            }
                            src="/IMGassets/save.png"
                          />
                          {/* </button> */}
                        </p>
                      )}
                    </div>
                    <div style={{ border: ".1px solid rgba(0,0,0,.2)" }} />

                    <div className={styles.row_align}>
                      <p>Description:</p>
                      {!descE ? (
                        <p>
                          {currDesc}
                          {isAdmin ? (
                            // <button
                            //   className={styles.change_data_button}
                            //   onClick={() => editInfo("descE")}
                            // >
                            <img
                              className={styles.change_data_button_image}
                              onClick={() => editInfo("descE")}
                              src="/IMGassets/edit.png"
                            />
                          ) : (
                            // </button>
                            <></>
                          )}
                        </p>
                      ) : (
                        <p>
                          <input
                            className={styles.input}
                            placeholder={currDesc}
                            onChange={(e) => {
                              setTempDesc(e.target.value);
                            }}
                          />{" "}
                          {/* <button
                            className={styles.change_data_button}
                            
                          > */}
                          <img
                            className={styles.change_data_button_image}
                            onClick={() =>
                              editInfo(
                                "descE",
                                "description",
                                tempDesc,
                                curr_group.description
                              )
                            }
                            src="/IMGassets/save.png"
                          />
                          {/* </button> */}
                        </p>
                      )}
                    </div>
                    <div style={{ border: ".1px solid rgba(0,0,0,.2)" }} />

                    <div className={styles.row_align}>
                      <p>Date:</p>
                      {!dateE ? (
                        <p>
                          {new Date(currDate).toLocaleDateString("default")}
                          {isAdmin ? (
                            <img
                              className={styles.change_data_button_image}
                              onClick={() => editInfo("dateE")}
                              src="/IMGassets/edit.png"
                            />
                          ) : (
                            <></>
                          )}
                        </p>
                      ) : (
                        <p>
                          <DatePicker
                            className={styles.input}
                            selected={tempDate ? tempDate : currDate}
                            onChange={(date) => {
                              setTempDate(date);
                            }}
                          />
                          <img
                            className={styles.change_data_button_image}
                            onClick={() =>
                              editInfo(
                                "dateE",
                                "gift_exchange_time",
                                tempDate,
                                curr_group.gift_exchange_time
                              )
                            }
                            src="/IMGassets/save.png"
                          />
                          {/* </button> */}
                        </p>
                      )}
                    </div>
                    <div style={{ border: ".1px solid rgba(0,0,0,.2)" }} />

                    <div className={styles.row_align}>
                      <p>Gift Mode:</p>
                      <p>
                        WIP
                        {isAdmin ? (
                          // <button className={styles.change_data_button}>
                          <img
                            className={styles.change_data_button_image}
                            src="/IMGassets/edit.png"
                          />
                        ) : (
                          // </button>
                          <></>
                        )}
                      </p>
                    </div>
                    <div style={{ border: ".1px solid rgba(0,0,0,.2)" }} />
                    <Spacer height={"2vw"} />
                    <div className={styles.row_align}>
                      <p style={{ width: "40%", textAlign: "left" }}>
                        Current Members:
                      </p>
                      <div className={styles.name_container}>
                        {currMemb.map(function (names, index) {
                          return (
                            <p className={styles.name_option} key={index}>
                              {names}
                            </p>
                          );
                        })}
                      </div>
                      {isAdmin ? (
                        // <button className={styles.change_data_button}>
                        <img
                          className={styles.change_data_button_image}
                          src="/IMGassets/edit.png"
                        />
                      ) : (
                        // </button>
                        <></>
                      )}
                    </div>

                    {giftAdded ? (
                      <div className={styles.gift_added}>
                        <p>Changes saved</p>
                        <img
                          src="/IMGassets/good_check.png"
                          style={{
                            width: "15px",
                            height: "15px",
                            marginLeft: "5px",
                            marginTop: "-1px",
                          }}
                        />
                      </div>
                    ) : (
                      <div className={styles.gift_added_after}>
                        <p>Changes saved</p>
                        <img
                          src="/IMGassets/good_check.png"
                          style={{
                            width: "15px",
                            height: "15px",
                            marginLeft: "5px",
                            marginTop: "-1px",
                          }}
                          s
                        />
                      </div>
                    )}

                    <br></br>
                    {/* {prompt} */}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Spacer />
                <Loading />
                <Spacer />
              </>
            )}
          </div>
          {/* <Spacer /> */}
        </div>
        <Spacer />
        {groupData && groupData.invite_link && user ? (
          <ReferralLink link={groupData.invite_link} />
        ) : (
          <></>
        )}
      </MasterBodyContainer>
      <Spacer height="30px" />

      <HomeBottom />
    </>
  );
}

// export default withAuthenticationRequired(Profile, {
//   // onRedirecting: () => <LoadingPage />,
//   // onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
// });
