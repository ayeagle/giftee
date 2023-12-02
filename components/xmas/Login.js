import React, { Component, useState, useEffect } from "react";
import styles from "@components/xmas/Login.module.css";
import SubmissionCode from "./SubmissionCode";
import XMAS_GetAllGroupsData from "@components/mutation_apis/XMAS_GetAllGroupsData";
import { useAuth0 } from "@auth0/auth0-react";


// let curr_group = getGroupObject()

export default function Login({ setLoginOrSignUp, move }) {
  // const [userCheckVal, setUserCheckVal] = useState('')
  // const [userPasswordCheckVal, setUserPasswordCheckVal] = useState('')
  // const [validName, setValidName] = useState('')
  // const [addPrompt, setAddPrompt] = useState('')
  // const [addSecPrompt, setAddSecPrompt] = useState('')
  // const [greenSwitch, setGreenSwitch] = useState(false)
  // const [greenSecSwitch, setSecGreenSwitch] = useState(false)
  // const [viewPassword, setViewPassword] = useState('password')
  // const [createNew, setCreateNew] = useState(false)
  const [focus, setFocus] = useState("login");
  const [submitCode, setSubmitCode] = useState();
  const { user, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [fadeStyle, setFadeStyle] = useState(styles.start_button_before)
  const [fadeStyle1, setFadeStyle1] = useState(styles.login_container_before)

  // const [userGenResult, setUserGenResult] = useState('')
  useEffect(() => {
    setTimeout(() => {
      setFadeStyle(styles.start_button)
      setFadeStyle1(styles.login_container)
    },[3000])
  },[])

  // let updater = 0
  // let newVal = 0;

  useEffect(() => {
    setSubmitCode(
      <SubmissionCode
        prompt={"Enter your group's name"}
        isNew={false}
        setCode={setSubmitCode}
        move={move}
        focus={"login"}
      />
    );
  }, []);

  const changeFocus = (current) => {
    if (focus === "login" && current !== "login") {
      setFocus("signup");
      setSubmitCode(
        <SubmissionCode
          prompt={"Let's create a group!"}
          isNew={true}
          setCode={setSubmitCode}
          move={move}
          focus={"signup"}
        />
      );
      move(false);
    } else if (focus === "signup" && current !== "signup") {
      setFocus("login");
      setSubmitCode(
        <SubmissionCode
          prompt={"Enter your group's name"}
          isNew={false}
          setCode={setSubmitCode}
          move={move}
          focus={"login"}
        />
      );
      move(false);
    }
  };

  return (
    <>
      <div className={fadeStyle1}>
        <h1  href="javascript:void(0)" onClick={() => loginWithRedirect()}>
          <a className={fadeStyle}>
            Get started
          </a>
        </h1> 
      </div>
    </>
  );
}
