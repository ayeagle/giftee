import { useState, useEffect } from "react";
import { isReady } from "@components/data_management/CurrGroupData";
import styles from "@components/xmas/LoadingPage.module.css";
import Spacer from "@components/Spacer";

let loading_list = [
  "Cutting ribbons...",
  "Shopping...",
  "Other stuff",
  "Final stuff",
  "Gathering friends...",
];

export default function LoadingPage({ active, small }) {
  const [currQuote, setCurrQuote] = useState();
  const [containerStyle, setContainerStyle] = useState(styles.container_before);
  const [runOnce, setRunOnce] = useState(0);
  const [styleStage, setStyleStage] = useState("before");

  if (isReady && runOnce == 0) {
    //////console.log("isready  run");
    setRunOnce(1);

    setTimeout(() => {
      //////console.log("isready timeout run");
      setStyleStage("after");
      setTimeout(() => {
        //////console.log("isready inner timeout run");
        // setStyleStage('final')
      }, [2000]);
    }, [2000]);
  }

  const cycle = () => {
    //////console.log("cycle run");
    let count = 0;

    let img = document.getElementById("gif");
    let src = img.getAttribute("src");
    let gifCycler = setInterval(function () {
      //////console.log("cycle timeout run");

      count++;
      //////console.log(count);
      if (count >= 2) {
        // stop after 10 iterations
        clearInterval(gifCycler);
      }

      img.setAttribute("src", src);
      // determineQuote()
    }, 1300);
  };

  const determineQuote = () => {
    let length = loading_list.length;
    let position = Math.floor(Math.random() * length);
    //////console.log(position);
    setCurrQuote(loading_list[position]);
    // if (position%2 == 1) {
    //     setContainerStyle(styles.container_before)
    // } else {
    //     setContainerStyle(styles.container_after)

    // }
  };

  useEffect(() => {
    //////console.log("useeffect run");

    cycle();
  }, []);

  return (
    <>
      <div
        className={
          small
            ? styleStage == "before"
              ? styles.container_small_before
              : styleStage == "after"
              ? styles.container_small_after
              : styles.container_final
            : styleStage == "before"
            ? styles.container_before
            : styleStage == "after"
            ? styles.container_after
            : styles.container_final
        }
        style={{
          // width: small && "100%",
          background: small && "none"
      }}
      >
        <Spacer height="5vh" />
        <div
          className={styles.gif_wrapper}
        >
          <img
            className={styles.gif_positioning}
            style={{
              top: small ? "-5vh" : "50vh",
              left: small ? "0%" : "35%",
              width: small ? "50%" : "30%",
            }}
            id="gif"
            src="/IMGassets/loadingfast.gif"
          />
        </div>
        <h5>{currQuote}</h5>
      </div>
    </>
  );
}
