// 탭과 버튼 컨테이너 선택
const tabs = document.querySelectorAll(".tab");
const buttonsContainer = document.querySelector(".buttons");
const display = document.getElementById("display"); // 입력창 선택 (HTML에 있어야 함)

// 버튼 세트 정의
const buttonSets = {
    기본: [
        "DEG", "x", "y", "(", ")", "%",
        "π", "7", "8", "9", "÷",
        "log", "4", "5", "6", "×",
        "√", "1", "2", "3", "-",
        "EXP", "0", ".", "=", "+",
        "CLR", "←", "→", "()", "⟲", "▶"
    ],
    대수학: [
        "x²", "x³", "∛", "∑", "!", "÷",
        "MOD", "7", "8", "9", "×",
        "log₁₀", "4", "5", "6", "-",
        "ln", "1", "2", "3", "+",
        "eˣ", "0", ".", "=", "CLR"
    ],
    삼각법: [
        "sin", "cos", "tan", "(", ")", "%",
        "π", "asin", "acos", "atan", "÷",
        "sinh", "cosh", "tanh", "√", "×",
        "DEG", "RAD", "1", "2", "3", "-",
        "EXP", "0", ".", "=", "+"
    ],
    미적분학: [
        "∫", "∂", "dx", "dy", "dz", "÷",
        "∇", "7", "8", "9", "×",
        "d/dx", "4", "5", "6", "-",
        "∂/∂y", "1", "2", "3", "+",
        "∂/∂z", "0", ".", "=", "CLR"
    ],
    통계: [
        "Σ", "σ", "μ", "VAR", "SD", "%",
        "MED", "7", "8", "9", "÷",
        "MODE", "4", "5", "6", "×",
        "RANGE", "1", "2", "3", "-",
        "MEAN", "0", ".", "=", "+"
    ],
    문자: [
        "A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X",
        "Y", "Z", "CLR", "←", "→", "()"
    ],
    행렬: [
        "[ ]", "det", "inv", "T", "+", "-",
        "×", "÷", "rank", "trace", "eye", "zeros",
        "ones", "[1, 0]", "[0, 1]", "CLR", "="
    ]
};

// 탭 클릭 이벤트 처리
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const tabName = tab.textContent.trim();
        updateButtons(buttonSets[tabName] || []);
    });
});

// 버튼 세트 업데이트 함수
function updateButtons(buttons) {
    buttonsContainer.innerHTML = "";

    buttons.forEach((btnText) => {
        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = btnText;

        // 버튼 클릭 이벤트 추가
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (value === "CLR") {
                display.value = "";
            } else if (value === "=") {
                try {
                    // 입력 수식 계산
                    const result = math.evaluate(
                        display.value
                            .replace(/÷/g, "/")
                            .replace(/×/g, "*")
                    );
                    display.value = result;
                } catch {
                    display.value = "Error";
                }
            } else if (value === "π") {
                display.value += Math.PI; // π 상수 추가
            } else if (value === "√") {
                try {
                    const input = display.value || "0";
                    const result = Math.sqrt(parseFloat(input));
                    display.value = result;
                } catch {
                    display.value = "Error";
                }
            } else if (value === "x²") {
                try {
                    const input = display.value || "0";
                    const result = Math.pow(parseFloat(input), 2);
                    display.value = result;
                } catch {
                    display.value = "Error";
                }
            } else if (value === "x³") {
                try {
                    const input = display.value || "0";
                    const result = Math.pow(parseFloat(input), 3);
                    display.value = result;
                } catch {
                    display.value = "Error";
                }
            } else {
                display.value += value;
            }
        });

        buttonsContainer.appendChild(button);
    });
}

// 초기 버튼 세트 표시
updateButtons(buttonSets["기본"]);
