const getColorStatusBill = (status) => {
  if (status === "done") {
    return "green";
  } else if (status === "wait") {
    return "purple";
  } else if (status === "return") {
    return "pink";
  } else if (status === "approved") {
    return "blue";
  } else if (status === "refuse") {
    return "red";
  } else if (status === "user_cancle") {
    return "yellow";
  } else if (status === "draft") {
    return "lime";
  }
};
export { getColorStatusBill };
