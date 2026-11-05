var punctuation = document.getElementById("punctuation")
punctuation_list = ["?", "!", ".", ",", "!?", "...", ";", ":"]

function getRandomInt(max) {2
  return Math.floor(Math.random() * max);
}

var randompnumber = getRandomInt(8)
punctuation.innerHTML = punctuation_list[randompnumber]

if(window.sessionStorage.getItem("loggedin") == "true") {
    window.sessionStorage.setItem("authenticated", "true")
    setTimeout(() => {
        window.location.href = "/dashboard"
    }, 1000);
} else {
    setTimeout(() => {
        window.location.href = "/login"
    }, 2000);
}