//form validation
function showInputError(inputSelector, inputErrorClass, errorMessage) {
    const errorClass = inputSelector.querySelector(`#${inputErrorClass.id}-error`);
    inputErrorClass.classList.add("popout__form-input_error");
    errorClass.textContent = errorMessage;
    errorClass.classList.add("popout__form-input-error_active");
}

function hideInputError(inputSelector, inputErrorClass) {
    const errorClass = inputSelector.querySelector(`#${inputErrorClass.id}-error`);
    inputErrorClass.classList.remove("popout__form-input_error");
    errorClass.classList.remove("popout__form-input-error_active");
    errorClass.textContent = "";
}

function checkInputValidity(inputSelector, inputErrorClass) {
    if (!inputErrorClass.validity.valid) {
        showInputError(inputSelector, inputErrorClass, inputErrorClass.validationMessage);
    }
     else{
        hideInputError(inputSelector, inputErrorClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputErrorClass) => {
        return !inputErrorClass.validity.valid;
    });
}

function toggleButtonState(inputList, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        inactiveButtonClass.classList.add("popout__button_disabled");
        inactiveButtonClass.setAttribute("disabled", true);
    } else{
        inactiveButtonClass.classList.remove("popout__button_disabled");
        inactiveButtonClass.removeAttribute("disabled");
    }
}

function setEventListeners(inputSelector) {
    const inputList = Array.from(inputSelector.querySelectorAll(".popout__form-input"));
    const submitButtonSelector = inputSelector.querySelector(".popout__button");
    toggleButtonState(inputList, submitButtonSelector);
    inputList.forEach((inputErrorClass) => {
        inputErrorClass.addEventListener("input", () => {
            checkInputValidity(inputSelector, inputErrorClass);
            toggleButtonState(inputList, submitButtonSelector);
        });
    });
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(".popout__form"));
    formList.forEach((inputSelector) => {
        inputSelector.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(inputSelector);
    });
}

enableValidation({
    formSelector: ".popout__form",
    inputSelector: ".popout__input",
    submitButtonSelector: ".popout__button",
    inactiveButtonClass: "popout__button_disabled",
    inputErrorClass: "popout__input_type_error",
    errorClass: "popout__form-input-error_active"
  });
// changed some names to match code requirements
// "popout__form-input-error_active" should be equal to "popup__error_visible"
// seems like everything works according to the steps
