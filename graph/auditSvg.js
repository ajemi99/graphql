import { Fetch } from "../fetch.js";
export const auditSvg = async (failedD, succeeded) => {
    const respFailed = await Fetch(failedD);
    const respSucceeded = await Fetch(succeeded);
    const countFailed = respFailed.data.user[0].audits_aggregate.aggregate.count;
    const countSucceeded = respSucceeded.data.user[0].audits_aggregate.aggregate.count;
    const total = countSucceeded + countFailed;
    const successRatio = countSucceeded / total;
    const failedRatio = countFailed / total;
    const circleLength = 2 * Math.PI * 90; // محيط الدائرة

    const successStroke = circleLength * successRatio;
    const failedStroke = circleLength * failedRatio;

    const divSvg = document.createElement("div");
    divSvg.id = "graph";

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.classList.add("xp")
    
    const bg = document.createElementNS(svgNS, "circle");
    bg.setAttribute("cx", "100");
    bg.setAttribute("cy", "100");
    bg.setAttribute("r", "90");
    bg.setAttribute("stroke", "#eee");
    bg.setAttribute("stroke-width", "20");
    bg.setAttribute("fill", "none");
    svg.appendChild(bg);
    const success = document.createElementNS(svgNS, "circle");
    success.setAttribute("cx", "100");
    success.setAttribute("cy", "100");
    success.setAttribute("r", "90");
    success.setAttribute("stroke", "green");
    success.setAttribute("stroke-width", "20");
    success.setAttribute("fill", "none");
    success.setAttribute("stroke-dasharray", `${successStroke} ${circleLength - successStroke}`);
    success.setAttribute("stroke-dashoffset", "0");

    svg.appendChild(success);
    const failed = document.createElementNS(svgNS, "circle");
    failed.setAttribute("cx", "100");
    failed.setAttribute("cy", "100");
    failed.setAttribute("r", "90");
    failed.setAttribute("stroke", "red");
    failed.setAttribute("stroke-width", "20");
    failed.setAttribute("fill", "none");
    failed.setAttribute("stroke-dasharray", `${failedStroke} ${circleLength-failedStroke}`);
    failed.setAttribute("stroke-dashoffset", `-${successStroke}`);

    svg.appendChild(failed);
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", "100");
    text.setAttribute("y", "110");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "30");
    text.textContent = `${total} Audits`;
    svg.appendChild(text);

    divSvg.appendChild(svg);

    const info = document.createElement("div");
    const pS = document.createElement("p");
    pS.innerHTML = `success-audits ✅: ${Math.round(successRatio * 100)}%`;
    pS.style.color = "green";

    const pF = document.createElement("p");
    pF.innerHTML = `failed-audits❌: ${Math.round(failedRatio * 100)}% `;
    pF.style.color = "red";

    info.append(pS, pF);
    info.style.margin = "20px";
    divSvg.appendChild(info);

    const divSVG = document.createElement("div");
    divSVG.id = "sum-graph";
    divSVG.append(divSvg);
    divSvg.style.fontFamily = "sans-serif";

    document.body.appendChild(divSVG);
};