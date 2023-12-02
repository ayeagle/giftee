import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";

let curr_group;

export default function HomeBottom({ oneOpen }) {
  const [fixedBottom, setFixedBottom] = useState(false);



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
    const elementBottom = elementRect.top + elementRect.height;

    // && window.location.href.split("/").pop() != 'myGifts'
    if (elementBottom >= viewportHeight) {
      setFixedBottom(false);
      ////console.log("The webpage is longer than the viewport.");
    } else {
      setFixedBottom(true);
      ////console.log("The webpage fits within the viewport.");
    }
  };


  return (
    <>
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
      </div>
    </>
  );
}
