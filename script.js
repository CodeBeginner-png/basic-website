function toggleMenu(evt) {
    var nav = document.querySelector("#nav-list");
    console.log('nav:', nav);
    if (nav.style.display === "block") {
        evt.target.innerText = "=";
        nav.style.display = "none";
        nav.style.transition = "opacity 0.1s ease-out";
        nav.style.opacity = 0;
     } else {
        evt.target.innerText = "X";
        nav.style.display = "block";
        nav.style.opacity = 1;
        nav.style.transition = "opacity 0.5s ease-in";
    }

 }
