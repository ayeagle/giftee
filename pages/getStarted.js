import { useEffect, useState } from "react";
import styles from "pages/getStarted.module.css";
import Spacer from "@components/Spacer";
import { getGroupObject } from "@components/data_management/curr_group_data";
import HomeBottom from "@components/xmas/HomeBottom";
import { isReady } from "@components/data_management/curr_group_data";
import LoadingPage from "@components/xmas/LoadingPage";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";
import NavBar from "@components/xmas/NavBar";
import PageLoadDataInit from "@components/data_management/PageLoadDataInit";
import { useAuth0 } from "@auth0/auth0-react";
import XMAS_ChangeUserName from "@components/mutation_apis/XMAS_ChangeUserName";
import { getUserData, updateUserData } from "@components/data_management/curr_group_data";
import XMAS_ChangeOnboarded from "@components/mutation_apis/XMAS_ChangeOnboarded";

const slides = [
  {
    id: 0,
    title: "Welcome to Giftee!",
    descr: "The easy way to organize gift exchanges with friends and family",
    image: "/Undraw/gifts.png",
    cust_img_width: "",
    img_align: "right",
  },
  {
    id: 1,
    title: "Let's get started",
    descr: "Set the name you want to appear on your profile.",
    image: "/Undraw/celebrate.png",
    cust_img_width: "40%",
    img_align: "left",
  },
  {
    id: 2,
    title: "Explore",
    descr: `Look for gifts that members have added. Sort by name, price, and more to find the <b>perfect</b> gift to give.`,
    image: "/Undraw/itemsgrid.png",
    cust_img_width: "80%",
    img_align: "right",
  },
  {
    id: 3,
    title: "Add",
    descr:
      "Add new gift ideas that can be shared with individuals, groups, or publicly.",
    image: "/Undraw/newstuff.png",
    cust_img_width: "70%",
    img_align: "left",
  },
  {
    id: 4,
    title: "My Gifts",
    descr: "Manage, update, add or remove gifts from different wishlists.",
    image: "/Undraw/lookingatstuff.png",
    cust_img_width: "80%",
    img_align: "right",
  },
  {
    id: 5,
    title: "Groups",
    descr:
      "View your active groups and easily switch between who you're shopping for.",
    image: "/Undraw/group.png",
    cust_img_width: "80%",
    img_align: "left",
  },
  {
    id: 6,
    title: "Settings",
    descr: `Probably obvious... but you can edit your settings here :)`,
    image: "/Undraw/interface.png",
    cust_img_width: "60%",
    img_align: "right",
  },
  {
    id: 7,
    title: "That's all!",
    descr:
      "If you were invited to a group, you can use the referral link to join. <br/><br/>Otherwise, click <b>Next</b> to create your first group!",
    image: "/Undraw/sharelove.png",
    cust_img_width: "60%",
    img_align: "left",
  },
];

let curr_group;
export default function getStarted({errorHappening, setErrorHappening}) {
  const [groupData, setGroupData] = useState();
  const [groupName, setGroupName] = useState("");
  const [oneOpen, setOneOpen] = useState(false);
  const [currPageName, setCurrPageName] = useState("explore");
  const [runOnce, setRunOnce] = useState(0);
  const [dataChange, setDataChange] = useState(false);
  const [userName, setUserName] = useState("");
  const [ready, setReady] = useState(false);
  const [descr, setDescr] = useState("");
  const [link, setLink] = useState("Generating...");
  const [ultra, setUltra] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const [placeholderName, setPlaceholderName] = useState("");
  const [userData, setUserData] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      getGroup();
    }, [1000]);
  }, [ready]);

  if (isReady() && runOnce % 10 == 1) {
    setReady(true);
    setRunOnce(runOnce + 1);

  }

  async function advance(bool, num) {
    let tempStage = stage;
    let temp = 0;

    evalLocations();

    if (num) {
      setStage(num);
    } else if (tempStage <= 6) {
      if (bool) {
        setStage(stage + 1);
        temp = 1;
      } else {
        setStage(stage - 1);
        temp = -1;
      }
    } else if (!bool && tempStage == 7) {
      setStage(stage - 1);
      temp = -1;
    } else if (bool) {
      if (placeholderName != userName && userName != "") {
        await handleNameChange();
      }
      let temp = userData;
      temp.onboarded = true;

      let temp2 = handleOnboardedChange();

      temp2.then((data) => {
        updateUserData(temp);

        setUserData(temp);

      })
      window.location.href = "/groups";

      
    }

    if (num) tempStage = 7;

    switch (tempStage + temp) {
      case 2:
        setUltra("/explore");
        return;
      case 3:
        setUltra("/addGifts");
        return;
      case 4:
        setUltra("/myGifts");
        return;
      case 5:
        setUltra("/groups");
        return;
      case 6:
        setUltra("/profile");
        return;
      default:
        setUltra("");
    }
  }

  async function getGroup() {
    let curr_group = getGroupObject();
    curr_group.then((data) => {
      const curr_group = data;
      setGroupName(localStorage.getItem("group_name"));
      setGroupData(curr_group);
      setDescr(curr_group.description);
      setLink(curr_group.invite_link);
    });
    let curr_user = getUserData();
    curr_user.then((data) => {
      const temp = data;
      setUserData(temp);
    });
  }

  const evalLocations = () => {};

  async function handleNameChange() {
    const token = await getAccessTokenSilently();
    localStorage.setItem("user_name", userName);

    let promise = await XMAS_ChangeUserName(
      localStorage.getItem("user_id"),
      userName,
      token
    );

  }

  async function handleOnboardedChange() {
    const token = await getAccessTokenSilently();

    let promise = await XMAS_ChangeOnboarded(
      localStorage.getItem("user_id"),
      true,
      token
    );
  }

  useEffect(() => {
    let tempLocal = localStorage.getItem("user_name");
    setUserName(tempLocal);

    if (localStorage.getItem("user_name")) {
      setPlaceholderName(tempLocal);
    } else {
      setPlaceholderName(user.name);
    }
  }, []);

  return (
    <>
      <LoadingPage />
      <PageLoadDataInit />
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
          </div>
          <NavBar ultra={ultra} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "2vw",
            }}
          ></div>

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

      <MasterBodyContainer>
        <div>
          <img
            src={"/IMGassets/exit.png"}
            className={styles.skip_forward_button}
            onClick={() => advance(false, 7)}
          />
        </div>
        <div style={{ position: "static" }}>
          <div className={styles.starter_slides_horiz_container}>
            {slides.map((slide, index) => {
              return (
                <div
                  key={slide.id}
                  className={styles.starter_slides_container}
                  style={{ left: `${100 * (slide.id - stage)}vw` }}
                >
                  <div style={{ position: "relative", top: "1px" }}>
                    <h1>{slide.title}</h1>
                    <br />
                    <div className={styles.outer_wrapper}>
                      {slide.img_align == "right" ? (
                        <>
                          <div className={styles.left_element_wrapper}>
                            <h3
                              dangerouslySetInnerHTML={{ __html: slide.descr }}
                            ></h3>
                          </div>
                          <div className={styles.right_element_wrapper}>
                            <img
                              className={styles.image_sizer}
                              src={slide.image}
                              style={{ width: slide.cust_img_width }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={styles.right_element_wrapper}>
                            <img
                              className={styles.image_sizer}
                              src={slide.image}
                              style={{ width: slide.cust_img_width }}
                            />
                          </div>
                          <div className={styles.left_element_wrapper}>
                            <h3
                              dangerouslySetInnerHTML={{ __html: slide.descr }}
                            ></h3>
                            <br />
                            <br />
                            {slide.id == 1 && (
                              <>
                                <h4>Your current profile name is</h4>

                                <input
                                  id="gift_url"
                                  className={styles.input}
                                  type="string"
                                  placeholder={placeholderName}
                                  onChange={(e) => {
                                    setUserName(e.target.value);
                                  }}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                      // validate()
                                    }
                                  }}
                                />
                                <br />
                                <br />

                                <h4>
                                  Edit it now if you'd prefer something
                                  different.
                                </h4>

                                <br />
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {slides.map((slide, index) => {
            return (
              <div
                key={slide.id}
                className={styles.progress_dot}
                style={{
                  backgroundColor: slide.id == stage && "rgb(108,99,255)",
                }}
              ></div>
            );
          })}
        </div>
        <br />
        <br />
        <div className={styles.bottom_button_wrapper}>
          {stage > 0 && (
            <button
              className={styles.advance_button}
              onClick={() => advance(false)}
            >
              Back
            </button>
          )}
          <button
            className={styles.advance_button}
            onClick={() => advance(true)}
          >
            Next
          </button>
        </div>
        <Spacer height={"10vw"} />
      </MasterBodyContainer>
      <HomeBottom />
    </>
  );
}