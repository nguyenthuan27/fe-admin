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

const controlType = {
  input: 0,
  inputNumber: 1,
  currency: 2,
  percent: 3,
  select: 4,
  checkbox: 5,
  datepicker: 6,
};
export { getColorStatusBill, controlType };
