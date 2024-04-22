let currentPage = 1;
let totalSteps = document.querySelectorAll(".stepForm").length;

let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");

// Object For storing user data 
let formData = {};

// function for displaying and hiding the forms 
function show(step) {
    document.querySelectorAll(".stepForm").forEach(function (element) {
        element.classList.remove("active");
    });
    document.getElementById("step" + step).classList.add("active");
}

// function to navigation forward
function navigateForward(event) {

    event.preventDefault();
    nextBtn.disabled = true;

    let currentForm = document.getElementById("step" + currentPage);
    let inputFields = currentForm.querySelectorAll("input");
    let gender = document.getElementById('gender').value;
    isValid = true;

    inputFields.forEach((input) => {
        if (!isValidInput(input)) {
            isValid = false;
        }
    });

    // if all the input fields are valid data will be stored in the object
    if (isValid) {
        inputFields.forEach(input => {
            formData[input.placeholder] = input.value;
        });

        // storing gender data 
        formData["Gender"] = gender;

        // storing the data in the local storage
        localStorage.setItem("formData", JSON.stringify(formData));


        if (currentPage === totalSteps) {

            show(currentPage);
            console.log("display");

            document.getElementById("form").submit();
            document.getElementById("form").reset();

            window.location.href = "display.html";
        }

        if (currentPage < totalSteps) {
            currentPage++;
            show(currentPage);
        }

        if (currentPage != 1) {
            prevBtn.disabled = false;
        } else {
            prevBtn.disabled = true;
        }

        if(currentPage == totalSteps) {
            nextBtn.textContent = "Save";
        } else {
            nextBtn.textContent = "Save & Next";
        }
    }

}

// function to navigate backward
function navigateBackward(event) {
    event.preventDefault();
    nextBtn.disabled = false;

    if (currentPage > 1) {
        currentPage--;
        show(currentPage);
    }
    if (currentPage != 1) {
        prevBtn.disabled = false;
    } else {
        prevBtn.disabled = true;
    }
    if(currentPage != totalSteps) {
        nextBtn.textContent = "Save & Next";
    }
}


function check() {

    let currentSection = document.getElementById("step" + currentPage);
    let inputFields = currentSection.querySelectorAll("input");
    let gender = document.getElementById("gender").value;
    let inputs = Array.from(inputFields);

    // to check whether any of the field is empty
    let isEmpty = inputs.some(input => input.value.trim() === "");

    let validGender = gender === "male" || gender === "female" || gender === "other";
    console.log(validGender);

    if (!isEmpty && validGender) {
        nextBtn.disabled = false;
    }
    else {
        nextBtn.disabled = true;
    }

}

// function to validate input entered by user
function validate(event, fieldName) {
    let regexString = /^[A-Za-z ]+$/;
    let regexNum = /^\d/;

    switch (fieldName) {

        case 'firstName': let regexFirstName = /^[A-Za-z]+$/;
            validateField(event, regexFirstName);
            break;

        case 'lastName': let regexLastName = /^[A-Za-z]+$/;
            validateField(event, regexLastName);
            break;

        case 'age':
            validateField(event, regexNum);
            break;

        case 'phoneNumber': let regPhoneNumber = /^\d{1,10}/;
            validateField(event, regPhoneNumber);
            break;

        case 'city': validateField(event, regexString);
            break;

        case 'country': validateField(event, regexString);
            break;

        case 'postalCode':
            validateField(event, regexNum);
            break;
    }
}

// function to prevent invalid input on keydown 
function validateField(event, regex) {
    let key = event.key;

    if (key === 'Backspace') {
        return false;
    }
    if (!regex.test(key)) {
        event.preventDefault();
        return true;
    }
    return false;
}

// function to check for the validity of input field and show error message
function isValidInput(input) {

    let isValid = true;
    let invalidPassword = document.querySelector('.invalidPassword');
    let invalidConfirmPassword = document.querySelector('.invalidConfirmPassword');


    switch (input.name) {
        case "email":
            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
            isValid = regex.test(input.value);
            break;

        case "password":
            let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            isValid = regexPassword.test(input.value);
            break;

        case "confirmPassword":
            let password = document.getElementById('password').value.trim();
            isValid = input.value === password;
            break;

        case "phoneNumber":
            isValid = input.value.length === 10;
            break;

        case "postalCode":
            isValid = input.value.length === 6;
            break;

        default:
            isValid = true;

    }

    if ((input.name != 'confirmPassword') && (input.name != 'password')) {
        if(!isValid) {
            input.nextElementSibling.textContent = `Invalid ${input.placeholder}`;
        }
        else {
            input.nextElementSibling.textContent = "";
        }
    } 

    if (input.name === 'confirmPassword') {
        if (!isValid) {
            invalidConfirmPassword.innerText = "Password does not match";
        } else {
            invalidConfirmPassword.innerText = "";
        }
    }

    if (input.name === 'password') {
        if (!isValid) {
            invalidPassword.innerText = "Invalid Password";
        } else {
            invalidPassword.innerText = "";
        }
    }

    input.addEventListener('input', function () {
        if (input.nextElementSibling && (input.nextElementSibling.classList.contains('confirmPswd') || input.nextElementSibling.classList.contains('pswd'))) {
            return;
        }
        if(input.nextElementSibling) {
            input.nextElementSibling.textContent = "";
        }
    });

    return isValid;
}

// function to hide or show the password by clicking on eye toggle button
function showPassword(input, iconId) {

    let inputField = document.getElementById(input);
    let icon = document.querySelector(`.${iconId} .fa-regular`);

    if (inputField.type === "password") {
        inputField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }
    else {
        inputField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
