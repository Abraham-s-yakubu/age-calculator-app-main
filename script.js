"use strict";
const day_input = document.getElementById("input-day");
const month_input = document.getElementById("input-month");
const year_input = document.getElementById("input-year");
const btn = document.querySelector(".btn");
const error_day = document.querySelector(".day-error");
const error_month = document.querySelector(".month-error");
const error_year = document.querySelector(".year-error");
const input_container = document.querySelectorAll(".input");
const display_year = document.querySelector(".span-years");
const display_month = document.querySelector(".span-months");
const display_day = document.querySelector(".span-days");
const display_error = function (element, message) {
  element.textContent = message;
  input_container.forEach((input) => {
    input.classList.add("error");
  });
};
const remove_error = function (element, message) {
  element.textContent = "";
};
const daysinmonths = function (year, month) {
  return new Date(year, month + 1, 0).getDate();
};
function animateCount(targetCount, duration, element) {
  const startCount = 0;
  const increment = (targetCount - startCount) / (duration / 16); // Assuming 60 frames per second

  function updateCount(currentCount) {
    element.textContent = Math.round(currentCount);
  }

  function animate(currentCount) {
    if (currentCount <= targetCount) {
      updateCount(currentCount);
      setTimeout(() => {
        animate(currentCount + increment);
      }, 16);
    } else {
      updateCount(targetCount);
    }
  }

  animate(startCount + increment);
}

const calulate_age = function () {
  // Remove non-numeric characters using a regular expression
  day_input.value.replace(/[^0-9]/g, "");
  month_input.value.replace(/[^0-9]/g, "");
  year_input.value.replace(/[^0-9]/g, "");
  const user_day = day_input.value;
  const user_month = month_input.value;
  const user_year = year_input.value;
  const date = new Date();
  const current_year = date.getFullYear();
  const current_month = date.getMonth() + 1;
  const current_day = date.getDate();
//   console.log(daysinmonths(current_year, date.getMonth()));
    // validating year
  if (user_year === "") {
    display_error(error_year, "This field is required");
    return;
  } else if (isNaN(user_year)) {
    display_error(error_year, "Must be a number");
    return;
  } else if (user_year > current_year) {
    display_error(error_year, "Must be in the past");
    return;
  } else {
    remove_error(error_year);
  }
//   validating month
  if (user_month === "") {
    display_error(error_month, "This field is required");
    return;
  } else if (isNaN(user_month)) {
    display_error(error_month, "Must be a number");
    return;
  } else if (user_month > 12 || user_month < 1) {
    display_error(error_month, "Must be a vaild month");
    return;
  } else {
    remove_error(error_month);
  }
//   validating day
  if (user_day === "") {
    display_error(error_day, "This field is required");
    return;
  } else if (isNaN(user_day)) {
    display_error(error_day, "Must be a number");
    return;
  } else if (
    user_day < 1 ||
    user_day > daysinmonths(current_year, date.getMonth())
  ) {
    display_error(error_day, "must be a Vaild day");
    return;
  } else {
    remove_error(error_day);
  }
  let age_in_years = current_year - user_year;
  let age_in_months = current_month - user_month;
  let age_in_days = current_day - user_day;
  // Adjust for negative values in months or days
  if (age_in_days < 0) {
    age_in_months--;
    age_in_days += new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }
  if (age_in_months < 0) {
    age_in_years--;
    age_in_months += 12;
  }
  //   display the years, month and days on the page
  animateCount(age_in_years, 1000, display_year);
  animateCount(age_in_months, 1000, display_month);
  animateCount(age_in_days, 1000, display_day);
};

btn.addEventListener("click", calulate_age);
