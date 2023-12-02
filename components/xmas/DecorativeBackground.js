import { useEffect, useState } from "react";
import * as styles from "./DecorativeBackground.module.css";

export default function DecorativeBackground() {
  const [height, setHeight] = useState();

  useEffect(() => {
    handleSize()
    window.addEventListener("scroll", handleSize);
    window.addEventListener("resize", handleSize);
  }, []);

  const handleSize = () => {
    const max = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    setHeight(max);
    // ////console.log("this the max height");
    // ////console.log(max);
  };

  return (
    <>
      {/* <div className={styles.first} style={{ height: `${height - 5}px` }}></div>
      <div className={styles.black_box}></div> */}
    </>
  );
}
