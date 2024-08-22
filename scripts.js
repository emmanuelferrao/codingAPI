document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const digimonResult = document.getElementById('digimon-result');
    const searchInput = document.getElementById('digimon-name');

    // Função para buscar Digimon específico pelo nome
    const fetchDigimon = (name) => {
        const url = 'https://digimon-api.vercel.app/api/digimon';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('Expected an array of Digimons');
                }

                const digimon = data.find(d => d.name.toLowerCase() === name.toLowerCase());

                if (digimon) {
                    if (digimon.name && digimon.level && digimon.img) {
                        digimonResult.innerHTML = `
                            <p><strong>Nome:</strong> ${digimon.name}</p>
                            <p><strong>Nível:</strong> ${digimon.level}</p>
                            <img src="${digimon.img}" alt="${digimon.name}">
                        `;
                    } else {
                        digimonResult.innerHTML = `<p>Dados do Digimon incompletos.</p>`;
                    }
                } else {
                    digimonResult.innerHTML = `<p>Digimon não encontrado.</p>`;
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                digimonResult.innerHTML = `<p>Erro ao buscar Digimon.</p>`;
            });
    };

    
    const displaySuggestions = (query) => {
        const url = 'https://digimon-api.vercel.app/api/digimon';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('Expected an array of Digimons');
                }

                const filteredDigimons = data.filter(digimon =>
                    digimon.name.toLowerCase().includes(query.toLowerCase())
                );

                if (filteredDigimons.length > 0) {
                    digimonResult.innerHTML = filteredDigimons.map(digimon => `
                        <div style="border: 1px solid #ccc; padding: 10px; margin: 5px 0;">
                            <p><strong>Nome:</strong> ${digimon.name}</p>
                            <p><strong>Nível:</strong> ${digimon.level}</p>
                            <img src="${digimon.img}" alt="${digimon.name}" style="width: 50px; height: auto;">
                        </div>
                    `).join('');
                } else {
                    digimonResult.innerHTML = `<p>Nenhum Digimon encontrado.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching Digimon suggestions:', error);
                digimonResult.innerHTML = `<p>Erro ao buscar sugestões de Digimon.</p>`;
            });
    };

    
    searchButton.addEventListener('click', () => {
        const digimonName = searchInput.value.trim();

        if (digimonName) {
            fetchDigimon(digimonName);
        } else {
            digimonResult.innerHTML = `<p>Por favor, insira um nome.</p>`;
        }
    });

    
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();

        if (query) {
            displaySuggestions(query);
        } else {
            digimonResult.innerHTML = '';
        }
    });
});
