import React, { Component, useState, useEffect } from "react";
import HomeBottom from "@components/xmas/HomeBottom";
import HomeTop from "@components/xmas/HomeTop";
import AddGiftUnit from "@components/xmas/AddGiftUnit";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


export default function AddGift({errorHappening, setErrorHappening}) {
  return (
    <>
      <HomeTop errorHappening={errorHappening} setErrorHappening={setErrorHappening}/>
      <MasterBodyContainer>
        <AddGiftUnit prompt={"Add new gifts ideas below!"} edit={false} errorHappening={errorHappening} setErrorHappening={setErrorHappening}/>
      </MasterBodyContainer>
      <HomeBottom errorHappening={errorHappening} setErrorHappening={setErrorHappening}/>
    </>
  );
}


// export default withAuthenticationRequired(AddGift, {
//   onRedirecting: () => <LoadingPage />,
//   onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
  
// });
