import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";

import logo from "./logo.svg";
import "./App.css";
import HomeContainer from "./containers/Home/HomeContainer";
import LoginContainer from "./containers/Login/LoginContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProfileContainer from "./containers/Profile/ProfileContainer";
import EventsPanelContainer from "./containers/AdminPanel/EventsPanel/EventsPanelContainer";
import ReservationsPanelContainer from "./containers/AdminPanel/ReservationsPanel/ReservationsPanelContainer";
import CheckoutContainer from "./containers/Checkout/CheckoutContainer";
import MobileNavigation from "./components/Header/MobileNavigation/MobileNavigation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true" ? true : false
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const openMobileMenuHandler = () => {
    setShowMobileMenu(true);
  };

  const closeMobileMenuHandler = () => {
    setShowMobileMenu(false);
  };

  const setLoggedIn = (loginBool) => {
    setIsLoggedIn(loginBool);
  };
  let routes = [
    { path: "/", exact: true, render: () => <HomeContainer /> },
    {
      path: "/events-panel",
      exact: true,
      render: () => <EventsPanelContainer />,
    },
    {
      path: "/reservations-panel",
      exact: true,
      render: () => <ReservationsPanelContainer />,
    },
    {
      path: "/profile",
      exact: true,
      render: () => <ProfileContainer setLoggedIn={setLoggedIn} />,
    },
    {
      path: "/login",
      exact: true,
      render: () => <LoginContainer loggedIn={setLoggedIn} />,
    },
    {
      path: "/checkout",
      exact: true,
      render: () => <CheckoutContainer loggedIn={setLoggedIn} />,
    },
  ];

  // routes defined here again in order to rerender navigation items
  useEffect(() => {
    routes = [
      { path: "/", exact: true, render: () => <HomeContainer /> },
      {
        path: "/events-panel",
        exact: true,
        render: () => <EventsPanelContainer />,
      },
      {
        path: "/reservations-panel",
        exact: true,
        render: () => <HomeContainer />,
      },
      {
        path: "/profile",
        exact: true,
        render: () => <ProfileContainer setLoggedIn={setLoggedIn} />,
      },
      {
        path: "/login",
        exact: true,
        render: () => <LoginContainer loggedIn={setLoggedIn} />,
      },
      {
        path: "/checkout",
        exact: true,
        render: () => <CheckoutContainer loggedIn={setLoggedIn} />,
      },
    ];
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <MobileNavigation
          closeMenu={closeMobileMenuHandler}
          show={showMobileMenu}
        />
        <Header loggedIn={isLoggedIn} openMenu={openMobileMenuHandler} />
        <div style={{ height: "80px" }} />
        <Switch>
          {routes.map((route) => (
            <Route
              path={route.path}
              exact={route.exact}
              //component={route.component}
              render={route.render}
            />
          ))}
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
