const getRole = (role) => {
  if (role == 1) {
    return "Sinh viên";
  } else if (role == 2) {
    return "Giáo viên";
  } else if (role == 3) {
    return "Admin";
  }
};
export { getRole };
