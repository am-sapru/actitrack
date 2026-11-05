var unamediv = document.getElementById("username")
var svgicon = document.getElementById("svgicon")

var accountsettingspage = document.getElementById("accountsettingspage")
var accsetbutton = document.getElementById("accsetbutton")
var accsetclose = document.getElementById("accsetclose")
var accsetpasswordinput = document.getElementById("accsetpasswordinput")
var accsettogglepassword = document.getElementById("accsettogglepassword")
var accsetemailinput = document.getElementById("accsetemailinput")

var accsetpasswordshowing = false

var confirmaccdeletedialog = document.getElementById("confirmaccdeletedialog")
var accdelcancel = document.getElementById("accdelcancel")
var accdelcontinue = document.getElementById("accdelcontinue")
var accdeleteconfirminputbox = document.getElementById("accdeleteconfirminputbox")

var mainpagehomehtml = `<div class="maintitle">
                    <h1 class="maintitleh1">Home</h1>
                </div>
                <div class="topcards">
                    <div class="todoactivities">
                        <h2 class="titleofsection">
                            To Do
                        </h2>
                        <div class="sectioncontent">
                            <i class="nothingtodo">Good Work! Nothing due!</i>
                        </div>
                    </div>
                </div>`

var mainpagetodohtml = ``

// accountsettingspage.showModal()
// confirmaccdeletedialog.showModal()

var serverList = window.sessionStorage.getItem("serverlist")
var slj = JSON.parse(serverList)

accsetdeleteaccount.addEventListener("click", () => {
    accountsettingspage.close()
    confirmaccdeletedialog.showModal()
})

accsetusername.innerHTML = window.sessionStorage.getItem("username");

var toastarea = document.getElementById("toastarea")
function toast(toastTitle, toastMessage) {
    toastarea.classList.add("toastareaactive")
    toastarea.innerHTML = `<div class="closetoast" id="closetoast">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#121212"><path d="m480-424 116 116q11 11 28 11t28-11q11-11 11-28t-11-28L536-480l116-116q11-11 11-28t-11-28q-11-11-28-11t-28 11L480-536 364-652q-11-11-28-11t-28 11q-11 11-11 28t11 28l116 116-116 116q-11 11-11 28t11 28q11 11 28 11t28-11l116-116Zm0 344q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
    </div>
    <div class="maintoastarea">
        <h2 class="toasttitle">${toastTitle}</h2>
        <p class="toastmessage">
            ${toastMessage}
        </p>
    </div>`
    var closetoast = document.getElementById("closetoast")
    if (closetoast) {
        closetoast.addEventListener("click", () => {
            toastarea.classList.remove("toastareaactive")
            setTimeout(() => {
                toastarea.innerHTML = ""
            }, 150)
        })
    }
}

toast("Hello!", "Nice to see you.")


accsetbutton.addEventListener("click", () => {
    accountsettingspage.showModal()
})

accsetclose.addEventListener("click", () => {
    accountsettingspage.close()
})

if (window.sessionStorage.getItem("username")) {
    unamediv.innerHTML = window.sessionStorage.getItem("username")
}

if (window.sessionStorage.getItem("loggedin") !== "true") {
    window.location.href = "/dashboard/authenticate"
}

svgicon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#121212"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
`

accsetpasswordinput.value = window.sessionStorage.getItem("authpass")
accsetemailinput.value = window.sessionStorage.getItem("email")

accsettogglepassword.addEventListener("click", () => {
    accsetpasswordshowing = !accsetpasswordshowing
    if (accsetpasswordshowing === true) {
        accsetpasswordinput.type = "text"
        accsettogglepassword.innerHTML = "Hide"
        accsettogglepassword.style.transform = "translateY(-59.5px) translateX(271px)"
    } else if (accsetpasswordshowing === false) {
        accsetpasswordinput.type = "password"
        accsettogglepassword.innerHTML = "Show"
        accsettogglepassword.style.transform = "translateY(-59.5px) translateX(265px)"
    }
})

accdelcancel.addEventListener("click", () => {
    confirmaccdeletedialog.close()
    toast("Account Deletion", "Canceled")
})
accdelcontinue.addEventListener("click", () => {
    if (accdeleteconfirminputbox.value === "CONTINUE") {
        confirmaccdeletedialog.close()
        toast("Account Deletion", "Deleting account...")

        console.log(serverList.main)
        fetch(`${slj.main}/user/removeuser/${window.sessionStorage.getItem("username")}/${window.sessionStorage.getItem("authpass")}`)
            .then(
                response => response.text()
            )
            .then(
                data => {
                    if (data === "Success!") {
                        toast("Account Deletion", "Deleted Account")
                        setTimeout(() => {
                            window.location.href = "/login"
                        }, 1000)
                    } else {
                        toast("Account Deletion", `Error deleting account: ${data}`)
                    }
                }
            )
    } else {
        confirmaccdeletedialog.close()
        toast("Account Deletion", "Canceled")
    }
})