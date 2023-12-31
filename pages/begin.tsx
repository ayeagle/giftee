import { useEffect, useState } from "react";
import styles from "./xmas.module.css";
import Typing from "@components/Typing";
import Login from "@components/xmas/Login";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoadDataInit from "@components/data_management/PageLoadDataInit";

let style1: string = styles.left_element_wrapper;
let style2: string = styles.right_element_wrapper;

export default function Begin({ errorHappening, setErrorHappening }) {
  const [height, updateHeight] = useState<number>(0);
  const [width, updateWidth] = useState<number>(0);
  const [totalHeight, setTotalHeight] = useState<number>(0);
  const [moveToCreate, setMoveToCreate] = useState<boolean>(false);

  if (!moveToCreate) {
    style1 = styles.left_element_wrapper;
    style2 = styles.right_element_wrapper;
  } else {
    style1 = styles.left_element_wrapper2;
    style2 = styles.right_element_wrapper2;
  }

  useEffect(() => {
    updateHeight(window.innerHeight);
    updateWidth(window.innerWidth);
    setTotalHeight(window.outerHeight);

    function handleWindowResize() {
      updateHeight(window.innerHeight);
      updateWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);
  }, [height, moveToCreate]);

  const { user, error, isLoading, getAccessTokenSilently } = useAuth0();
  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  useEffect(() => {
    let promise = getAccessTokenSilently();
    promise.then((token) => {
      PageLoadDataInit({ user, token });
    });
  });

  if (!user) {
    return (
      <>
        <div className={styles.page_container} >
          <div className={style1}>
            <h1 className={styles.centering_unit}>
              <Typing
                size={"5.5vw"}
                content={"Gift exchanges with friends and family made easy :D"}
                applyGradient={true}
              />
            </h1>
          </div>
          <div className={style2}>
            <h1 className={styles.centering_unit}>
              <Login />
            </h1>
          </div>
        </div>
      </>
    );
  }
  if (user) {
    window.location.href = "/explore";
  }
}
