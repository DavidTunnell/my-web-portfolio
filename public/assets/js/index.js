const submitHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector(".user-input-name").value.trim();
    const email = document.querySelector(".user-input-email").value.trim();
    const phoneNumber = document
        .querySelector(".user-input-phone")
        .value.trim();
    const message = document.querySelector(".user-input-message").value.trim();

    if (name && email && phoneNumber && message) {
        const response = await fetch("/text-email", {
            method: "POST",
            body: JSON.stringify({ name, email, phoneNumber, message }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            console.log("email ok");
        } else {
            console.log("email fail");
        }
    } else {
        alert("Please fill out all fields.");
    }
};

const submitButton = document
    .querySelector(".form-button")
    .addEventListener("click", submitHandler);
