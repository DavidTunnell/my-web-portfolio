const formFeedbackSpan = document.querySelector(".form-feedback");
const contactForm = document.querySelector(".contact-form");

const submitHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector(".user-input-name").value.trim();
    const email = document.querySelector(".user-input-email").value.trim();
    const phoneNumber = document
        .querySelector(".user-input-phone")
        .value.trim();
    const message = document.querySelector(".user-input-message").value.trim();

    if (!validateEmail(email)) {
        formFeedbackSpan.innerHTML = "Please enter a valid email address.";
        formFeedbackSpan.style.color = "#FFCFCF";
        return;
    }
    console.log(name);
    console.log(email);
    console.log(phoneNumber);
    console.log(message);
    if (name && email && phoneNumber && message) {
        const response = await fetch("/text-email", {
            method: "POST",
            body: JSON.stringify({ name, email, phoneNumber, message }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            formFeedbackSpan.innerHTML = "Message successfully received!";
            formFeedbackSpan.style.color = "#C6FFBE";
            contactForm.reset();
        } else {
            formFeedbackSpan.innerHTML = "Error sending email.";
            formFeedbackSpan.style.color = "#FFCFCF";
        }
    } else {
        formFeedbackSpan.innerHTML = "Please fill out all fields.";
        formFeedbackSpan.style.color = "#FFCFCF";
    }
};

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const submitButton = document
    .querySelector(".form-button")
    .addEventListener("click", submitHandler);
