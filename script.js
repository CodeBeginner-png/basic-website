function toggleMenu(evt) {
  console.log("evt", evt);
  let nav = document.querySelector("#nav-list");
  console.log("nav", nav);
  if (nav.style.display === "block") {
    evt.target.innerText = "=";
    nav.style.display = "none";
    nav.style.transition = "opacity 0.1s ease-out";
    nav.style.opacity = 0;
  } else {
    evt.target.innerText = "x";
    nav.style.display = "block";
    nav.style.transition = "opacity 0.1s ease-in";
    nav.style.opacity = 1;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // prevent default form submission
      event.preventDefault();

      //collect form data
      const firstName = document.querySelector("#fname").value;
      const lastName = document.querySelector("#lname").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;
      const phone = document.querySelector("#phone").value;
      const errorElement = document.querySelector(".error");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      //validate email format
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        errorMsg.innerText = "Invalid email format.";
        return;
      }

      // validate required fields
      if (!firstName === "" && !lastName === "" && !email && === "" !message === "") {
        errorMsg.innerText = "Please fill in all required fields.";
        return;
      }

      // Build the mailto form
      const subject = encodeURIComponent("Contact Form Submission from " ${firstName} ${lastName}");
      const body = encodeURIComponent(
        "Name: " ${firstName} ${lastName} "\n" +
        "Email: " ${email} "\r\n" +
        "Phone: " ${phone} "\r\n" +
        `Message: ` ${message}
      );

      const recipients = "cawilliams03@batestech.edu";
      const mailtoLink = "mailto:" ${recipients} "?subject=" ${subject} "&body=" ${body};

        // submit form
        errorMsg.innerText = ""; // Clear previous error messages

    
      // reset form
      contactForm.reset();
    });
  }
});
