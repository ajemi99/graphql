import { Fetch } from "../fetch.js"
export const xpUNDlevel = async (xpUser, levelUser) => {
    const xpData = await Fetch(xpUser)
    const levelData = await Fetch(levelUser)
    const numXp = xpData.data.transaction_aggregate.aggregate.sum.amount
    const level = levelData.data.transaction[0].amount
    const xpConv = convertXp(numXp)
    const levelXp = document.querySelector(".level-xp")

    levelXp.innerHTML = `
      <p id= "level"><strong>Current Level :</strong> ${level}</p>
       <p id="xp"><strong>Total XP :</strong> ${xpConv}</p>
     `
}
export const convertXp = (num) => {
    if (num < 1000) return num.toFixed(2) +"B"
    num /= 1000
    if (num < 1000) return num.toFixed(2) + "KB"
      num /= 1000
    if (num < 1000) return num.toFixed(2) + "MB"
      num /= 1000
      return num.toFixed(2) + "GB"
}