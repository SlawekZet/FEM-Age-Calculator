// INPUTS

const day = document.getElementById("input-day");
const month = document.getElementById("input-month");
const year = document.getElementById("input-year");

// ERRORS

const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");

// OUTPUTS

const outputDays = document.getElementById("calc-days-text-output");
const outputMonths = document.getElementById("calc-months-text-output");
const outputYears = document.getElementById("calc-years-text-output");

// DATES

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// Sprawdzanie poprawności danych w poszczególnych polach input

const inputs = document.querySelectorAll("input");

function checkEmptyField(input) {
  if (input.value === "") {
    input.nextElementSibling.textContent = "This field is required";
    input.classList.add("input-error");
    input.previousElementSibling.classList.add("text-error");
    return false;
  }
  return true;
}

function checkDay(input) {
  if (input.value > 31 || input.value <= 0) {
    input.nextElementSibling.textContent = "Must be a valid day";
    input.classList.add("input-error");
    input.previousElementSibling.classList.add("text-error");
    return false;
  }
  return true;
}

function checkMonth(input) {
  if (input.value > 12 || input.value <= 0) {
    input.nextElementSibling.textContent = "Must be a valid month";
    input.classList.add("input-error");
    input.previousElementSibling.classList.add("text-error");
    return false;
  }
  return true;
}

// Założyłem, że rok nie może być mniejszy od 1900 i większy od aktualnego roku

function checkYear(input, currentYear) {
  if (input.value > currentYear || input.value <= 0) {
    input.nextElementSibling.textContent = "Must be a valid year";
    input.classList.add("input-error");
    input.previousElementSibling.classList.add("text-error");
    return false;
  }
  return true;
}

inputs.forEach(function (input) {
  input.addEventListener("blur", function () {
    if (!checkEmptyField(input)) {
      return;
    }

    if (input.id === "input-day") {
      if (!checkDay(input)) {
        return;
      }
    } else if (input.id === "input-month") {
      if (!checkMonth(input)) {
        return;
      }
    } else if (input.id === "input-year") {
      if (!checkYear(input, currentYear)) {
        return;
      }
    }

    input.nextElementSibling.textContent = "";
    input.classList.remove("input-error");
    input.previousElementSibling.classList.remove("text-error");
  });
});

day.addEventListener("blur", dateValidation);
month.addEventListener("blur", dateValidation);
year.addEventListener("blur", dateValidation);

// Sprwadzajka poprawności roku - porównanie z bazie wprowadzonych danych czy dana data może zostac utowrzona
let isValidDate = false;
function dateValidation() {
  const inputSectionHeaders = document.querySelectorAll(".input-section-text");
  if (day.value !== "" && month.value !== "" && year.value !== "") {
    let inputDay = parseInt(day.value);
    let inputMonth = parseInt(month.value) - 1; // - 1 od miesiąca, bo indeks miesiąca w obiekcie Date zaczyna się od 0
    let inputYear = parseInt(year.value);

    let inputDate = new Date(inputYear, inputMonth, inputDay);

    if (
      inputDate.getDate() !== inputDay ||
      inputDate.getMonth() !== inputMonth ||
      inputDate.getFullYear() !== inputYear
    ) {
      errorDay.textContent = "Must be a valid date";
      inputs.forEach(function (input) {
        input.classList.add("input-error");
      });
      inputSectionHeaders.forEach(function (header) {
        header.classList.add("text-error");
      });
      isValidDate = false;
    } else {
      errorDay.textContent = "";
      inputs.forEach(function (input) {
        input.classList.remove("input-error");
      });
      inputSectionHeaders.forEach(function (header) {
        header.classList.remove("text-error");
      });
      isValidDate = true;
    }
  }
}

// Kalkulacja dni

function calculateDate() {
  if (isValidDate) {
    let inputDay = parseInt(day.value);
    let inputMonth = parseInt(month.value) - 1;
    let inputYear = parseInt(year.value);
    let inputDate = new Date(inputYear, inputMonth, inputDay);
    let yearsDifference = currentDate.getFullYear() - inputDate.getFullYear();
    let monthDifference = currentDate.getMonth() - inputDate.getMonth();
    let daysDifference = currentDate.getDate() - inputDate.getDate();

    console.log(yearsDifference);
    console.log(monthDifference);
    console.log(daysDifference);

    if (monthDifference < 0 || (monthDifference === 0 && daysDifference < 0)) {
      yearsDifference--;
      if (monthDifference === 0) {
        monthDifference = 11;
      } else if (daysDifference < 0) {
        daysDifference = 30 + daysDifference;
        monthDifference = 12 + monthDifference;
        monthDifference--;
      } else {
        monthDifference = 12 + monthDifference;
      }
    }

    outputDays.textContent = daysDifference;
    outputMonths.textContent = monthDifference;
    outputYears.textContent = yearsDifference;
  } else {
    return "coś jest nie tak";
  }
}
