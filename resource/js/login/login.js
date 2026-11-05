import serverList from "../dashboard/authenticate/auth_s.js";

async function getSHA256(text) {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

var server_call = await fetch(serverList.main + "/user/getuserlist");
var server_response = await server_call.json();

var mainformdiv = document.getElementById("mainform");
var username_input = document.getElementById("username");
var password_input = document.getElementById("password");
var errorarea = document.getElementById("errorarea");

mainformdiv.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        var hashword = server_response[username_input.value].passwordHash;
        var email = server_response[username_input.value].email;
        const currentInputHash = await getSHA256(password_input.value);

        if (hashword === currentInputHash) {
            console.log("Successfully logged in!");
            window.sessionStorage.setItem("loggedin", "true")
            window.sessionStorage.setItem("username", username_input.value)
            window.sessionStorage.setItem("authpass", password_input.value)
            window.sessionStorage.setItem("email", email)
            window.sessionStorage.setItem("serverlist", JSON.stringify(serverList))
            window.location.href = "/dashboard/authenticate"
        } else {
            errorarea.innerHTML = "*Either there was an error or the <br />username or password is incorrect.";
        }
    } catch (e) {
        errorarea.innerHTML = "*Either there was an error or the <br />username or password is incorrect.";
        console.error(`Login Error: ${e}`);
    }
});
