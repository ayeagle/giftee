import "@styles/globals.css";
import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Auth0Provider } from "@auth0/auth0-react";
import AppRedirectWrapper from "@components/xmas/AppRedirectWrapper";
import ErrorPrompt from "@components/xmas/ErrorPrompt";
import MetaHead from "@components/xmas/MetaHead";

const onRedirectCallback = (appState) => {
  const history = createBrowserHistory();
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};
const auth0Config = {
  domain: process.env.AUTH0_ISSUER_BASE_RAW,
  clientId: process.env.AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE,
};

const providerConfig = {
  domain: process.env.AUTH0_ISSUER_BASE_URL,
  clientId: process.env.AUTH0_CLIENT_ID,
  onRedirectCallback,
  cacheLocation: "localstorage",
  authorizationParams: {
    redirect_uri: process.env.AUTH0_BASE_URL,
    ...(auth0Config.audience ? { audience: process.env.AUTH0_AUDIENCE } : null),
  },
};

function Application({ Component, pageProps }) {
  const [errorHappening, setErrorHappening] = useState(false);

  return (
    <>
      <Auth0Provider {...providerConfig}>
        <AppRedirectWrapper>
          <ErrorPrompt
            throwError={errorHappening}
            setThrowError={setErrorHappening}
          />
          <MetaHead>
            <Component
              {...pageProps}
              errorHappening={errorHappening}
              setErrorHappening={setErrorHappening}
            />
          </MetaHead>
        </AppRedirectWrapper>
      </Auth0Provider>
    </>
  );
}

export default Application;
