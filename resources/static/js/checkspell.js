async function checkSpelling() {
    const text = document.getElementById("text").value.trim(); // 입력된 텍스트 가져오기
    const resultElement = document.getElementById("result"); // 결과를 표시할 요소 가져오기

    // 텍스트가 비어있으면 메시지 출력
    if (!text) {
        resultElement.textContent = "Please enter text for spell checking.";
        return;
    }

    // LanguageTool API 요청 설정
    const apiUrl = "https://api.languagetool.org/v2/check";
    const data = {
        text: text, // 검사할 텍스트
        language: detectLanguage(text), // 언어 감지
    };

    try {
        // API 요청 보내기
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(data), // 요청 데이터를 URL 인코딩
        });

        // 응답 처리
        if (!response.ok) {
            resultElement.textContent = "Failed to check spelling. Please try again.";
            return;
        }

        const responseData = await response.json(); // JSON 데이터로 파싱
        displayResults(responseData); // 결과 표시 함수 호출
    } catch (error) {
        // 오류 처리
        resultElement.textContent = "An error occurred while checking spelling.";
        console.error(error);
    }
}

// 언어 감지 함수
function detectLanguage(text) {
    const isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text); // 한국어 텍스트 검사
    return isKorean ? "ko" : "en"; // 한국어와 영어 중 감지
}

// 결과 표시 함수
function displayResults(data) {
    const resultElement = document.getElementById("result"); // 결과 표시 요소 가져오기
    if (data.matches.length === 0) {
        resultElement.textContent = "No spelling errors detected.";
        return;
    }

    let resultHTML = "<h3>Spelling Suggestions:</h3>"; // 결과를 HTML로 빌드
    data.matches.forEach((match, index) => {
        const { message, replacements, context } = match; // 응답 데이터에서 필요한 정보 추출
        resultHTML += `
            <p>
                <strong>${index + 1}. ${message}</strong><br>
                <em>Context:</em> ${context.text}<br>
                <em>Suggestions:</em> ${replacements.map((r) => r.value).join(", ")}
            </p>
        `;
    });

    resultElement.innerHTML = resultHTML; // 결과를 HTML로 표시
}
