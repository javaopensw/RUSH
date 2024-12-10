async function lookupWord() {
    const word = document.getElementById("word").value.trim();
    const definitionElement = document.getElementById("definition");

    if (!word) {
        definitionElement.textContent = "Please enter a word.";
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            definitionElement.textContent = "Word not found. Please try another word.";
            return;
        }

        const data = await response.json();
        const meanings = data[0].meanings;

        // 페이지네이션 설정
        window.currentPage = 1;
        window.resultsPerPage = 1; // 한 번에 표시할 meanings 개수
        window.definitionsPerPage = 4; // 한 meanings 안에서 표시할 definitions 개수
        window.meanings = meanings;

        renderPage(); // 첫 페이지 렌더링
    } catch (error) {
        definitionElement.textContent = "An error occurred while looking up the word.";
    }
}

function renderPage() {
    const definitionElement = document.getElementById("definition");
    const startIndex = (window.currentPage - 1) * window.resultsPerPage;
    const endIndex = startIndex + window.resultsPerPage;
    const paginatedMeanings = window.meanings.slice(startIndex, endIndex);

    if (paginatedMeanings.length === 0) {
        definitionElement.innerHTML = "No definitions to display on this page.";
        return;
    }

    let definitionText = `<div style="text-align: center;">`; // 중앙 정렬

    // 정의 내용
    paginatedMeanings.forEach((meaning) => {
        const partOfSpeech = meaning.partOfSpeech;
        definitionText += `<h3>${partOfSpeech}</h3>`;

        // definitions 제한 적용
        meaning.definitions.slice(0, window.definitionsPerPage).forEach((def, index) => {
            definitionText += `<p>${index + 1}. ${def.definition}</p>`;
        });

        if (meaning.definitions.length > window.definitionsPerPage) {
            definitionText += `<p>...and more. </p>`;
        }
    });
    definitionText += `</div>`;

    // 페이지 이동 버튼 추가
    definitionText += `
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <button onclick="changePage(-1)" ${window.currentPage === 1 ? "disabled" : ""} 
            style= padding: 10px; cursor: pointer; border: none; border-radius: 5px;">
            이전
            </button>

            <button onclick="changePage(1)" ${endIndex >= window.meanings.length ? "disabled" : ""} 
            style=" padding: 10px; cursor: pointer; border: none; border-radius: 5px;">
            다음
            </button>
        </div>
    `;

    definitionElement.innerHTML = definitionText;
}

function changePage(direction) {
    window.currentPage += direction;
    renderPage();
}
