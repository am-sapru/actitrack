import serverList from "../dashboard/authenticate/auth_s.js";

var createUserServer = serverList.main + "/user/adduser"

var mainformdiv = document.getElementById("mainform");
var username_input = document.getElementById("username");
var password_input = document.getElementById("password");
var email_input = document.getElementById("email");
var errorarea = document.getElementById("errorarea");

var submitbutton = document.getElementById("submitbutton")

mainformdiv.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`${createUserServer}/${username_input.value}/${password_input.value}/${email_input.value}`)
        .then(
            response => response.text()
        )
        .then(
            data => {
                if (data == "Success!") {
                    window.sessionStorage.setItem("loggedin", "true")
                    window.sessionStorage.setItem("username", username_input.value)
                    window.sessionStorage.setItem("authpass", password_input.value)
                    window.sessionStorage.setItem("email", email_input.value)
                    window.sessionStorage.setItem("serverlist", JSON.stringify(serverList))
                    window.location.href = "/dashboard/authenticate"
                }
            }
        )
})