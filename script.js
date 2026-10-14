document.getElementById("year").textContent = new Date().getFullYear();

// 2. DARK-MODE....................................................

const themeButton = document.getElementById("themeButton");
const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {

        localStorage.setItem("portfolioTheme", "dark");

    } else {

        localStorage.setItem("portfolioTheme", "light");

    }

});


// 3. CONTACT-FORM......................................................

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const scriptURL = "https://script.google.com/macros/s/AKfycbyEMINkyB8AbQhduXHGGdMz9maYI9gv5dIsDPEkc0lQbVCQ56ZQYdWDXRrhQoi22icnig/exec";

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    if (name === "" || email === "" || message === "") {

        formStatus.textContent = "Please fill in all fields.";

        return;
    }

    const response = {
        name: name,
        email: email,
        message: message
    };

    let responses = JSON.parse(
        localStorage.getItem("portfolioResponses")
    ) || [];

    responses.push(response);

    localStorage.setItem(
        "portfolioResponses",
        JSON.stringify(responses)
    );

    formStatus.textContent = "Submitting your message...";

    fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(response)
    })
    .then(function () {


        formStatus.textContent =
            "Request sent. Please check Google Sheets to confirm it was saved.";

        contactForm.reset();

    })
    .catch(function (error) {

    
        formStatus.textContent =
            "Unable to send the request. Please try again.";

        console.error("Contact form error:", error);

    });

});


// 4. ADMIN-LOGIN.........................................................

const adminForm = document.getElementById("adminForm");
const adminPasswordInput = document.getElementById("adminPassword");
const adminStatus = document.getElementById("adminStatus")

const responseSection = document.getElementById("responseSection");
const responseList = document.getElementById("responseList");
const logoutButton = document.getElementById("logoutButton");

const adminPassword = "Admin123";


responseSection.hidden = true;


adminForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const enteredPassword = adminPasswordInput.value;

    if (enteredPassword === adminPassword) {

        adminStatus.textContent = "Login successful!";

        responseSection.hidden = false;

        showResponses();

    } else {

        adminStatus.textContent = "Incorrect password. Please try again.";

        responseSection.hidden = true;

    }

});


// 5. DISPLAY CONTACT RESPONSES...............................................

function showResponses() {

    const responses = JSON.parse(
        localStorage.getItem("portfolioResponses")
    ) || [];

    responseList.replaceChildren();

    if (responses.length === 0) {

        responseList.textContent = "No responses found.";

        return;
    }

    responses.forEach(function (response) {

        const card = document.createElement("div");

        const nameElement = document.createElement("p");
        nameElement.textContent = "Name: " + response.name;

        const emailElement = document.createElement("p");
        emailElement.textContent = "Email: " + response.email;

        const messageElement = document.createElement("p");
        messageElement.textContent = "Message: " + response.message;

        card.appendChild(nameElement);
        card.appendChild(emailElement);
        card.appendChild(messageElement);

        responseList.appendChild(card);

    });

}


// 6. ADMIN-LOGOUT..........................................

logoutButton.addEventListener("click", function () {

    responseSection.hidden = true;

    adminForm.reset();

    adminStatus.textContent = "";

});