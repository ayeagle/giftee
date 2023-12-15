import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
// import Begin from '@pages/begin'
import Link from "next/link";
import auth0 from "@components/data_management/auth0";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";
import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "./LoadingPage";
import Begin from "pages/begin";
import * as local from "@components/data_management/CurrGroupData";
import { useFetcher } from "node_modules/react-router-dom/dist/index";

let slug;
let userObject;

export default function AppRedirectWrapper(props) {
  const [groupData, setGroupData] = useState("");
  const [groupName, setGroupName] = useState("");
  const [oneOpen, setOneOpen] = useState(false);
  const [currPageName, setCurrPageName] = useState("");
  const [runOnce, setRunOnce] = useState(0);
  const [dataChange, setDataChange] = useState(false);
  const [userName, setUserName] = useState("");
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    error,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const countRef = useRef(0);

  const [slugSet, setSlugSet] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  async function startUserWait() {
    const waitForUser = setInterval(() => {
      if (local.isUserReady() || countRef.current > 30) {
        getUser();
        clearInterval(waitForUser);
      }
      countRef.current++;
    }, 100);
  }

  //////console.log("user load state is ready");
  //////console.log(local.isUserReady());
  //comment or something

  async function getUser() {
    userObject = await local.getUserData();
    setUserLoaded(true);
  }

  useEffect(() => {
    slug = window.location.href.split("/").pop().toLowerCase();
    setSlugSet(true);
    startUserWait();
  }, []);

  if (isLoading) {
    // console.warn(isLoading);
    //////console.log("actively in the isLoading phase");
    return <LoadingPage />;
  }

  if (error) {
    console.warn(error);
    console.error(error);
    //////console.log(error.message);
    return (
      <div>
        THIS IS AN ERROR SCREEN
        {error.message}
      </div>
    );
  }

  async function evalOnboarded() {
    await userObject;

    if (
      (userObject &&
        localStorage.getItem("group_id") == -1 &&
        slug != "getstarted" &&
        slug != "begin" &&
        slug != "groups") ||
      (!userObject?.onboarded &&
        slug != "getstarted" &&
        slug != "begin" &&
        slug != "groups")
    ) {
      window.location.href = "/getStarted";
    }
  }

  //////console.log(userObject);
  //////console.log("sdjlahasjdhjkashkjdhjhsdkjhaskhjdhdshaashadhkjashkjdhjasdhjdas");

  if (user) {
    if (slugSet) {
      if (userLoaded) {
        ////console.log(slug);
        ////console.log(localStorage);
        ////console.log(user);
        ////console.log(slugSet);
        ////console.log(userLoaded);
        ////console.log(userObject);

        evalOnboarded();
      }
    }
  } else {
    return <>{props.children}</>;
  }

  if (!user) {
    if (slugSet) {
      let refid_array = window.location.href.split("?");
      let refid = refid_array.pop();
      // slug = window.location.href.split("/").pop();
      localStorage.setItem("refid", refid);
      if (slug.indexOf("invite") != -1 && refid_array.length > 0) {
        window.location.href = `/tempinvite?${refid}`;
      }
    } else {
      window.location.href = "/begin";
    }
  }

  // if (userLoaded) {
  //   //////console.log("APPARENTLY THE USER WAS LOADED");
  //   //////console.log("SLUG");
  //   //////console.log(slug);

  //   if (!user && slugSet && slug != "begin") {
  //     //need to add some logic that will retain the redirection data if invited or otherwise but not logged in
  //     //////console.log("this the href bruu");

  //     let refid_array = window.location.href.split("?");
  //     let refid = refid_array.pop();
  //     slug = window.location.href.split("/").pop();

  //     if (slug.indexOf("invite") != -1 && refid_array.length > 0) {
  //       window.location.href = `/tempInvite?${refid}`;
  //     }
  //   } else if (slugSet) {
  //     if (
  //       (user &&
  //         userObject &&
  //         localStorage.getItem("group_id") == -1 &&
  //         slug != "getstarted" &&
  //         slug != "groups") ||
  //       (userObject.onboarded == false &&
  //         slug != "getstarted" &&
  //         slug != "groups")
  //     ) {
  //       window.location.href = "/getStarted";
  //     }
  //   } else if (slug != "begin") {
  //     window.location.href = "/begin";
  //   }
  // }

  // if (user) {
  //   console.warn(user);
  //   //////console.log("actively in the user return phase");
  //   return <>{props.children}</>;
  // }

  // if (slugSet && slug != "begin" && userLoaded) {
  //   //////console.log(slug);
  //   //////console.log("slug");
  //   window.location.href = "/begin";
  // }

  //IS THIS REALLY THE CORRECT SOLUTION HERE?

  return <>{props.children}</>;
}
