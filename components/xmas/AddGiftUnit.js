import React, { Component, useState, useEffect } from "react";
import styles from "/pages/AddGift.module.css";
import XMAS_AddGift from "@components/mutation_apis/XMAS_AddGift";
import XMAS_DeleteGift from "@components/mutation_apis/XMAS_DeleteGift";
import Spacer from "@components/Spacer";
import {
  isReady,
  getAllGroups,
} from "@components/data_management/CurrGroupData";
import XMAS_UpdateGift from "@components/mutation_apis/XMAS_UpdateGift";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "./LoadingPage";

let curr_group;
// = getGroupObject()

export default function AddGiftUnit({
  edit,
  prompt,
  focusGift,
  setSingleGiftOpen,
  groupData,
}) {
  // const [userCheckVal, setUserCheckVal] = useState('')
  // const [userPasswordCheckVal, setUserPasswordCheckVal] = useState('')
  // const [validName, setValidName] = useState('')
  const [addPrompt, setAddPrompt] = useState("");
  // const [addSecPrompt, setAddSecPrompt] = useState('')
  const [greenSwitch, setGreenSwitch] = useState(true);
  // // const [greenSecSwitch, setSecGreenSwitch] = useState(true)
  // const [viewPassword, setViewPassword] = useState('password')
  // const [createNew, setCreateNew] = useState(false)
  // const [numUsers, setNumUsers] = useState(0)
  // const [groupData, setGroupData] = useState(curr_group)
  const [giftAdded, setGiftAdded] = useState(false);
  const [bool, setBool] = useState(false);

  const [giftName, setGiftName] = useState("");
  const [giftURL, setGiftURL] = useState("");
  const [giftCost, setGiftCost] = useState("");
  const [giftDetails, setGiftDetails] = useState("");
  const [customCost, setCustomCost] = useState("");

  const [giftFloat, setGiftFloat] = useState(false);
  const [URLFloat, setURLFloat] = useState(false);
  const [costFloat, setCostFloat] = useState(false);
  const [detailsFloat, setDetailsFloat] = useState(false);
  const [customCostFloat, setCustomCostFloat] = useState(false);

  const [runOnce, setRunOnce] = useState(0);
  const [allGroupsData, setAllGroupsData] = useState();
  const [ready, setReady] = useState(false);
  const [attachedGroups, setAttachedGroups] = useState([]);
  const [successPrompt, setSuccessPrompt] = useState("");

  const [loaded, setLoaded] = useState(false);

  const [checkStates, setCheckStates] = useState(Array(20).fill(false));
  const { user, getAccessTokenSilently } = useAuth0();
  const [buttonGreen, setButtonGreen] = useState(false);
  const [edited, setEdited] = useState(false);

  const [privateGroup, setPrivateGroup] = useState(true);
  const [showDeletionWarning, setShowDeletionWarning] = useState(false);
  const [showDeletionWarningText, setShowDeletionWarningText] = useState(
    "Are you positive? This is a permanent deletion of your gift."
  );

  ////******* UseEffects START *******////
  ////******* UseEffects START *******////
  ////******* UseEffects START *******////
  useEffect(() => {
    if (edited) {
      setButtonGreen(true);
    }
  }, [edited, setEdited, allGroupsData]);

  useEffect(() => {
    setTimeout(() => {
      getGroups();
    }, [1000]);
  }, [ready, loaded]);

  useEffect(() => {
    checkFloat();
  }, [giftURL, giftName, giftCost, giftDetails, customCost]);

  useEffect(() => {
    setGiftAdded(false);
    setGreenSwitch(true);
  }, [giftAdded, setGiftAdded, setGreenSwitch, greenSwitch]);

  useEffect(() => {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    slider.value = 0;
    output.innerHTML = giftCost; // Display the default slider value
  }, [loaded]);

  useEffect(() => {
    ////console.log(focusGift);
    if (focusGift && allGroupsData) {
      let name = document.getElementById("gift_name");
      let url = document.getElementById("gift_url");
      let details = document.getElementById("gift_details");
      let cost = document.getElementById("gift_cost");

      name.value = focusGift.gift_name;
      url.value = focusGift.url;
      details.value = focusGift.details;
      cost.value = focusGift.cost;

      name.innerHTML = focusGift.gift_name;
      url.innerHTML = focusGift.url;
      details.innerHTML = focusGift.details;
      cost.innerHTML = focusGift.cost;

      setGiftName(focusGift.gift_name);
      setGiftURL(focusGift.url);
      setGiftDetails(focusGift.details);

      if (focusGift.cost) {
        cost.innerHTML = focusGift.cost;
        cost.value = focusGift.cost;
        setGiftCost(focusGift.cost);
      }

      let temp = checkStates;
      let temp2 = attachedGroups;

      for (let i = 0; i < allGroupsData.length; i++) {
        for (let j = 0; j < focusGift.group_ids.length; j++) {
          if (allGroupsData[i].id == focusGift.group_ids[j]) {
            temp[i] = true;
            temp2.push(focusGift.group_ids[j]);
          }
        }
      }

      setAttachedGroups(temp2);

      setCheckStates(temp);

      if (focusGift.gift_name != "") {
        setGiftFloat(true);
      } else {
        setGiftFloat(false);
      }

      if (focusGift.url != "") {
        setURLFloat(true);
      } else {
        setURLFloat(false);
      }
      if (focusGift.cost != "") {
        setCostFloat(true);
        setCustomCostFloat(true);
        updateSlider(0);
      } else {
        setCustomCostFloat(false);
      }

      if (focusGift.detail != "") {
        setDetailsFloat(true);
      } else {
        setDetailsFloat(false);
      }
    }
  }, [allGroupsData]);
  ////******* UseEffects END *******////
  ////******* UseEffects END *******////
  ////******* UseEffects END *******////

  if (isReady() && runOnce % 10 == 1) {
    setReady(true);
    setRunOnce(runOnce + 1);
  }

  const deleteGift = async (focusGift) => {
    let tempObj = groupData;
    tempObj.gifts = groupData.gifts.filter(
      (gift) => gift.gift_id !== focusGift.gift_id
    );

    const token = await getAccessTokenSilently();

    let promise = XMAS_DeleteGift(
      localStorage.getItem("user_id"),
      focusGift.gift_id,
      token
    );

    promise.then((data) => {
      setShowDeletionWarningText("Gift deleted :(");
      setTimeout(() => {
        setSingleGiftOpen(false);
        setAddPrompt("");
        setGiftName("");
        setGiftURL("");
        setGiftCost("");
        setCustomCost("");

        setGiftDetails("");
        updateSlider("");
        setShowDeletionWarning(false);

        var slider = document.getElementById("myRange");
        slider.value = 0;
      }, [1500]);
    });
  };

  const getGroups = () => {
    let temple = getAllGroups();

    temple.then((data) => {
      setAllGroupsData(data);
      curr_group = data;
    });
  };

  const checkFloat = () => {
    if (giftName != "") {
      setGiftFloat(true);
    } else {
      setGiftFloat(false);
    }

    if (giftURL != "") {
      setURLFloat(true);
    } else {
      setURLFloat(false);
    }

    if (giftCost != "" && giftCost != 0) {
      setCostFloat(true);
    } else {
      setCostFloat(false);
    }

    if (customCost != "") {
      setCustomCostFloat(true);
      setGiftCost("");
      setCostFloat(false);
      updateSlider(0);
    } else {
      setCustomCostFloat(false);
    }

    if (giftDetails != "") {
      setDetailsFloat(true);
    } else {
      setDetailsFloat(false);
    }
  };

  const validate = async () => {
    if (!giftName) {
      setAddPrompt("Oops you didn't enter a gift name");
      setGreenSwitch(false);
      return;
    } else if (attachedGroups.length == 0) {
      setAddPrompt("You need to specify at least one group for your gift.");
      setGreenSwitch(false);
      return;
    } else if (!Number.isInteger(+giftCost)) {
      setAddPrompt("The cost needs be a round number (without symbols)");
      setGreenSwitch(false);
      return;
    } else if (+giftCost < 0) {
      setAddPrompt("Negative cost? whaaaaaa?");
      setGreenSwitch(false);
      return;
    }

    let true_cost;
    if (customCost != "") {
      true_cost = customCost;
    } else if (giftCost != "") {
      true_cost = giftCost;
    } else true_cost = null;

    setGiftAdded(true);
    const token = await getAccessTokenSilently();

    if (edit) {
      //update function
      let promise = XMAS_UpdateGift({
        user: localStorage.getItem("user_name"),
        group_id: localStorage.getItem("group_id"),
        giftName: giftName,
        giftURL: giftURL,
        giftCost: true_cost,
        giftDetails: giftDetails,
        attachedGroups: attachedGroups,
        gift_id: focusGift.gift_id,
        token: token,
      });

      promise.then((data) => {});
      setSuccessPrompt("Gift Updated!");
      setTimeout(() => {
        setSingleGiftOpen(false);
      }, [1000]);
    } else {
      let promise = XMAS_AddGift({
        user_id: localStorage.getItem("user_id"),
        user_name: localStorage.getItem("user_name"),
        group_id: localStorage.getItem("group_id"),
        giftName: giftName,
        giftURL: giftURL,
        giftCost: true_cost,
        giftDetails: giftDetails,
        attachedGroups: attachedGroups,
        token: token,
      });
      setSuccessPrompt("Gift Added!");

      promise.then((data) => {});
    }
    setAddPrompt("");
    setGiftName("");
    setGiftURL("");
    setGiftCost("");
    setCustomCost("");

    setGiftDetails("");
    updateSlider("");

    var slider = document.getElementById("myRange");
    slider.value = 0;
  };

  const updateGroupsList = (group_id) => {
    let temp = attachedGroups;
    let index = temp.indexOf(group_id);

    if (index == -1) {
      temp.push(group_id);
    } else {
      temp.splice(index, 1);
    }
    setAttachedGroups(temp);
  };

  const updateSlider = (val) => {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    if (customCost == "") {
      setGiftCost(val);
      slider.value = val;
      if (val != 0) {
        output.innerHTML = `$${val}`;
      } else output.innerHTML = "";
    } else {
      setGiftCost("");
      output.innerHTML = "";
      slider.value = 0;
    }
  };

  return (
    <>
      {edit ? <></> : <Spacer height="200px" />}

      <div
        className={styles.add_gift_container}
        style={{ width: edit ? "100%" : "", left: edit ? "-0%" : "" }}
      >
        <div className={styles.login_container}>
          <h2 className={styles.title}>{prompt}</h2>
          <div>
            {edit && (
              <img
                src={"/IMGassets/exit.png"}
                className={styles.skip_forward_button}
                onClick={() => setSingleGiftOpen(false)}
              />
            )}
          </div>
          <br></br>
          <br></br>
          <div className={styles.login_signup_wrapper}>
            <div className={styles.form}>
              <div className={styles.inline_wrapper}>
                <div
                  style={{
                    color: "red",
                    bottom: "-1.1vw",
                    position: "relative",
                    left: "-50%",
                  }}
                >
                  *
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label>
                    <p
                      className={giftFloat ? styles.label_float : styles.label}
                    >
                      GIFT NAME{" "}
                    </p>
                  </label>
                  <input
                    id="gift_name"
                    className={styles.input}
                    type="string"
                    // placeholder="Gift idea/name"
                    value={giftAdded ? "" : giftName}
                    onChange={(e) => {
                      setGiftName(e.target.value);
                      setEdited(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        // validate()
                      }
                    }}
                  />
                </div>
                <Spacer height="3vh" />
              </div>
              <div className={styles.inline_wrapper}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label>
                    <p className={URLFloat ? styles.label_float : styles.label}>
                      LINK OR URL{" "}
                    </p>
                  </label>
                  <input
                    id="gift_url"
                    className={styles.input}
                    type="string"
                    // placeholder="Link of gift or similar"
                    value={giftAdded ? "" : giftURL}
                    onChange={(e) => {
                      setGiftURL(e.target.value);
                      setEdited(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        // validate()
                      }
                    }}
                  />
                </div>
                <Spacer height="3.5vh" />
              </div>

              <div
                className={styles.inline_wrapper}
                style={{ marginTop: "-0vh", paddingBottom: "3vh" }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <br />
                  <label>
                    <p
                      className={
                        detailsFloat ? styles.label_float : styles.label
                      }
                    >
                      DETAILS
                    </p>
                  </label>
                  <textarea
                    id="gift_details"
                    rows="1"
                    className={styles.input_long}
                    // style={{ height: "8vh" }}
                    type="text"
                    // placeholder="Additional details"
                    value={giftAdded ? "" : giftDetails}
                    onChange={(e) => {
                      if (e.keyCode === 13) {
                        e.target.style.height += "20px";
                      }
                      setGiftDetails(e.target.value);
                      setEdited(true);
                      e.target.style.maxHeight = "auto";
                      e.target.style.maxHeight =
                        Math.max(
                          e.target.style.maxHeight,
                          e.target.scrollHeight
                        ) + "px";
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        // validate()
                      }
                    }}
                  />
                  {/* <div className={styles.input_option} style={{ color: greenSwitch ? "" : "rgb(211, 134, 0)", transition: greenSwitch ? "3s ease-in" : "0s" }}>recommended</div> */}
                  <Spacer height="3vh" />
                </div>
              </div>

              <Spacer height="0vh" />
              <div className={styles.inline_wrapper}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <label>
                    <p
                      className={costFloat ? styles.label_float : styles.label}
                    >
                      APPROX COST
                    </p>
                  </label>
                  <div id="demo" className={styles.apprx_cost_label}></div>
                  <div
                    style={{ width: "40%", right: "0%", position: "absolute" }}
                  >
                    <label style={{ width: "100%" }}>
                      <p
                        className={
                          customCostFloat ? styles.label_float : styles.label
                        }
                      >
                        CUSTOM COST
                      </p>
                    </label>
                    <input
                      id="gift_cost"
                      className={styles.input}
                      type="number"
                      min={0}
                      // placeholder="Approx. cost"
                      value={giftAdded ? "" : customCost}
                      onChange={(e) => {
                        setCustomCost(e.target.value);
                        setEdited(true);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          validate();
                        }
                      }}
                    />
                  </div>
                </div>
                <Spacer height="2vh" />

                <div className={styles.slidecontainer}>
                  <br></br>
                  <input
                    id="myRange"
                    type="range"
                    min="0"
                    step={5}
                    max="100"
                    className={styles.slider}
                    onInput={(e) => {
                      updateSlider(e.target.value);
                    }}
                  ></input>
                </div>
              </div>

              <div className={styles.inline_wrapper}>
                <div
                  style={{
                    color: "red",
                    bottom: "-3vh",
                    position: "relative",
                    left: "-50%",
                  }}
                >
                  *
                </div>
                <label>
                  <p className={styles.label}>YOUR GROUPS</p>
                </label>
                <br></br>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <div className={styles.gift_group_wrapper}>
                    {allGroupsData || bool ? (
                      allGroupsData.map((group, i) => {
                        return (
                          <div
                            id={group.id}
                            key={group.id}
                            value={group.id}
                            className={styles.gift_group}
                            style={{
                              backgroundColor: checkStates[i]
                                ? "rgba(60, 179, 113,.3)"
                                : "",
                              color: checkStates[i] ? "black" : "",
                            }}
                            onClick={() => {
                              updateGroupsList(group.id);
                              let temp = checkStates;
                              temp[i] = !temp[i];
                              setCheckStates(temp);
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
                              style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                paddingLeft: ".5vh",
                                paddingRight: ".5vh",
                              }}
                            >
                              {group.name}
                            </p>
                            <img
                              src={
                                privateGroup
                                  ? "/IMGassets/private_icon2.png"
                                  : "/IMGassets/global_icon.png"
                              }
                              className={styles.privacy_icon}
                            />
                          </div>

                          // </div>
                        );
                      })
                    ) : (
                      <div style={{ position: "relative", left: "17vw" }}>
                        {/* <Loading /> */}

                        <LoadingPage small={true} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <br></br>

              {giftAdded ? (
                <div className={styles.gift_added}>
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      display: !giftAdded && "none",
                    }}
                  >
                    {successPrompt}
                  </div>
                  <img
                    src="/IMGassets/good_check.png"
                    style={{
                      width: "3vh",
                      // marginLeft: "1vw",
                      // marginTop: "-.2vw",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      display: !giftAdded && "none",
                    }}
                  />
                </div>
              ) : (
                <div className={styles.gift_added_after}>
                  <div>{successPrompt} </div>
                  <img
                    src="/IMGassets/good_check.png"
                    style={{
                      width: "3vh",
                      // marginLeft: "1vw",
                      // marginTop: "-.2vw",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      display: !giftAdded && "none",
                    }}
                  />
                </div>
              )}
              <div
                className={styles.warning}
                style={{
                  color: greenSwitch ? "black" : "red",
                  transition: greenSwitch ? "3s ease-in" : "0s",
                }}
              >
                {addPrompt}
              </div>
              <br></br>
              {edit ? (
                <>
                  {showDeletionWarning ? (
                    <>
                      <h3>{showDeletionWarningText}</h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          margin: "20px",
                        }}
                      >
                        <button
                          className={styles.delete_button}
                          onClick={() => deleteGift(focusGift)}
                        >
                          Delete
                        </button>
                        <button
                          className={styles.go_button}
                          onClick={() => setShowDeletionWarning(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        margin: "20px",
                      }}
                    >
                      <button className={styles.go_button} onClick={validate}>
                        {"Update!"}
                      </button>
                      <button
                        className={styles.delete_button}
                        onClick={() => setShowDeletionWarning(true)}
                      >
                        {"Delete"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button className={styles.go_button} onClick={validate}>
                  {"Submit!"}
                </button>
              )}
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </div>
      <Spacer height="200px" />
    </>
  );
}
