import styles from "./ErrorPrompt.module.css";
import { useState, useEffect } from "react";

export default function ErrorPrompt({ throwError, setThrowError }) {
  //   const [errorOpen, setErrorOpen] = useState(throwError);
  const [errorOverride, setErrorOverride] = useState(false);

  const exitGiftClick = () => {
    setThrowError(false);
    setErrorOverride(true);
  };

  const doNothing = (event) => {
    // event.stopPropagation();
  };

  return (
    <>
      {throwError && (
        <div className={styles.error_wrapper}>
          <div
            className={styles.error_prompt_container}
            onClick={exitGiftClick}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                exitGiftClick();
              }
            }}
          >
            <div className={styles.error_box} onClick={doNothing}>
              <div
                className={styles.change_data_button}
                onClick={exitGiftClick}
              >
                <img
                  className={styles.change_data_button_image}
                  src="/IMGassets/exit.png"
                />
              </div>
              Hmm there's an error... try again in a second!
            </div>
          </div>
        </div>
      )}
    </>
  );
}
