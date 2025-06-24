import { profilHtml } from "./config.js"
import { Fetch } from "./fetch.js"
import { logOut } from "./main.js"
import { displayUserInfo } from "./displayData/displayUserInfo.js"
import { xpUNDlevel } from "./displayData/displayXpLevel.js"
import { displayProject } from "./displayData/displayProject.js"
import { auditSvg } from "./graph/auditSvg.js"
import { xpSvg } from "./graph/xpSvg.js"
import { query } from "./query.js"

export const infoUser = async () => {
    document.body.innerHTML = profilHtml
    document.body.style.background = "white"
    const data = await Fetch(query.user); // ✅ await it
    console.log(data);
    
    
    const header = document.getElementById("user")
    const p = document.createElement("strong")
    p.innerHTML = `Welcome ${data.data.user[0].login}`
    header.append(p)
    await displayUserInfo(query.userInfo)
    await xpUNDlevel(query.xp, query.level)
    await displayProject(query.projectsQuery)
    await auditSvg(query.failedAudits, query.succeededAudits)
    await xpSvg(query.projectsQuery)
    logOut()
}








