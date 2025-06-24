import { Fetch } from "../fetch.js"
import { convertXp } from "./displayXpLevel.js"

export const displayProject = async (project) => {
    const projects = await Fetch(project)

    const dataProject = projects.data.user[0].transactions

    const divProject = document.createElement("div")
    divProject.setAttribute("class", "div-project")
    
    dataProject.filter(t=>t.amount>0).forEach(element => {
        const div = document.createElement("div")
        div.className = "project-row"
        const divName = document.createElement("div")
        divName.className = "project-name"
        divName.innerHTML = element.object.name
        const divXp = document.createElement("div")
        divXp.className = "project-xp-time"
        const spanXp = document.createElement("span")
        spanXp.id = "project-xp"
        spanXp.innerHTML = convertXp(element.amount)
        const spanTime = document.createElement("span")
        spanTime.id = "project-time"
        spanTime.innerHTML = new Date(element.createdAt).toLocaleString()
        divXp.append(spanXp, spanTime)
        const members = element.object.progresses[0].group.members
        const divMember = document.createElement("div")
        divMember.className = "project-member"
        members.forEach(element => {
            const a = document.createElement("a")
            a.href = `https://learn.zone01oujda.ma/git/${element.userLogin}`
            a.innerHTML = element.userLogin
            divMember.appendChild(a)

        })
        div.append(divName, divXp, divMember)
        divProject.append(div)
    })
    document.body.append(divProject)
    const div = document.createElement("div")
    div.className = "title"
    div.innerHTML = "<strong>Graph Svg</strong>"
    document.body.append(div)
}
