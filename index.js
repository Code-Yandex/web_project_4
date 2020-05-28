// Let's find the form in the DOM
const formElement = document.querySelector(".popout__form");
const nameInput = formElement.querySelector(".popout__form-input_type_name");
const profileName = document.querySelector(".profile__name");
const jobInput = formElement.querySelector(".popout__form-input_type_job");
const profileJob = document.querySelector(".profile__profession");
const editBtn = document.querySelector(".profile__edit-button");
const closeBtn = document.querySelector(".popout__close-button");
const popout = document.querySelector(".popout__container");

function toggle() {   
    popout.classList.toggle("popout__container_active");
}

// Next is the form submit handler, though
// it won't submit anywhere just yet

function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                                                // Having done so, we can define our own way of submitting the form.
                                                // We'll explain it in more detail later.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    toggle()


    // Get the values of each field from the corresponding value property

    // Select elements where the field values will be entered

    // Insert new values using the textContent property of the querySelector() method
}

// Connect the handler to the form:
// it will watch the submit event

formElement.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener("click", toggle);
closeBtn.addEventListener("click", toggle);