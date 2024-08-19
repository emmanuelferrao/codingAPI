document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const digimonResult = document.getElementById('digimon-result');

    // Função para buscar Digimon específico
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
                // Certifique-se de que data é um array
                if (!Array.isArray(data)) {
                    throw new Error('Expected an array of Digimons');
                }

                // Encontrar o Digimon correspondente ao nome fornecido
                const digimon = data.find(d => d.name.toLowerCase() === name.toLowerCase());

                if (digimon) {
                    // Verifique se digimon contém as propriedades esperadas
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

    // Evento de clique no botão de busca
    searchButton.addEventListener('click', () => {
        const digimonName = document.getElementById('digimon-name').value.trim();

        if (digimonName) {
            fetchDigimon(digimonName);
        } else {
            digimonResult.innerHTML = `<p>Por favor, insira um nome.</p>`;
        }
    });

    // Opcional: Buscar e exibir todos os Digimons ao carregar a página (se necessário)
    // Se desejar apenas buscar um Digimon específico, remova este bloco.
    const displayAllDigimons = () => {
        fetch('https://digimon-api.vercel.app/api/digimon')
            .then(response => response.json())
            .then(data => {
                // Mostrar todos os Digimons no console ou em outro lugar se necessário
                console.log(data);
            })
            .catch(error => console.error('Error fetching all Digimons:', error));
    };

    // Uncomment the following line if you want to display all Digimons when the page loads
    // displayAllDigimons();
});
