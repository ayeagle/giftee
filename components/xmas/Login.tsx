import React, { Component, useState, useEffect } from "react";
import styles from "@components/xmas/Login.module.css";
import { useAuth0 } from "@auth0/auth0-react";


export default function Login() {
  const { loginWithRedirect } = useAuth0();
  const [fadeStyle, setFadeStyle] = useState<string>(styles.start_button_before)
  const [fadeStyle1, setFadeStyle1] = useState<string>(styles.login_container_before)

  useEffect(() => {
    setTimeout(() => {
      setFadeStyle(styles.start_button)
      setFadeStyle1(styles.login_container)
    },3000)
  },[])


  return (
    <>
      <div className={fadeStyle1}>
        <h1 onClick={() => loginWithRedirect()} className={fadeStyle}>
            Get started
        </h1> 
      </div>
    </>
  );
}
