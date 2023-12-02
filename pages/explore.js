import { useEffect, useState } from "react";
import styles from "pages/xmas.module.css";
import Spacer from "@components/Spacer";
import { getGroupObject } from "@components/data_management/CurrGroupData";
import Gifts from "@components/xmas/Gifts";
import HomeTop from "@components/xmas/HomeTop";
import HomeBottom from "@components/xmas/HomeBottom";
import { isReady } from "@components/data_management/CurrGroupData";
import ReferralLink from "@components/xmas/ReferralLink";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";
import FixedButtons from "@components/xmas/FixedButtons";


let curr_group;
export default function Explore() {
  const [groupData, setGroupData] = useState();
  const [groupName, setGroupName] = useState("");
  const [oneOpen, setOneOpen] = useState(false);
  const [currPageName, setCurrPageName] = useState("explore");
  const [runOnce, setRunOnce] = useState(0);
  const [dataChange, setDataChange] = useState(false);
  const [userName, setUserName] = useState("");
  const [ready, setReady] = useState(false);
  const [descr, setDescr] = useState("");
  const [link, setLink] = useState("Generating...");
  const [goScroll, setGoScroll] = useState(false);
  const [giftDate, setGiftDate] = useState('')

  const [totalH, setTotalH] = useState();

  useEffect(() => {
    window.addEventListener("resize", function () {
      setTotalH(window.scrollHeight);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getGroup();
    }, [1000]);
  }, [ready]);

  if (isReady() && runOnce % 10 == 1) {
    setReady(true);
    setRunOnce(runOnce + 1);
  }

  async function getGroup() {
    let curr_group = getGroupObject();
    curr_group.then((data) => {
      const curr_group = data;
      setGroupName(localStorage.getItem("group_name"));
      setGroupData(curr_group);
      setDescr(curr_group.description);
      ////console.log(curr_group);
      setLink(curr_group.invite_link);

      let temp_date = new Date(curr_group.gift_exchange_time*1000).toLocaleDateString("default")

      setGiftDate(temp_date)
    });
  }

  useEffect(() => {
    getGroup();
  }, [oneOpen, dataChange, groupData]);

  useEffect(() => {
    getGroup();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: oneOpen ? "rgba(0, 0, 0	 , 0.4)" : "rgba(0, 0, 0, 0)",
          zIndex: "-1",
          width: "100vw",
          height: `${totalH}px`,
        }}
      >
        <HomeTop />
        <div id="top" />
        <MasterBodyContainer>
          <FixedButtons oneOpen={oneOpen}/>
          <Spacer height={"220px"} />
          <h1 className={styles.descript_container}>{groupName}</h1>
          <h2 className={styles.descript_container}>"{descr}"</h2>
          <p className={styles.date_descript_container}>Gifting on: {giftDate}</p>
          <div className={styles.master_container}>
            <Gifts
              prompt={"Up for Grabs"}
              claimed={false}
              oneOpen={oneOpen}
              setOneOpen={setOneOpen}
              groupData={groupData}
              setGroupData={setGroupData}
              dataChange={dataChange}
              setDataChange={setDataChange}
              setCurrPageName={setCurrPageName}
              setGoScroll={setGoScroll}
            />
          </div>
          <Spacer height={"50px"} />

          <br></br>
          <div className={styles.master_container}>
            <Gifts
              prompt={"Already Claimed by You"}
              claimed={true}
              oneOpen={oneOpen}
              setOneOpen={setOneOpen}
              groupData={groupData}
              setGroupData={setGroupData}
              dataChange={dataChange}
              setDataChange={setDataChange}
              setCurrPageName={setCurrPageName}
              setGoScroll={setGoScroll}
            />
          </div>
          <Spacer height={"5vw"} />
          <div id="referral" />
          {link && <ReferralLink link={link} setLink={setLink} oneOpen={oneOpen}/>}
          <Spacer height={"5vw"} />
        </MasterBodyContainer>
        <Spacer height={"5vw"} />
        <Spacer height={"10vh"} />
        <HomeBottom />
      </div>
    </>
  );
}

// export default withAuthenticationRequired(Explore, {
//   // onRedirecting: () => <LoadingPage />,
//   // onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
// });
