function renderFormula() {
    // 사용자가 입력한 수식을 가져옵니다.
    const formula = document.getElementById("formulaInput").value.trim();

    // 수식을 렌더링할 요소 선택
    const outputElement = document.getElementById("output");

    // 입력값이 비어 있을 경우 경고 메시지
    if (!formula) {
        outputElement.innerHTML = "Please enter a formula.";
        return;
    }

    // 수식을 렌더링하도록 LaTeX 수식 코드 설정
    outputElement.innerHTML = `\\(${formula}\\)`;

    // MathJax로 렌더링
    MathJax.typesetPromise([outputElement]).catch((err) => {
        outputElement.innerHTML = "Invalid formula. Please try again.";
        console.error(err);
    });
}