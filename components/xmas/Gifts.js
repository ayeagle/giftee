import React, { Component, useState, useEffect, forceUpdate } from "react";
import styles from "@components/xmas/Gifts.module.css";
import { getGroupObject } from "../data_management/CurrGroupData";
import Spacer from "@components/Spacer";
import XMAS_SetTaken from "../mutation_apis/XMAS_SetTaken";
import { useRef } from "react";
import { isReady } from "../data_management/CurrGroupData";
import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";

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

export default function Gifts({
  prompt,
  claimed,
  oneOpen,
  setOneOpen,
  dataChange,
  setDataChange,
  setCurrPageName,
  setGoScroll,
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

  const [curr_user_id, set_curr_user_id] = useState();
  const [curr_user_name, set_curr_user_name] = useState();

  const { user, getAccessTokenSilently } = useAuth0();

  const [numGiftsDisplayed, setNumGiftsDisplayed] = useState(0);
  const [maxGifts, setMaxGifts] = useState(10);
  const [shouldDisplayIncreaseOption, setShouldDisplayIncreaseOption] =
    useState(true);

  const [loadMorePrompt, setLoadMorePrompt] = useState("Load more gifts!");
  const [members, setMembers] = useState([]);
  const [throwError, setThrowError] = useState(true);

  let displayCount = 0;

  const displayedCountRef = useRef(0);

  useEffect(() => {
    startGiftWait();
  }, []);

  async function startGiftWait() {
    await getGroup();

    // const waitForGifts = setInterval(() => {
    //   if (local.isReady()) {
    //     // getUser();
    //     getGroup();
    //     clearInterval(waitForGifts);
    //   }
    // }, 100);
  }


  const [oldCount, setOldCount] = useState(0);

  const increaseGiftLimit = () => {
    if (displayCount < maxGifts) {
      setShouldDisplayIncreaseOption(false);
      setLoadMorePrompt("That all of them :)");
    } else {
      setShouldDisplayIncreaseOption(true);
    }
    //console.log(displayCount);
    //console.log(maxGifts);
    // setOldCount(displayCount)
    setMaxGifts(maxGifts + 10);
  };

  ////////////////
  useEffect(() => {
    if (displayCount > maxGifts - 10) {
      setShouldDisplayIncreaseOption(false);
      setLoadMorePrompt("That all of them :)");
    } else {
      setShouldDisplayIncreaseOption(true);
    }
  }, []);

  ////////////////
  const genNamesList = () => {
    if (groupData) {
      let tempMemb = [];
      groupData.gifts.forEach((gift) => {
        if (!tempMemb.includes(gift.requester)) {
          tempMemb.push(gift.requester);
        }
        ////console.log(tempMemb);
        ////console.log("TEMP MEMB");
      });
      setMembers(tempMemb);
    }
  };

  // useEffect(() => {
  //   if(displayCount < maxGifts){
  //     setShouldDisplayIncreaseOption(false);
  //   }
  // },[shouldDisplayIncreaseOption, maxGifts])

  if (isReady() && runOnce % 10 == 1) {
    setReady(true);
    setRunOnce(runOnce + 1);
    genNamesList();
    // setTimeout(() => {
    //     getGroup()
    // }, [1000])
  }

  const getGroup = () => {
    // curr_group = getGroupObject()

    let temple = getGroupObject();

    temple.then((data) => {
      setGroupData(data);
    });
  };

  const giftClick = (gift_id) => {
    if (!oneOpen) {
      setSingleGiftStyle(styles.single_gift_box);
      setSingleGiftOpen(true);
      setOneOpen(true);
      setSingleGiftObject(
        groupData.gifts.find((gift) => gift.gift_id === gift_id)
      );
    }
  };

  const exitGiftClick = (gift_id) => {
    //////console.log("gift UNclicked");
    setSingleGiftStyle(styles.gift_box);
    setSingleGiftOpen(false);
    setIsClaiming(false);
    setOneOpen(false);
    ////console.log(groupData);
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
    const taken_gift = groupData.gifts.find(
      (gift) => gift.gift_id === singleGiftObject.gift_id
    );
    const index = groupData.gifts.findIndex(
      (gift) => gift.gift_id === singleGiftObject.gift_id
    );

    ////console.log(singleGiftObject);

    ////console.log(singleGiftObject.gift_id);
    ////console.log(taken_gift);
    ////console.log(index);

    taken_gift.taken = !taken_gift.taken;
    taken_gift.giver_id = curr_user_id;
    taken_gift.giver_name = curr_user_name;

    let tempGroupData = groupData;
    tempGroupData.gifts[index] = taken_gift;
    setGroupData(tempGroupData);
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

    let userValName;
    let userValId;
    if (taken) {
      set_curr_user_name(localStorage.getItem("user_name"));
      userValName = localStorage.getItem("user_name");
      set_curr_user_id(localStorage.getItem("user_id"));
      userValId = localStorage.getItem("user_id");
    } else {
      set_curr_user_name(null);
      set_curr_user_id(null);
    }

    let promise = XMAS_SetTaken({
      taken_value: taken,
      gift_unique_id: gift_id,
      giver_id: userValId,
      giver_name: userValName,
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
        //////console.log(tempArray);
        break;
      case "nameDown":
        tempArray.gifts.sort((a, b) => (a.requester < b.requester ? 1 : -1));
        //////console.log(tempArray);
        break;
      case "costUp":
        tempArray.gifts.sort((a, b) => (a.cost > b.cost ? 1 : -1));
        //////console.log(tempArray);
        break;
      case "costDown":
        tempArray.gifts.sort((a, b) => (a.cost < b.cost ? 1 : -1));
        //////console.log(tempArray);
        break;
      case "newest":
        tempArray.gifts.sort((a, b) => (a.gift_id > b.gift_id ? 1 : -1));
        //////console.log(tempArray);
        break;
      case "oldest":
        tempArray.gifts.sort((a, b) => (a.gift_id < b.gift_id ? 1 : -1));
        //////console.log(tempArray);
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

  useEffect(() => {
    //console.log(costMin);
    //console.log(costMin == 0);
  }, [costMin]);

  let numDisplayed = 0;

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

  //console.log(onlyMe)

  useEffect(() => {
    // getGroup()
    window.addEventListener("scroll", function () {
      setYOffset(window.pageYOffset);
    });
  }, [ready, oneOpen, setOneOpen]);

  ////console.log("this is group data before main gift component loading");
  //console.log("groupData");
  //console.log(groupData);
  //console.log(singleGiftObject);
  //////console.log(singleGiftObject);
  //////console.log(singleGiftObject);
  // //////console.log(groupData.gifts.length)

  return (
    <div
      style={{
        backgroundColor: oneOpen ? "rgba(0, 0, 0	 , 0.4)" : "rgba(0, 0, 0, 0)",
        background: oneOpen ? "rgba(0, 0, 0	 , 0.4)" : "rgba(0, 0, 0, 0)",
        borderRadius: "10px",
      }}
    >
      <br />
      <h1>{prompt}</h1>

      {groupData && (true || bool) ? (
        <div className={styles.gift_container}>
          <div className={styles.sort_container}>
            {claimed ? (
              <div style={{ flexDirection: "column" }}></div>
            ) : (
              <div></div>
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flex: "1 0 5vh",
                }}
              >
                <select
                  className={styles.filter_inputs}
                  onChange={handleSortChange}
                >
                  <option className={styles.default_filter_option} value="">
                    Sort by...
                  </option>

                  <option value="nameUp"> Ascending Name</option>
                  <option value="nameDown"> Descending Name</option>
                  <option value="costUp"> Ascending Cost</option>
                  <option value="costDown"> Descending Cost</option>
                  <option value="newest"> Newest First</option>
                  <option value="oldest"> Oldest First</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "5vh",
                  justifyContent: "center",
                  flex: "1 0 5vh",
                }}
              >
                <select
                  // placeholder="For..."
                  className={styles.filter_inputs}
                  onChange={handleNameSearchChange}
                  // style={{ width: "70%" }}
                >
                  <option value="">For...</option>
                  {groupData ? (
                    members.map(function (mapped_name, index) {
                      if (mapped_name == curr_user_name) {
                        return;
                      } else {
                        return (
                          <option key={index} value={mapped_name}>
                            {mapped_name}
                          </option>
                        );
                      }
                    })
                  ) : (
                    <option>Something went wrong...</option>
                  )}
                </select>
              </div>
            </div>
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
                // justifyContent: "space-between"
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
          {groupData.gifts.filter((gift) => gift.requester_id !== curr_user_id)
            .length <= 1 ? (
            <h4>
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
                <p>
                  <a href="#referral">
                    <button className={styles.empty_gifts_button}>
                      Invite Others
                    </button>
                  </a>
                </p>
                <p>
                  <button
                    className={styles.empty_gifts_button}
                    onClick={() => redirect("addGift")}
                  >
                    Add Gifts
                  </button>
                </p>
              </div>
            </h4>
          ) : (
            groupData.gifts.map(function (item, index) {
              if (
                // displayedCountRef.current <= maxGifts &&
                displayCount < maxGifts &&
                item.requester_id !== curr_user_id &&
                item.gift_id &&
                item.taken === claimed &&
                (onlyMe || item.giver_id === curr_user_id) &&
                (searchVal == "" || searchVal == item.requester) &&
                (costMin == null || costMin <= item.cost || +costMin == 0) &&
                (costMax == null ||
                  // || +costMax === 0
                  costMax >= item.cost)
              ) {
                item.color = getRandomColor(item.gift_id);
                // displayedCountRef.current ++
                displayCount++;
                return (
                  <div
                    className={styles.gift_box}
                    id={`gift-${item.unique_id}`}
                    ref={giftRef}
                    key={item.unique_id}
                    onClick={() => giftClick(item.gift_id)}
                    style={{ backgroundColor: item.color + ".25)" }}
                  >
                    <div className={styles.gift_box_content}>
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
                  </div>
                );
              } else {
                // ////console.log(maxGifts)

                // ////console.log(displayedCountRef.current)
                return;
              }
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
        <div
          className={styles.single_gift_page_container}
          // style={{ top: window.pageYOffset }}
          onClick={exitGiftClick}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              exitGiftClick();
            }
          }}
        >
          <div
            className={styles.single_gift_container}
            onClick={doNothing}
            style={{ border: "10px solid " + singleGiftObject.color + ".5)" }}
          >
            {/* <img src="/IMGassets/bow.png" className={styles.image} /> */}

            <div className={styles.single_gift_header}>
              <p>For: {singleGiftObject.requester}</p>
              {singleGiftObject.url != "" ? (
                <p>
                  <a href={singleGiftObject.url} target="_blank">
                    <button className={styles.product_button}>
                      Link to product {"=>"}
                    </button>
                  </a>
                </p>
              ) : (
                <p>No Link {":("}</p>
              )}
              <div
                className={styles.change_data_button}
                onClick={exitGiftClick}
              >
                <img
                  className={styles.change_data_button_image}
                  src="/IMGassets/exit.png"
                />
              </div>
            </div>
            <br></br>
            <div className={styles.single_gift_details}>
              <h1>{singleGiftObject.gift_name}</h1>
            </div>
            <div className={styles.single_gift_details}>
              <p>
                {singleGiftObject.details == ""
                  ? "No details provided :("
                  : `"` + singleGiftObject.details + `"`}
              </p>
            </div>
            <div className={styles.single_gift_details}>
              <p>
                {singleGiftObject.cost == null
                  ? "No price provided :("
                  : `$${singleGiftObject.cost}`}
              </p>
            </div>
            {/* {claimed ? (
              <div className={styles.single_gift_details}>
                <p>
                  Claimed by:{" "}
                  {singleGiftObject.giver == null
                    ? "No name provided :("
                    : singleGiftObject.giver}
                </p>
              </div>
            ) : (
              <div></div>
            )} */}
            <Spacer height={"7vw"} />
            {/* <div className={styles.claim_button} onClick={claimGiftCheck}>Claim this gift!</div> */}
            {isClaiming ? (
              singleGiftObject.taken === false ? (
                <p className={styles.claim_button_after}>
                  Claiming this gift will prevent others from giving it. You can
                  always un-claim a gift. Do you want to proceed?
                  <br></br> <br></br>
                  <div className={styles.single_gift_header}>
                    <div />
                    <div />

                    <button
                      className={styles.product_button2}
                      onClick={() => claimYes(true)}
                    >
                      <p>Yes</p>
                    </button>

                    <button
                      className={styles.product_button2}
                      onClick={claimNo}
                    >
                      <p>No</p>
                    </button>
                    <div />
                    <div />
                  </div>
                </p>
              ) : (
                <p className={styles.claim_button_after}>
                  Un-claiming this gift will release it back to the pool for
                  others. Do you want to proceed?
                  <br></br> <br></br>
                  <div className={styles.single_gift_header}>
                    <div />
                    <div />
                    <p>
                      <button
                        className={styles.product_button2}
                        onClick={() => claimYes(false)}
                      >
                        Yes
                      </button>
                    </p>
                    <p>
                      <button
                        className={styles.product_button2}
                        onClick={claimNo}
                      >
                        No
                      </button>
                    </p>
                    <div />
                    <div />
                  </div>
                </p>
              )
            ) : singleGiftObject.taken === true ? (
              singleGiftObject.giver_id === curr_user_id ? (
                <p className={styles.claim_button} onClick={claimGiftCheck}>
                  Unclaim gift?
                </p>
              ) : (
                <p className={styles.no_claim_button}>
                  Looks like you didn't gift this one...
                </p>
              )
            ) : (
              <p className={styles.claim_button} onClick={claimGiftCheck}>
                Claim this gift!
              </p>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {groupData &&
        groupData.gifts.filter(
          (gift) => gift.requester_id !== +curr_user_id && gift.gift_id
        ).length > 1 && (
          <>
            <br></br>
            <button
              onClick={increaseGiftLimit}
              style={{
                backgroundColor: oneOpen && "rgba(0, 0, 0	 , 0.2)",
                background: oneOpen && "rgba(0, 0, 0	 , 0.2)",
                color: oneOpen && "rgba(0, 0, 0, 1)",
              }}
            >
              {loadMorePrompt}
            </button>
            <Spacer height={"3vw"} />
          </>
        )}
    </div>
  );
}
