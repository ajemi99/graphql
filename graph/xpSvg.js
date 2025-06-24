import { Fetch } from "../fetch.js"
import { convertXp } from "../displayData/displayXpLevel.js"
export const xpSvg = async (xp) => {
    const data_xp = await Fetch(xp)
    const amount = data_xp.data.user[0].transactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).filter(t => t.amount > 0)
    const svgNS = "http://www.w3.org/2000/svg"
    const svg = document.createElementNS(svgNS, "svg")
    svg.classList.add("progrss")
    svg.setAttribute("preserveAspectRatio", 'xMidYMid meet')
    svg.setAttribute("viewBox", "0 0 500 400")
    const titleText = document.createElementNS(svgNS, "text")
    titleText.setAttribute("x", 250) 
    titleText.setAttribute("y", 30)  
    titleText.setAttribute("text-anchor", "middle")
    titleText.setAttribute("font-size", "24")
    titleText.setAttribute("fill", "black")
    titleText.style.fontFamily = "Arial, sans-serif"
    titleText.textContent = "Graph XP-PROJECT"
    svg.appendChild(titleText)
    const barWidth = 500 / amount.length
    const maxAmount = (Math.max(...amount.map(t => t.amount)))
    amount.forEach((element, index) => {
    
        const rect = document.createElementNS(svgNS, "rect")
        rect.classList = "bar-xp"
        const barHeigth = ((element.amount) / maxAmount) * (400 - 20)
        const x = index * barWidth
        const y = 390 - barHeigth
    
        rect.setAttribute("x", x)
        rect.setAttribute("y", y)
        rect.setAttribute("width", barWidth - 2)
        rect.setAttribute("height", barHeigth)
        rect.setAttribute("fill", "rgb(33, 150, 243)")
        const title = document.createElementNS(svgNS, "title")
        title.textContent = `${element.object.name}: ${convertXp(element.amount)}`
        rect.appendChild(title)
        svg.appendChild(rect)

    })
    const graph = document.querySelector("#sum-graph")

    graph.append(svg)

}