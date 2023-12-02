import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Spacer from "@components/Spacer";
import {
  getGroupObject,
  updateGroupObject,
} from "@components/data_management/curr_group_data";
import XMAS_GetGroupObject from "@components/mutation_apis/XMAS_GetGroupObject";
import NavBar from "@components/xmas/NavBar";
// import Explore from "@components/xmas/Explore";
import AddGift from "@components/xmas/AddGiftUnit";
import Profile from "@components/xmas/Profile";
// import Begin from "./begin";
import Groups from "pages/groups";
import { useAuth0 } from "@auth0/auth0-react";

let curr_group;

export default function HomeBottom({ oneOpen }) {
  // const [oneOpen, setOneOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  const [scroll, setScroll] = useState(0);
  const [fixedBottom, setFixedBottom] = useState(false);

  // const [currPageCode, setCurrPageCode] = useState(<Explore oneOpen={oneOpen} setOneOpen={setOneOpen} groupData={groupData} setGroupData={setGroupData} dataChange={dataChange} setDataChange={setDataChange} />)
  const { user, getAccessTokenSilently } = useAuth0();

  ////console.log(curr_group);

  useEffect(() => {
    window.addEventListener("resize", handleScroll);
    // window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("resize", handleScroll);
  }, [oneOpen]);

  const handleScroll = () => {
    const viewportHeight = window.scollheight;

    const myElement = document.getElementById("page-bottom");

    const elementRect = myElement.getBoundingClientRect();
    ////console.log("element rect RECT RECT");
    ////console.log(elementRect);
    ////console.log(elementRect);

    const elementBottom = elementRect.top + elementRect.height;

    // ////console.log(window.location.href)
    // ////console.log(window.location.href)
    // ////console.log(window.location.href)
    // ////console.log(window.location.href)
    // ////console.log(window.location.href)
    // && window.location.href.split("/").pop() != 'myGifts'
    if (elementBottom >= viewportHeight) {
      setFixedBottom(false);
      ////console.log("The webpage is longer than the viewport.");
    } else {
      setFixedBottom(true);
      ////console.log("The webpage fits within the viewport.");
    }
  };

  // // Select the element whose height changes affect the total height of the webpage
  // const targetNode = document.body;

  // // Create a new instance of the MutationObserver with a callback function
  // const observer = new MutationObserver((mutations) => {
  //   // Loop through each mutation that was observed
  //   mutations.forEach((mutation) => {
  //     // Check if the mutation was a change in the style or attributes of the targetNode
  //     if (
  //       mutation.type === "attributes"
  //       // &&
  //       // (mutation.attributeName === "style" || mutation.attributeName === "class")
  //     ) {
  //       // Do something when the height of the targetNode changes
  //       handleScroll()
  //       ////console.log("Height of targetNode has changed!");
  //     }
  //   });
  // });

  // // Configure the observer to watch for changes in the attributes and child nodes of the targetNode
  // const config = { attributes: true, childList: true, subtree: true };

  // // Start observing the targetNode for changes
  // observer.observe(targetNode, config);

  return (
    <>
      {/* <div id="page-bottom" style={{ position: "relative", height: "10vh", backgroundColor: "blue", top: "0px", zIndex: "1000000000"}}   ></div> */}
      <div
        id="page-bottom"
        style={{
          backgroundColor: oneOpen ? "rgba(0, 0, 0, 0.657)" : "rgba(0,0,0,0)",
          bottom: "0px",
          position: fixedBottom ? "fixed" : "relative",
          width: "100%",
          zIndex: "100000",
          maxHeight: "10vh",
        }}
      >
        <div className={styles.bottom_gift_header_container}>
          <div className={styles.bottom_gift_header}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <button className={styles.name_option}>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href="https://patreon.com/YeagleBuilds"
                  target={"_blank"}
                >
                  <p>
                    Support the <br /> creator!
                  </p>
                </a>
              </button>
            </div>
            <div
              className={styles.giftly_style}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3>Designed and built by Alex Yeagle</h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <button className={styles.name_option}>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  href="https://yeagle.io"
                  target={"_blank"}
                >
                  <p>About me</p>
                </a>
              </button>
            </div>
          </div>
        </div>
        {/* <div
          style={{
            backgroundColor: "black",
            position: "relative",
            height: "10vh",
            overflow: "hidden",
            scrollBehavior: "none",
            overflowY: "hidden",
                        // top: "0px",
            // left: "0px",
            // right: "0px",
            zIndex: "100000",
          }}
        ></div> */}
      </div>
    </>
  );
}
