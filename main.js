import { loginHtml } from "./config.js"
import { infoUser } from "./infoUser.js"
const token = localStorage.getItem("jwt")
if(!token)login()
else infoUser()

export function login(){
    document.body.innerHTML = ""
    const div = document.createElement("div")
    div.className = "container"
    div.innerHTML = loginHtml
    document.body.style.background = "linear-gradient(135deg, #0044ae 0%, #d5569b 100%)";
    document.body.append(div)
    const form = document.getElementById("login-form")
    const urlSignin = "https://learn.zone01oujda.ma/api/auth/signin"
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const userName = document.getElementById("username-email").value
        const password = document.getElementById("password").value
        const convertData = btoa(`${userName}:${password}`)
        
        try {
            const response = await fetch(urlSignin, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${convertData}`
                }
            })
            
            const data = await response.json()
            if (data.error) throw data.error
            localStorage.setItem("jwt", data)
            infoUser()
            
        } catch (error) {
            errorhandl(error)
            
        }
    })
}

export const logOut = () => {
    const Logout = document.getElementById("log-out")
    Logout.addEventListener("click", () => {
        localStorage.removeItem("token")
        login()
    })
}

const errorhandl = (error) => {
    const div = document.getElementById("error")
    div.innerHTML = error
    div.style.color = "red"
}