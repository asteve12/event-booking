const setLoggedIn = (username, email, role = "user") => {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("userRole", role);
};

export default setLoggedIn;
