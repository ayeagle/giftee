import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import Spacer from "@components/Spacer";

let grey = "rgba(220,220,220,1)";
// let ultra = '/explore'

export default function NavBar({
  currPageName,
  setCurrPageName,
  ultra,
  hideMenu,
  setHideMenu,
}) {
  const [activeHeader, setActiveHeader] = useState("");
  const [totalWidth, setTotalWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [up, setUp] = useState(false);

  const headerClick = (val) => {
    setActiveHeader(val);
    window.location.href = val;
  };

  useEffect(() => {
    setTotalWidth(window.innerWidth);
    window.addEventListener("resize", () => setTotalWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    setActiveHeader(window.location.pathname);
  }, [currPageName]);

  useEffect(() => {
    setTimeout(() => {
      if (hideMenu == true) {
        setHideMenu(false);
        setMenuOpen(false);
        setUp(false);
      }
    }, 1000);
  }, [hideMenu]);

  const handleMenuClick = () => {
    ////console.log("menuOpen");
    ////console.log(menuOpen);
    ////console.log("hideMenu");
    ////console.log(hideMenu);
    ////console.log("totalWidth");
    ////console.log(totalWidth);

    setUp(!up);
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {}, [ultra]);

  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundColor: totalWidth < 1000 ? "black" : "black",
          background: totalWidth < 1000 ? "black" : "black",
          flexDirection: totalWidth < 1000 && "column",
          transition: "top .5s ease-out",
          height: totalWidth < 1000 ? "30vh" : "",
          // width: totalWidth < 1000 ? `${totalWidth}px` : "",
          // maxWidth: totalWidth < 1000 ? "100vw" : "",
          // left: totalWidth < 1000 && "0",
          borderRadius: totalWidth < 1000 && menuOpen && !hideMenu  ? "0px 0px 20px 20px " : "0px",
          position: totalWidth < 1000 && "absolute",
          top: totalWidth < 1000 && menuOpen && !hideMenu ? "5vh" : "-23vh",
          // zIndex: 1,

        }}
      >
        <h3
          className={ultra == "/explore" ? styles.ultra : styles.nav_unit}
          onClick={() => headerClick("/explore")}
          style={{ color: activeHeader == "/explore" ? "white" : "" }}
        >
          Explore
        </h3>
        <h3
          // href = "/addGifts"
          className={ultra == "/addGifts" ? styles.ultra : styles.nav_unit}
          onClick={() => headerClick("/addGift")}
          style={{ color: activeHeader == "/addGift" ? "white" : "" }}
        >
          Add
        </h3>
        <h3
          // href = "/myGifts"
          className={ultra == "/myGifts" ? styles.ultra : styles.nav_unit}
          onClick={() => headerClick("/myGifts")}
          style={{ color: activeHeader == "/myGifts" ? "white" : "" }}
        >
          My Gifts
        </h3>
        <h3
          className={ultra == "/groups" ? styles.ultra : styles.nav_unit}
          onClick={() => headerClick("/groups")}
          style={{ color: activeHeader == "/groups" ? "white" : "" }}
        >
          Groups
        </h3>
        <h3
          className={ultra == "/profile" ? styles.ultra : styles.nav_unit}
          onClick={() => headerClick("/profile")}
          style={{
            color: activeHeader == "/profile" ? "white" : "",
            transition: "1s ease-out",
          }}
        >
          Settings
        </h3>
        <h3
          className={styles.nav_unit}
          onClick={handleMenuClick}
          style={{
            color: "rgb(137, 137, 137)",
            width: "100%",
            /* border: 3px solid white; */
            borderRadius: "0 0 10px 10px",
            /* padding: 1vw; */
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // margin: "0 auto",
            // position: "relative",
            // bottom: "0vw",
            zIndex: 100000000000,
            paddingTop: totalWidth > 1000 ? "" : "3vw",
            display: totalWidth > 1000 ? "none" : "",
          }}
        >
          <img
            src="IMGAssets/arrow2.png"
            className={styles.arrow2}
            style={{ transform: up ? "rotate(0deg)" : "rotate(180deg)",
            transition: ".3s  ease-out"
          }}
          />
        </h3>
      </div>
    </>
  );
}
