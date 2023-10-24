const validateEmail = (input) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(input);
};

const validatePassword = (input) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return passwordRegex.test(input);
};

const validatePhone = (input) => {
  // input = 0961447969
  const phoneRegex =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return phoneRegex.test(input);
};

const ChangeGenderToNumber = (input) => {
  const result = input === "Other" ? 0 : input === "Male" ? 1 : 2;
  return result;
};

const changeDateToString = (input) => {
  const date = new Date(input);
  const reuslt = formatDateToYYYYMMDD(date);
  return reuslt;
};

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cộng thêm 1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function change2D(arr) {
  if (!arr) return [];
  const result = [];
  arr.forEach((e) => {
    const temp = [];
    e.items.forEach(() => {
      temp.push(false);
    });
    result.push(temp);
  });
  return result;
}

// function createBuyList(arr) {
//   if (!arr) return [];
//   const result = [];
//   arr.map((e) => {
//     e.items.map((el) => {
//       if (el.check) {
//         result.push({
//           id: el.id,
//           quantity: el.quantity,
//           color: el.color,
//           size: el.size,
//         });
//       }
//     });
//   });
//   return result;
// }

export {
  validateEmail,
  validatePassword,
  validatePhone,
  ChangeGenderToNumber,
  changeDateToString,
  change2D,
  // createBuyList,
};
