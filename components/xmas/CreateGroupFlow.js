import React, { Component, useState, useEffect } from "react";
import styles from "@components/xmas/CreateGroupFlow.module.css";
import XMAS_CheckUser from "../mutation_apis/XMAS_CheckUser";
import XMAS_GetGroupObject from "../mutation_apis/XMAS_GetGroupObject";
import InputUsers from "@components/xmas/InputUsers";
import UserSelect from "./UserSelect";
import Link from "next/link";
import Spacer from "../Spacer";
import XMAS_PostGroupObject from "@components/mutation_apis/XMAS_PostGroupObject";
import XMAS_PostReferralHash from "@components/mutation_apis/XMAS_PostReferralHash";
import {
  isReady,
  getGroupObject,
  updateGroupObject,
  getAllGroups,
} from "@components/data_management/CurrGroupData";
import {
  useInRouterContext,
  useRevalidator,
} from "node_modules/react-router-dom/dist/index";
import Loading from "./Loading";
import XMAS_AddGroupUsers from "@components/mutation_apis/XMAS_AddGroupUsers";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "@components/xmas/CreateGroupFlow.module.css";

let curr_group = getGroupObject();
let giftModes = [
  {
    id: 0,
    name: "Classic",
    rec_num_users: "2-20",
    mode_desc:
      "Users can claim or request gifts across all members of the group.",
  },
  {
    id: 1,
    name: "Secret Santa",
    rec_num_users: "2-100+",
    mode_desc:
      "Users request one gift/suggestion and users are randomly assigned to gift each other's single gift",
  },
  {
    id: 2,
    name: "Influencer",
    rec_num_users: "1-100+",
    mode_desc:
      "One user requests gifts with other's being able to claim and gift to them",
  },
];

export default function CreatGroupFlow({
  groupCreationStage,
  setGroupCreationStage,
  setBool2,
}) {
  const [userCheckVal, setUserCheckVal] = useState("");
  // const [userPasswordCheckVal, setUserPasswordCheckVal] = useState('')
  const [validName, setValidName] = useState("");
  const [addPrompt, setAddPrompt] = useState("");
  const [addSecPrompt, setAddSecPrompt] = useState("");
  const [greenSwitch, setGreenSwitch] = useState(false);
  const [greenSecSwitch, setSecGreenSwitch] = useState(false);
  // const [viewPassword, setViewPassword] = useState('password')
  const [createNew, setCreateNew] = useState(false);
  const [numUsers, setNumUsers] = useState(0);
  const [descr, setDescr] = useState(0);
  const [mode, setMode] = useState(0);
  const [currModeID, setCurrModeID] = useState(0);
  const [newGroupHash, setNewGroupHash] = useState("");
  const [runOnce, setRunOnce] = useState(0);
  const [ready, setReady] = useState(false);
  // const [groupData, setGroupData] = useState(curr_group)

  const [userFloat, setUserFloat] = useState(false);
  const [numFloat, setNumFloat] = useState(false);
  const [dateFloat, setDateFloat] = useState(false);
  const [userList, setUserList] = useState();

  const crypto = require("crypto");

  const [groupData, setGroupData] = useState();
  const [allGroupsData, setAllGroupsData] = useState();
  const [combinedUsers, setCombinedUsers] = useState();
  const [attachedUsers, setAttachedUsers] = useState([]);
  const [attachedUsersNames, setAttachedUsersNames] = useState([]);

  const [checkStates, setCheckStates] = useState(Array(20).fill(false));
  const [bool, setBool] = useState(false);
  const [brandNewId, setBrandNewId] = useState(-1);
  const [giftAdded, setGiftAdded] = useState(false);

  const { user, getAccessTokenSilently } = useAuth0();

  const [eventDate, setEventDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      getGroup();
    }, [1000]);
  }, [ready]);

  if (isReady() && runOnce % 10 == 1) {
    setReady(true);
    setRunOnce(runOnce + 1);
    // setTimeout(() => {
    //     getGroup()
    // }, [1000])
  }

  const getGroup = () => {

    let temple = getGroupObject();

    temple.then((data) => {
      setGroupData(data);
    });

    let booble = getAllGroups();

    booble.then((data) => {
      setAllGroupsData(data);
      createMasterUserList(data);
    });
  };

  const createMasterUserList = (data) => {

    const idSet = new Set(); // Create a Set of the unique ids
    const uniqueNames = [];
    let temp_users_object = [];

    let temp;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].user_ids.length; j++)
        if (!idSet.has(data[i].user_ids[j])) {
          // Check if the object id is in the idSet
          temp_users_object.push({
            id: data[i].user_ids[j],
            name: data[i].user_names[j],
          }); // If so, add the id to the uniqueIds array
          idSet.add(data[i].user_ids[j]); // Remove the id from the idSet to avoid duplicates
        }
    }

    setUserList(temp_users_object);
  };

  useEffect(() => {
    setGiftAdded(false);
    setGreenSwitch(true);
    setSecGreenSwitch(false);
  }, [giftAdded, setGiftAdded, setGreenSwitch, greenSwitch, greenSecSwitch]);

  const validateInputs = () => {
    return userCheckVal && descr && eventDate >= new Date();
  };

  const groupPost = async () => {
    const token = await getAccessTokenSilently();

    if (!validateInputs()) {
      //setwarnings
      setAddPrompt("Invalid inputs");
      setSecGreenSwitch(true);
      return;
    } else {
      setAddPrompt("");
    }

    setGiftAdded(true);

    let temp_event_date = Math.floor(new Date(eventDate).getTime() / 1000);

    //console.log(temp_event_date);
    //console.log(temp_event_date);
    //console.log(temp_event_date);
    //console.log(temp_event_date);
    //console.log(temp_event_date);
    // return

    let promise = XMAS_PostGroupObject(
      userCheckVal,
      currModeID,
      descr,
      temp_event_date,
      localStorage.getItem("user_id"),
      token
    );

    promise.then((data) => {
      let carryoverid = data;
      setBrandNewId(data);
      let curr_hash = generateReferralCode(
        data,
        userCheckVal,
        "peanuts",
        token
      );
      curr_hash.then((data) => {
        setNewGroupHash(data);
        let promise2 = XMAS_PostReferralHash(carryoverid, data, token);
        promise2.then((data) => {
          ////console.log("the referral hash return data");
          ////console.log(data);
        });
      });
    });

    setTimeout(() => {
      setGroupCreationStage(2);
      setBool2(true);
    }, [1000]);
  };

  async function generateReferralCode(id, name, salt) {
    // const data = id + name + salt; // Concatenate the ID, name, and salt
    // const hash = crypto.createHash('sha256').update(data).digest('hex');// Generate a SHA-256 hash of the data
    // const code = hash.substr(0, 8); // Take the first 8 characters of the hash as the code
    // return code;

    return new Promise((resolve, reject) => {
      try {
        const data = id + name + salt; // Concatenate the ID, name, and salt
        const hash = crypto.createHash("sha256").update(data).digest("hex"); // Generate a SHA-256 hash of the data
        const code = hash.substr(0, 8); // Take the first 8 characters of the hash as the code
        resolve(code);
      } catch (err) {
        reject(err);
      }
    });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      ////console.log("Enter key pressed");
      validate();
    }
  };

  useEffect(() => {
    if (userCheckVal != "") {
      setUserFloat(true);
    } else {
      setUserFloat(false);
    }

    if (descr != "") {
      setNumFloat(true);
    } else {
      setNumFloat(false);
    }

    if (descr != "") {
      setNumFloat(true);
    } else {
      setNumFloat(false);
    }

    if (eventDate != "") {
      setDateFloat(true);
    } else {
      setDateFloat(false);
    }
  }, [userCheckVal, numUsers, descr, eventDate]);

  useEffect(() => {
    setAddPrompt("");
    setAddSecPrompt("");
  }, [focus]);

  const changeMode = (id) => {
    setCurrModeID(id);
  };

  const updateUsers = (user_id, user_name) => {
    let temp = attachedUsers;
    let temp2 = attachedUsersNames;
    let index = temp.indexOf(user_id);

    if (index == -1) {
      temp.push(user_id);
      temp2.push(user_name);
    } else {
      temp.splice(index, 1);
      temp2.splice(index, 1);
    }
    ////console.log("this is the attached groups array");
    ////console.log(temp);
    ////console.log(temp2);

    setAttachedUsers(temp);
    setAttachedUsersNames(temp2);

    ////console.log(checkStates);
  };

  const addUsersToGroup = async () => {
    const token = await getAccessTokenSilently();

    setGiftAdded(true);

    let promise = XMAS_AddGroupUsers({
      user_ids_array: attachedUsers,
      user_names_array: attachedUsersNames,
      group_id: brandNewId,
      token: token,
    });


    promise.then((data) => {
      ////console.log(data);
    });

    setTimeout(() => {
      setGroupCreationStage(0);
    }, [1000]);
  };

  const validate = () => {
    // let promise = XMAS_CheckUser(userCheckVal, 1)
    // // return <Link href="/">resume</Link>
    // promise.then((data) => {
    //     // if (isNew) {
    //         if (numUsers <= 2 || numUsers > 40) {
    //             setAddSecPrompt("That's not a valid number of users!")
    //             return
    //         } else {
    //             setAddSecPrompt("")
    //         }
    //         if (!data) {
    //             setAddSecPrompt("That group name's available!")
    //             setGreenSwitch(true)
    //             move(true)
    //             curr_group.group_name = userCheckVal
    //             curr_group.num_users = numUsers
    //             localStorage.setItem('group_name', userCheckVal);
    //             redirect(<InputUsers prompt={"What are your member's names?"} numUsers={curr_group.num_users} groupData={groupData} setGroupData={setGroupData} />
    //             )
    //         } else {
    //             setAddSecPrompt("Hmm looks like that group name is taken...")
    //             setGreenSwitch(false)
    //             setCreateNew(true)
    //         }
    //     // } else {
    //     //     if (data) {
    //     //         setAddPrompt("Successful Login")
    //     //         setGreenSwitch(true)
    //     //         setCreateNew(false)
    //     //         localStorage.setItem('group_name', data.name);
    //     //         localStorage.setItem('group_id', data.id);
    //     //         getGroupDataFromServer()
    //     //         redirect(<UserSelect />)
    //     //     } else {
    //     //         setAddPrompt("Hmm I don't think that group exists...")
    //     //         setGreenSwitch(false)
    //     //         setCreateNew(true)
    //     //     }
    //     // }
  };
  ////console.log(groupCreationStage);
  ////console.log(groupCreationStage);

  return (
    <>
      <div className={styles.form}>
        <h1>{prompt}</h1>
        <p className={styles.sub_text}>
          As an admin you can always edit these details later
        </p>
        {/* {newGroupHash} */}
        {groupCreationStage == 1 ? (
          <>
            <div className={styles.inline_wrapper}>
              <br />
              <label>
                {" "}
                <p className={userFloat ? styles.label_float : styles.label}>
                  GROUP NAME
                </p>{" "}
              </label>

              <input
                className={styles.input}
                type="string"
                // placeholder="group name"
                onChange={(e) => {
                  setUserCheckVal(e.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    groupPost();
                  }
                }}
              />
              {/* <br></br>
              <br></br>

              <p
                className={styles.warning}
                style={{ color: greenSecSwitch ? "green" : "red" }}
              >
                {addPrompt}
              </p> */}
            </div>
            <br />

            <div className={styles.inline_wrapper}>
              <br />

              <label>
                <p className={numFloat ? styles.label_float : styles.label}>
                  DESCRIPTION{" "}
                </p>
              </label>
              <input
                className={styles.input}
                type="string"
                // placeholder="# of users"
                onChange={(e) => {
                  setDescr(e.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    groupPost();
                  }
                }}
              />
            </div>
            <br />
            <div className={styles.inline_wrapper}>
              <label>
                <p
                  className={
                    dateFloat && false ? styles.label_float : styles.label
                  }
                >
                  EXCHANGE DATE
                </p>
              </label>
              <div className={styles.date_inline_wrapper}>
                <br />
                <DatePicker
                  selected={eventDate}
                  onChange={(date) => {
                    setEventDate(date);
                  }}
                />
              </div>
            </div>
            <br></br>
            <p
              className={styles.warning}
              style={{
                color: greenSecSwitch ? "red" : "black",
                transition: greenSecSwitch ? "" : "3s",
              }}
            >
              {addPrompt}
            </p>

            <div className={styles.inline_wrapper}>
              <br />
              <p
                className={styles.label}
                // style={{ left: "8%", position: "absolute" }}
              >
                GIFT MODE
              </p>
              <Spacer height="20px" />
              <div className={styles.mode_list_wrapper}>
                {giftModes.map((mode, i) => {
                  return (
                    <h3
                      id={mode.id}
                      className={styles.mode_box}
                      onClick={() => changeMode(mode.id)}
                      style={{
                        backgroundColor:
                          currModeID == mode.id
                            ? "rgba(60, 179, 113,.3)"
                            : "inherit",
                        border: currModeID == mode.id ? "3px solid black" : "",
                      }}
                    >
                      {mode.name}
                    </h3>
                  );
                })}
                <p>
                  <br />
                  {giftModes[currModeID].mode_desc}
                </p>
              </div>
            </div>
            <p
              className={styles.warning}
              style={{ color: greenSwitch ? "green" : "red" }}
            >
              {addSecPrompt}
            </p>
            <br></br>

            {/* <Spacer height="3vh"/> */}
          </>
        ) : groupCreationStage == 2 ? (
          <>
            <div className={styles.inline_wrapper}>
              <br />
              <p className={styles.label}>INVITE LINK</p>
              <Spacer height="40px" />
              <input
                className={styles.input}
                value={`https://giftee.io/invite?refid=${newGroupHash}`}
                type="string"
                // placeholder="# of users"

                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    validate();
                  }
                }}
              />
              <input
                className={styles.input}
                value={`http://localhost:3000/invite?refid=${newGroupHash}`}
                type="string"
                // placeholder="# of users"

                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    validate();
                  }
                }}
              />
              <Spacer height="15px" />

              <p className={styles.label}>ADD PEOPLE FROM CURRENT GROUPS</p>
              <Spacer height="40px" />

              <div className={styles.mode_list_wrapper}>
                {userList ? (
                  userList.length > 0 ? (
                    <>
                      {userList.map((user, i) => {
                        ////console.log(userList);
                        return (
                          <>
                            <div
                              id={user.id}
                              value={user.id}
                              className={styles.gift_group}
                              style={{
                                backgroundColor: checkStates[i]
                                  ? "rgba(60, 179, 113,.3)"
                                  : "",
                                color: checkStates[i] ? "black" : "",
                              }}
                              onClick={() => {
                                updateUsers(user.id, user.name);
                                let temp = checkStates;
                                temp[i] = !temp[i];
                                setCheckStates(temp);
                                ////console.log(checkStates);
                                setBool(!bool);
                              }}
                            >
                              <img
                                src={"/IMGassets/good_check.png"}
                                className={
                                  checkStates[i]
                                    ? styles.privacy_icon
                                    : styles.icon_hidden
                                }
                              />
                              <p
                                key={user.id}
                                style={{
                                  position: "relative",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  paddingLeft: "1vw",
                                  paddingRight: "1vw",
                                }}
                              >
                                {user.name}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <div style={{ width: "50%" }}>
                      <p>
                        Once you're part of a group with members, you can add
                        people from your other groups here.
                      </p>
                    </div>
                  )
                ) : (
                  <Loading />
                )}
              </div>
              {/* <Spacer height="5vh"/> */}
              {giftAdded ? (
                <div className={styles.group_added}>
                  <p>People added!</p>
                  <img
                    src="/IMGassets/good_check.png"
                    style={{
                      width: "3vw",
                      height: "3vw",
                      marginLeft: "1vw",
                      marginTop: "-.2vw",
                    }}
                  />
                </div>
              ) : (
                <div className={styles.group_added_after}>
                  <p>People added!</p>
                  <img
                    src="/IMGassets/good_check.png"
                    style={{
                      width: "3vw",
                      height: "3vw",
                      marginLeft: "1vw",
                      marginTop: "-.2vw",
                    }}
                    s
                  />
                </div>
              )}

              <p>
                <button
                  className={styles.go_button}
                  onClick={addUsersToGroup}
                  style={{
                    backgroundColor:
                      attachedUsers.length > 0 ? "rgb(100, 207, 50)" : "",
                    transition: attachedUsers.length > 0 ? "1.5s" : ".5s",
                  }}
                >
                  {attachedUsers.length > 0 ? "Add Selected Users" : "Done"}
                </button>
              </p>
            </div>
            <br></br>
            <div
              className={styles.warning}
              style={{ color: greenSwitch ? "green" : "red" }}
            >
              {addSecPrompt}
            </div>
          </>
        ) : (
          <></>
        )}

        {groupCreationStage == 1 ? (
          <>
            {giftAdded ? (
              <div className={styles.group_added}>
                <p>Group successfully created!</p>
                <img
                  src="/IMGassets/good_check.png"
                  style={{
                    width: "3vw",
                    height: "3vw",
                    marginLeft: "1vw",
                    marginTop: "-.2vw",
                  }}
                />
              </div>
            ) : (
              <div className={styles.group_added_after}>
                <p>Group successfully created! </p>
                <img
                  src="/IMGassets/good_check.png"
                  style={{
                    width: "3vw",
                    height: "3vw",
                    marginLeft: "1vw",
                    marginTop: "-.2vw",
                  }}
                  s
                />
              </div>
            )}

            <p>
              <button
                className={styles.go_button}
                onClick={groupPost}
                style={{
                  backgroundColor:
                    userFloat && (numFloat || focus == "login")
                      ? "rgb(100, 207, 50)"
                      : "",
                  transition:
                    userFloat && (numFloat || focus == "login")
                      ? "1.5s"
                      : ".5s",
                }}
              >
                Create Group
              </button>
            </p>
          </>
        ) : (
          <></>
        )}
        <Spacer height="15px" />
      </div>
    </>
  );
}
