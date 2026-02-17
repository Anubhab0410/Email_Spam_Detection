// 1. Create a floating button on the screen
const button = document.createElement("button");
button.innerText = "🕵️ Check Spam";
button.classList.add("spam-badge", "badge-neutral");
document.body.appendChild(button);

// 2. Define what happens when you click it
button.addEventListener("click", async () => {
    button.innerText = "Analyzing...";
    
    // Tactic: Grab ALL text visible in the main email container
    // '.a3s' is a common class for email bodies in Gmail
    // We also fallback to 'innerText' of the body if specific classes fail
    let emailContent = "";
    const gmailBody = document.querySelector('.a3s'); 
    
    if (gmailBody) {
        emailContent = gmailBody.innerText;
    } else {
        // Fallback: Just grab all text on screen (less accurate but works)
        emailContent = document.body.innerText;
    }

    // 3. Send to your Python Server
    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: emailContent })
        });

        const data = await response.json();

        // 4. Update the button color/text based on result
        if (data.result === "Spam") {
            button.innerText = "⚠️ SPAM DETECTED";
            button.classList.remove("badge-neutral", "badge-ham");
            button.classList.add("badge-spam");
        } else {
            button.innerText = "✅ Looks Safe (Ham)";
            button.classList.remove("badge-neutral", "badge-spam");
            button.classList.add("badge-ham");
        }

    } catch (error) {
        console.error(error);
        button.innerText = "Error (Check Server)";
    }
});