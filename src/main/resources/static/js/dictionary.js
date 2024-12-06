
async function lookupWord() {
    const word = document.getElementById('word').value.trim();
    const definitionDiv = document.getElementById('definition');
    definitionDiv.innerHTML = ''; // Clear previous results

    if (!word) {
        definitionDiv.innerHTML = '<p>Please enter a word to search.</p>';
        return;
    }

    try {
        const definition = await fetchDefinitionFromNaver(word);
        if (definition) {
            definitionDiv.innerHTML = `<h3>Results for "${word}":</h3><p>${definition}</p>`;
        } else {
            definitionDiv.innerHTML = `<p>No results found for "${word}".</p>`;
        }
    } catch (error) {
        definitionDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Fetch word definition using Naver Knowledge API
async function fetchDefinitionFromNaver(word) {
    const clientId = 'sEHy81GqivO9ZD0gOUjp'; // Replace with your Naver Client ID
    const clientSecret = 'Q6PQDACUSg'; // Replace with your Naver Client Secret

    const response = await fetch(`https://openapi.naver.com/v1/search/encyc.json?query=${encodeURIComponent(word)}`, {
        headers: {
            'X-Naver-Client-Id': clientId,
            'X-Naver-Client-Secret': clientSecret,
        }
    });

    if (!response.ok) throw new Error("Failed to fetch definition.");
    const data = await response.json();

    // Extract definition from the API response
    if (data.items && data.items.length > 0) {
        return data.items[0].description.replace(/<[^>]+>/g, ''); // Remove HTML tags from the result
    } else {
        return null;
    }
}

