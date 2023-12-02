import React from "react";
import { useState, useEffect } from "react";
import styles from './Typing.module.css'

export default function Typing({ content, size, applyGradient }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [spacer, setSpacer] = useState(`|`);
  const [indexPauser, setIndexPauser] = useState(0);

  // const extra = `&nbsp;`;

  useEffect(() => {
    if (indexPauser < 2 || index == content.length) {
      const interval = setInterval(() => {
        if (spacer == ` `) setSpacer(`\u00A0|`);
        else setSpacer(` `);

        setIndexPauser(indexPauser + 1);
        if (indexPauser == 2) {
          clearInterval(interval);
          setSpacer(`\u00A0|`);
          // setIndex(0)
        }
      }, 550);
      return () => clearInterval(interval);
    } else if (index <= content.length) {
      const interval = setInterval(() => {
        if (content[index] == "<") {
          setDisplayText(displayText);
          setIndex(index + 5);
        } else {
          setDisplayText(displayText + content[index]);
          setIndex(index + 1);
        }
        if (index == content.length) {
          clearInterval(interval);
          // setIndex(0)
        }
      }, 28);
      return () => clearInterval(interval);
    }
  }, [index, indexPauser]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {/* <div   dangerouslySetInnerHTML={{ __html: displayText + extra}}><span style={{position: "absolute"}}>{spacer}</span> */}
      <div
      className={styles.typing_animate}
        style={{
          fontSize: size,
        }}
      >
        {displayText}
        <span className={styles.typing_animate} style={{ position: "absolute" }}>{spacer}</span>
      </div>
    </div>
  );
}
