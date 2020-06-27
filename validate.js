//form validation
function showErrorMessage(input, form,{errorClass, inputErrorClass,}) {
    const error = document.querySelector("#" + input.id + '-error')
    error.textContent = input.validationMessage;

    error.classList.add(errorClass)
    input.classList.add(inputErrorClass)
}

function hideErrorMessage(input, form,{errorClass, inputErrorClass, ...rest}) {
    const error = document.querySelector("#" + input.id + '-error')
    error.textContent = '';

    error.classList.remove(errorClass)
    input.classList.remove(inputErrorClass)
}


function checkInputValidity(input, form, rest) {
    if(input.validity.valid){
        hideErrorMessage(input, form, rest)
    } else {
       showErrorMessage(input, form, rest)
    }
}

function toggleButtonsState(inputs, button, {inactiveButtonClass, ...rest}) {
    const isValid = inputs.every((input) => input.validity.valid)

    if(isValid) {
        button.classList.remove(inactiveButtonClass)    
    } else {
        button.classList.add(inactiveButtonClass)   
    }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
    const forms = [...document.querySelectorAll(formSelector)]
    forms.forEach((form) =>{
        form.addEventListener('submit', ((e) => {
            e.preventDefault();
        }));

        const inputs = [...form.querySelectorAll(inputSelector)]
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', ()=>{
                checkInputValidity(input, form, rest);
                toggleButtonsState(inputs, button, rest);
            })
        })
    })
}

enableValidation({
    formSelector: ".popout__form",
    inputSelector: ".popout__form-input",
    submitButtonSelector: ".popout__button",
    inactiveButtonClass: "popout__button_disabled",
    inputErrorClass: "popout__form-input_error",
    errorClass: "popout__form-input-error_active"
  });
// changed code to match the video in slack
// the link is https://yadi.sk/i/nSMlMnZIZf39cQ
// wasn't sure how to match the code I had for review, so I used this as a reference
// also hope its ok to add a link in comments, if not let me know please