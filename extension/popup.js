document.getElementById("checkBtn").addEventListener("click", async () => {
    const text = document.getElementById("emailInput").value;
    const resultDiv = document.getElementById("result");

    resultDiv.textContent = "Analyzing...";

    try {
        // Send data to your Python backend
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();
        
        // Update UI
        resultDiv.textContent = "Result: " + data.result;
        resultDiv.style.color = data.result === "Spam" ? "red" : "green";
        
    } catch (error) {
        resultDiv.textContent = "Error: ensure server is running.";
    }
});