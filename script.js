function toggleMenu(evt) {
    console.log('evt', evt);
    let nav = document.querySelector("#nav-list");
    console.log('nav', nav);
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

document.getElementById("contactForm").addEventListener("submit", function(event) {
    // prevent default form submission
    event.preventDefault();

    //collect form data
    const firstName = document.querySelector("#fname").value;
    const lastName = document.querySelector("#lname").value;

    console.log(`Form submitted: ${firstName} ${lastName}`);

    // reset form
    document.getElementById("contactForm").requestFullscreen();

});
