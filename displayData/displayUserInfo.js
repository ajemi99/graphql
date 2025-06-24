import { Fetch } from "../fetch.js"

 export const displayUserInfo = async (user) => {

    const info = await Fetch(user)
    const container = document.createElement("div")
    container.id = "user-xp"
    const userInfo = document.createElement("div")
    userInfo.className = "user-info"

    const data = info.data.user[0].attrs
    userInfo.innerHTML = `
    <h2>👤 Profil User</h2>
    <div id = "profil" style="display: none;">
    <p><strong>Full name :</strong> ${data.
            firstName} ${data.lastName}</p>
        <p><strong>CIN :</strong> ${data.cin}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>tel :</strong> ${data.tel}</p>
        <p><strong>Gender :</strong> ${data.gender}</p>
        <p><strong>dateOfBirth :</strong> ${new Date(data.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>birthCity :</strong> ${data.birthCity}</p>
        <p><strong>Adress :</strong> ${data.addressStreet}</p>
        <p><strong>
        
        birthCountry :</strong> ${data.birthCountry}</p>
        </div>
        `
    container.append(userInfo)
    document.body.appendChild(container)
    const h2 = document.querySelector("h2")
    let check = false
    h2.addEventListener("click", () => {
        const profil = document.getElementById("profil")
        if (!check) {
            profil.style.display = "block"
            check = true
        } else {
            profil.style.display = "none"
            check = false
        }
    })
}