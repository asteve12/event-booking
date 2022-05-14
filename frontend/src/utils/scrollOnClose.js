const scrollOnClose = (posY) => {
  setTimeout(() => {
    window.scrollTo(0, posY);
  }, 500);
};

export default scrollOnClose;