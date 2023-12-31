import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <div>
      <Header />
      <h1>This is Home Screen</h1>
    </div>
  );
};

export default HomeScreen;
