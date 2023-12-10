import * as icons from "react-icons/fa";
import { useState, useEffect } from "react";
import styles from "./ReferralLink.module.css";

export default function ReferralLink({ link, setLink, oneOpen }) {
  ////console.log("this is the data passed throught to the referral link func")
  ////console.log(link)

  const [internText, setInternText] = useState(link);
  const [changeAllowed, setChangeAllowed] = useState(true);
  const [boxStyle, setBoxStyle] = useState(styles.invite_box);

  useEffect(() => {
    setInternText(link);
  }, [link, setLink]);

  const hov = () => {
    if (changeAllowed) setInternText("Copy to clipboard");
  };

  const noHov = () => {
    if (changeAllowed) setInternText(link);
  };

  useEffect(() => {
    setTimeout(() => {
      setBoxStyle(styles.invite_box);
    }, [1000]);
  }, [boxStyle]);

  const copy = () => {
    ////console.log("we got clicked")
    navigator.clipboard.writeText(link);
    setChangeAllowed(false);
    setInternText("Copied to clipboard! Share away :)");
    setBoxStyle(styles.copied_box);
    setTimeout(() => {
      setChangeAllowed(true);
      setInternText(link);
    }, [2000]);
  };

  // fuck this needs to work
  return (
    <div>
      <div>
        <h2>Invite others</h2>
      </div>
      <button
        className={boxStyle}
        style={{ backgroundColor: oneOpen ? "rgba(0,0,0,0)" : "" }}
        onClick={() => copy()}
      >
        {link && (
          <p>
            {internText}
            <icons.FaCopy
              style={{
                position: "relative",
                left: "10px",
                fontSize: "17px",
                top: "5px",
              }}
            />
          </p>
        )}
      </button>
    </div>
  );
}
