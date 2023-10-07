const Logout = () => {
  // clear session
  sessionStorage.removeItem('merchantEmail');
};

export { Logout };
