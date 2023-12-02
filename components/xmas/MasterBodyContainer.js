import Spacer from "@components/Spacer";
import DecorativeBackground from "./DecorativeBackground";

let overH;

export default function MasterBodyContainer(props, oh) {
  if (oh) {
    overH = oh;
  } else {
    overH = "100vh";
  }
  return (
    <>
      <DecorativeBackground />

      <div
        style={{
          position: "relative",
          width: "100%",
          // maxWidth: "1200px",
          minHeight: "100vh",
          // backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          justifyContent: "center",
          zIndex: 1001,
        }}
      >
        {/* <Spacer height="10vh"/> */}

        {props.children}

        {/* <Spacer height="10vh" /> */}
      </div>
    </>
  );
}
