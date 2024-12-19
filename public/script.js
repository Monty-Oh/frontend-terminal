document.addEventListener("DOMContentLoaded", () => {
    const terminalContent = document.getElementById("terminal-content");
    const userInput = document.getElementById("user-input");
    const inputLine = document.getElementById("input-line");

    // 초기 메시지 출력
    const messages = [
        "> WELCOME TO MONMON SERVER (TM) TERMLINK",
        "> USER: ADMIN / GUEST",
        // "> ACCESSING SYSTEM FILES..."
    ];

    const delayBetweenLines = 1000; // 각 줄 사이의 지연 시간 (밀리초)
    const typingSpeed = 50; // 한 글자씩 출력되는 속도 (밀리초)

    function typeMessage(elementId, message, callback) {
        const element = document.getElementById(elementId);
        element.textContent = ""; // 초기화
        element.style.visibility = "visible"; // 표시
        let index = 0;

        const typingInterval = setInterval(() => {
            element.textContent += message[index];
            index++;
            if (index === message.length) {
                clearInterval(typingInterval);
                if (callback) callback(); // 다음 작업 실행
            }
        }, typingSpeed);
    }

    function displayMessages() {
        let currentLine = 0;

        function displayNextMessage() {
            if (currentLine < messages.length) {
                typeMessage(`line-${currentLine + 1}`, messages[currentLine], displayNextMessage);
                currentLine++;
            }
        }

        displayNextMessage();
    }

    displayMessages();

    // 사용자 입력 처리
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            // 새 줄 추가
            const newLine = document.createElement("p");
            const prompt = document.createElement("span");
            prompt.classList.add("prompt");
            prompt.textContent = "> "; // 각 라인 앞에 ">" 추가
            newLine.appendChild(prompt);
            newLine.appendChild(document.createTextNode(userInput.textContent));
            terminalContent.insertBefore(newLine, inputLine);
            userInput.textContent = "";
            terminalContent.scrollTop = terminalContent.scrollHeight;
        } else if (event.key === "Backspace") {
            // 마지막 글자 삭제
            userInput.textContent = userInput.textContent.slice(0, -1);
        } else if (event.key.length === 1) {
            // 새 글자 추가
            userInput.textContent += event.key;
        }
    });
});
