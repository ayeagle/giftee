import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Begin from "./begin";
import Link from "next/link";
import auth0 from "@components/data_management/auth0";
import MasterBodyContainer from "@components/xmas/MasterBodyContainer";

export default function Home({errorHappening, setErrorHappening}) {
  return (
    <>
      <Begin />
    </>
  );
}
