const setLoggedOut = () => {
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("username", "");
  localStorage.setItem("email", "");
  localStorage.setItem("userRole", "user");
};

export default setLoggedOut;
