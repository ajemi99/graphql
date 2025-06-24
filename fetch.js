import { login } from "./main.js"
export const Fetch = async (query) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        login();
        return;
    }

    const url = "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql";
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json", // this is important!
            },
            body: JSON.stringify({ query }),
        });
        
        const data = await response.json();
        if (data.errors) {
            login();
            return;
        }
        
        return data; // ✅ return the data
        
    } catch (error) {   
        console.error("Error:", error);
    }
};


