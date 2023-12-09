import React, { Component, useState, useEffect, forceUpdate } from "react";
import styles from "./myGifts.module.css";
import {
  getGroupObject,
  updateGroupObject,
} from "@components/data_management/CurrGroupData";
import XMAS_GetGroupObject from "@components/mutation_apis/XMAS_GetGroupObject";
import Spacer from "@components/Spacer";
import XMAS_SetTaken from "@components/mutation_apis/XMAS_SetTaken";
import { useRef } from "react";
import { isReady } from "@components/data_management/CurrGroupData";
import HomeTop from "@components/xmas/HomeTop";
import HomeBottom from "@components/xmas/HomeBottom";
import AddGiftUnit from "@components/xmas/AddGiftUnit";
import Loading from "@components/xmas/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";
import ReferralLink from "@components/xmas/ReferralLink";

// let curr_group
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

export default function MyGifts({
  prompt,
  oneOpen,
  setOneOpen,
  dataChange,
  setDataChange,
  setCurrPageName,
  errorHappening,
  setErrorHappening,
}) {
  const [data, setData] = useState("");
  const [runOnce, setRunOnce] = useState(0);
  const [singleGiftStyle, setSingleGiftStyle] = useState(styles.gift_box);
  const [singleGiftOpen, setSingleGiftOpen] = useState(false);
  const [singleGiftObject, setSingleGiftObject] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);
  const [stale, setStale] = useState(false);
  const giftRef = useRef(null);
  const [sortVal, setSortVal] = useState("");
  const [onlyMe, setOnlyMe] = useState(true);
  const [one, setOne] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [costMin, setCostMin] = useState(null);
  const [costMax, setCostMax] = useState(null);
  const [yOffSet, setYOffset] = useState("");
  const [bool, setBool] = useState(true);
  const [groupData, setGroupData] = useState();
  const [ready, setReady] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();

  const [curr_user_id, set_curr_user_id] = useState();
  const [curr_user_name, set_curr_user_name] = useState();

  const [link, setLink] = useState("Generating...");

  // useEffect(() => {
  //     getGroup()
  //     setRunOnce(runOnce + 1)
  // }, [groupData])

  ////console.log("............");
  ////console.log("............");
  ////console.log("............");
  ////console.log(groupData);

  useEffect(() => {
    // getGroup()

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
    // curr_group = getGroupObject()

    // let temple = getGroupObject();

    // temple.then((data) => {
    //   setGroupData(data);
    // });

    let curr_group = getGroupObject();
    curr_group.then((data) => {
      const curr_group = data;
      setGroupData(curr_group);
      ////console.log(curr_group);
      setLink(curr_group.invite_link);
    });

    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log("this is the groupdata returned to the main compoennt");
    ////console.log(getGroupObject());
    ////console.log(groupData);
    // ////console.log("current user")
    // ////console.log(localStorage.getItem('current_user'))
    // ////console.log("group_id")

    // ////console.log(localStorage.getItem('group_id'))

    // let promise = XMAS_GetGroupObject(localStorage.getItem('current_user'), localStorage.getItem('group_id'))

    // promise.then((data) => {
    //     ////console.log("data returned from the page load API call")
    //     ////console.log(data)
    //     curr_group = data
    //     updateGroupObject(data)
    //     setGroupData(data)
    // }
    // )
  };

  // if (!groupData && runOnce == 1) {
  //     ////console.log("RUNONCE VAL: " + runOnce)
  //     getGroup()
  // }

  // getGroup()
  ///////////// functional responsive /////////////////////
  ///////////// functional responsive /////////////////////
  ///////////// functional responsive /////////////////////

  const giftClick = (gift_id) => {
    if (!oneOpen) {
      setSingleGiftStyle(styles.single_gift_box);
      setSingleGiftOpen(true);
      // setOneOpen(true)
      setSingleGiftObject(
        groupData.gifts.find((gift) => gift.gift_id === gift_id)
      );
    }
  };

  const exitGiftClick = (gift_id) => {
    // if (oneOpen) {
    ////console.log("gift UNclicked");
    setSingleGiftStyle(styles.gift_box);
    setSingleGiftOpen(false);
    setIsClaiming(false);
    // setOneOpen(false)
    // }
  };

  const doNothing = (event) => {
    event.stopPropagation();
  };

  const claimGiftCheck = (event) => {
    setIsClaiming(true);
    event.stopPropagation();
  };

  const claimYes = (takenVal) => {
    updateTaken(takenVal, singleGiftObject.gift_id);
    goAway();
    wait(setSingleGiftOpen(false), 3000);
    setIsClaiming(false);
    setOneOpen(false);
    setDataChange(true);
  };

  const claimNo = () => {
    setIsClaiming(false);
  };

  const redirect = (loc) => {
    window.location.href = loc;
  };

  function wait(fn, delay) {
    setTimeout(fn, delay);
  }

  function goAway() {
    // if (giftRef && giftRef.current) {
    //     giftRef.current.style.top = "2000vw";
    //     giftRef.current.style.transition = "5s";
    //     giftRef.current.style.display = "none"
    // }
  }

  const updateTaken = async (taken, gift_id) => {
    const token = await getAccessTokenSilently();

    let userVal = "";
    if (taken) {
      userVal = localStorage.getItem("current_user");
    } else {
      userVal = null;
    }

    let promise = XMAS_SetTaken({
      taken_value: taken,
      gift_unique_id: gift_id,
      giver_id: userVal,
      giver_name: userVal, // this is probably wrong
      token: token,
    });

    promise.then((data) => {
      setStale(true);
      location.href = "/explore";
    });
  };

  const handleSortChange = (e) => {
    let tempArray = groupData;
    switch (e.target.value) {
      case "nameUp":
        tempArray.gifts.sort((a, b) => (a.requester > b.requester ? 1 : -1));
        ////console.log(tempArray);
        break;
      case "nameDown":
        tempArray.gifts.sort((a, b) => (a.requester < b.requester ? 1 : -1));
        ////console.log(tempArray);
        break;
      case "costUp":
        tempArray.gifts.sort((a, b) => (a.cost > b.cost ? 1 : -1));
        ////console.log(tempArray);
        break;
      case "costDown":
        tempArray.gifts.sort((a, b) => (a.cost < b.cost ? 1 : -1));
        ////console.log(tempArray);
        break;
      case "newest":
        tempArray.gifts.sort((a, b) => (a.gift_id > b.gift_id ? 1 : -1));
        ////console.log(tempArray);
        break;
      case "oldest":
        tempArray.gifts.sort((a, b) => (a.gift_id < b.gift_id ? 1 : -1));
        ////console.log(tempArray);
        break;
      default:
        break;
    }
    setSortVal(e.target.value);
    setGroupData(tempArray);
    setBool(!bool);
  };

  const handleNameSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

  const dispatchSearchVal = () => {};

  ///////////// functional responsive /////////////////////
  ///////////// functional responsive /////////////////////
  ///////////// functional responsive /////////////////////

  useEffect(() => {
    set_curr_user_name(localStorage.getItem("user_name"));
    set_curr_user_id(localStorage.getItem("user_id"));
    setStale(false);
    setYOffset(window.pageYOffset);
    setRunOnce(runOnce + 1);

    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        // close the element
        exitGiftClick();
      }
    };
  }, [
    groupData,
    setGroupData,
    giftRef,
    setStale,
    stale,
    dataChange,
    setDataChange,
    singleGiftOpen,
  ]);

  useEffect(() => {
    // getGroup()
    window.addEventListener("scroll", function () {
      setYOffset(window.pageYOffset);
    });
  }, []);

  ////console.log("this is group data before main gift component loading");
  ////console.log(groupData);
  // ////console.log(groupData.gifts.length)

  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log("single gift thing");
  ////console.log(singleGiftObject);

  return (
    <>
      <HomeTop oneOpen={oneOpen} />
      <div
        style={{
          backgroundColor: singleGiftOpen ? "rgba(0, 0, 0, 0.657)" : "",
          background: singleGiftOpen ? "rgba(0, 0, 0, 0.657)" : "",
          position: "fixed",
          // zIndex: "-1",
          width: "100%",
          height: "110vh",
        }}
      ></div>

      <MasterBodyContainer>
        <Spacer height={"100px"} />
        <div
          className={styles.master_container}
          style={{
            backgroundColor: singleGiftOpen ? "rgba(0, 0, 0, 0)" : "",
          }}
        >
          <button
            style={{
              position: "fixed",
              left: "2.5%",
              top: "20%",
              borderRadius: "100px",
              backgroundColor: oneOpen && "rgba(0,0,0,.1)",
              zIndex: 100000000,
            }}
            onClick={() => (window.location.href = "/addGift")}
          >
            <img
              src="IMGassets/plus.png"
              style={{ width: "2vh", display: "flex" }}
            />
          </button>
          <br />
          <h1>My Gifts</h1>

          <div className={styles.sort_container}>
            {/* {claimed ? (
                    <div style={{ flexDirection: "column", width: "33%" }}>
                        <div className={styles.filters_title} style={{ marginTop: "-1vw" }} >Only show gifts <br />claimed by me</div>
                        <input type="checkbox" className={styles.checkbox} styles={{ opacity: "50%" }} onClick={() => setOnlyMe(!onlyMe)} />
                    </div>
                ) : (
                    <div></div>
                )
                } */}
            <div style={{ flexDirection: "column", width: "33%" }}>
              {/* <p className={styles.filters_title}>Sort by...</p> */}
              <select
                className={styles.filter_inputs}
                onChange={handleSortChange}
              >
                <option value="">Sort by...</option>
                <option value="nameUp"> Ascending Name</option>
                <option value="nameDown"> Descending Name</option>
                <option value="costUp"> Ascending Cost</option>
                <option value="costDown"> Descending Cost</option>
                <option value="newest"> Newest First</option>
                <option value="oldest"> Oldest First</option>
              </select>
            </div>
            {/* <div style={{ flexDirection: "column", width: "33%" }}>
                    <div className={styles.filters_title} >  For... </div>
                    <select className={styles.filter_inputs} onChange={handleNameSearchChange} style={{ width: "70%" }} >
                        <option value=""></option>
                        {groupData ? (
                            groupData.group_members.map(function (mapped_name, index) {
                                if (mapped_name == name) {
                                    return
                                } else {
                                    return <option key={index} value={mapped_name}>{mapped_name}</option>
                                }
                            })
                        ) : (<option>Something went wrong...</option>)
                        }
                    </select>
                </div> */}
            {/* <div style={{ flexDirection: "column", width: "33%" }}>
                <p className={styles.filters_title}> Search </p>
                <input
                  className={styles.filter_inputs}
                  placeholder=" WIP..."
                  onChange={(e) => {
                    dispatchSearchVal(e.target.value);
                  }}
                />
              </div> */}
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                // width: "40%",
              }}
            >
              {/* <div style={{ flexDirection: "row", display: "flex" }}>
            <p className={styles.filters_title}></p> */}

              <input
                className={styles.stack_filter_inputs}
                placeholder="Min $"
                type="number"
                step={5}
                min={0}
                onChange={(e) => {
                  if (e.target.value.length === 0) {
                    setCostMin(null);
                  } else {
                    setCostMin(e.target.value);
                  }
                }}
              />
              {/* </div> */}

              {/* <div style={{ flexDirection: "row", display: "flex" }}>
            <p className={styles.filters_title}>Max $</p> */}

              <input
                className={styles.stack_filter_inputs}
                placeholder="Max $"
                type="number"
                step={5}
                onChange={(e) => {
                  if (e.target.value.length === 0) {
                    setCostMax(null);
                  } else {
                    setCostMax(e.target.value);
                  }
                }}
              />
              {/* </div> */}
            </div>
          </div>
          {groupData && (true || bool) ? (
            <div className={styles.gift_container}>
              {groupData.gifts.filter(
                (gift) => gift.requester_id == curr_user_id
              ).length === 0 ? (
                <div>
                  Whoa looks like there's no gifts... let's change that!
                  <br />
                  (Gifts for yourself will not appear here)
                  <br />
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <a href="#referral">
                      <button className={styles.empty_gifts_button}>
                        Invite Others
                      </button>
                    </a>
                    <button
                      className={styles.empty_gifts_button}
                      onClick={() => redirect("addGift")}
                    >
                      Add Gifts
                    </button>
                  </div>
                </div>
              ) : (
                groupData.gifts.map(function (item) {
                  if (
                    item.requester_id == curr_user_id &&
                    item.gift_id &&
                    // && item.taken === claimed
                    (searchVal == "" || searchVal == item.requester) &&
                    (costMin == null ||
                      // || costMin == '0'
                      costMin <= item.cost) &&
                    (costMin == null ||
                      // || +costMax === 0
                      costMax >= item.cost)
                  ) {
                    item.color = getRandomColor(item.gift_id);
                    return (
                      <div
                        className={styles.gift_box}
                        id={`gift-${item.gift_id}`}
                        ref={giftRef}
                        key={item.gift_id}
                        onClick={() => giftClick(item.gift_id)}
                        style={{ backgroundColor: item.color + ".4)" }}
                      >
                        {/* <div className={styles.gift_detail}>{item.giver}</div> */}

                        <p
                          className={styles.gift_detail}
                          style={{ borderBottom: "1px solid black" }}
                        >
                          {item.requester}
                        </p>
                        {/* <div style={{ borderRight: "2.5px solid black", width: "0", minWidth: "0%" }} /> */}
                        {item.gift_name.length <= 30 ? (
                          <p className={styles.gift_detail}>{item.gift_name}</p>
                        ) : (
                          <p className={styles.gift_detail}>
                            {item.gift_name.substring(0, 30) + `\n...`}
                          </p>
                        )}
                      </div>
                    );
                  } else return;
                })
              )}
            </div>
          ) : (
            // <><Spinner/></>
            <div>
              <br />
              <Loading />
              <br />
              <br />
              <br />
            </div>
          )}
          {singleGiftOpen ? (
            <>
              <div
                className={styles.single_gift_page_container}
                style={{ width: "80%", left: "10%" }}
                // style={{ top: window.pageYOffset }}
                onClick={exitGiftClick}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    exitGiftClick();
                  }
                }}
              >
                <div onClick={doNothing}>
                  {/* <img src="/IMGassets/bow.png" className={styles.image} /> */}
                  <AddGiftUnit
                    prompt={"Edit gift details"}
                    edit={true}
                    focusGift={singleGiftObject}
                    groupData={groupData}
                    setGroupData={setGroupData}
                    onClick={doNothing}
                    setSingleGiftOpen={setSingleGiftOpen}
                  />
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
        {!singleGiftOpen && (
          <>
            <Spacer height={"40px"} />
            <div id="referral" />

            <ReferralLink link={link} />
            <Spacer height={"40px"} />
            <Spacer height={"100px"} />

          </>
        )}
      </MasterBodyContainer>
      <HomeBottom />
    </>
  );
}

// export default withAuthenticationRequired(MyGifts, {
//   // onRedirecting: () => <LoadingPage />,
//   // onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
// });
