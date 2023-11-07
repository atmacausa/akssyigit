import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Swal from "sweetalert2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const sendEmail = async () => {
//   var nodemailer = require("nodemailer");

//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "ykralcan@gmail.com",
//       pass: "bazr rzwp zjqy lzco",
//     },
//   });

//   var mailOptions = {
//     from: "ykralcan@gmail.com",
//     to: "akcay.yigitc@gmail.com",
//     subject: "Sending Email using Node.js",
//     text: "That was easy!",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
