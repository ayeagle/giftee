import "./FixedButtons.module.css";

export default function FixedButtons({ oneOpen }) {
  return (
    <>
      <button
        style={{
          position: "fixed",
          left: "2.5%",
          top: "20%",
          padding: "1vh",
          paddingBottom: ".8vh",

          borderRadius: "100px",
          backgroundColor: oneOpen && "rgba(0,0,0,.1)",
          zIndex: 100000000,
        }}
        onClick={() => (window.location.href = "/addGift")}
      >
        <span title="Add gift">
          <img
            src="IMGassets/plus.png"
            style={{ width: "2vh", display: "flex" }}
          />
        </span>
      </button>
      <button
        style={{
          position: "fixed",
          left: "2.5%",
          top: "26%",
          padding: "1vh",
        //   paddingTop: ".8vh",
          paddingBottom: ".8vh",

          borderRadius: "100px",
          backgroundColor: oneOpen && "rgba(0,0,0,.1)",
          zIndex: 100000000,
        }}
        onClick={() => (window.location.href = "/groups")}
      >
        <span title="Change group">
          <img
            src="IMGassets/switch2.png"
            style={{ width: "2vh", display: "flex" }}
          />
        </span>
      </button>
    </>
  );
}
