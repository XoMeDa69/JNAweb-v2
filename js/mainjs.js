const keyapp = "e333805db6c041b3aa4abda25d09a021";
const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("loading");
const searchInput = document.getElementById("site-search");
const searchButton = document.querySelector(".btn_search");
const loadMoreGamesBtn = document.querySelector(".main-button")

const url = `https://api.rawg.io/api/games?key=${keyapp}&date=2023-06-01,2024-10-30&ordering=-added`

let nextGameListUrl = null;
let currentPage = 1;

const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(pl => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
}

function loadGames(url, append = false){
    loaderEl.classList.remove("loaded");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const games = data.results;
            nextGameListUrl = data.next;
            
            if (!append) {
                gameList.innerHTML = ""; // Effacer les résultats seulement si ce n'est pas un chargement supplémentaire
            }
    
            games.forEach(game => {
                const gameItemEl = `
                <li class="item-a">
                    <div class="carte_action">
                        <img class="map" src="${game.background_image}" alt="Image de ${game.name}" class="modele">
                        <h4 class="game-name">${game.name}<br><span class="platforms">${getPlatformStr(game.parent_platforms)}</span></h4>
                        <ul class="game-details">
                            <li><i class="fa fa-star"></i> <span class="rating">${game.rating}</span></li>
                            <li><i class="fa fa-calendar"></i> <span class="date">${game.released}</span></li>
                        </ul>
                        <button class="jeuvid" onclick="window.open('https://rawg.io/games/${game.id}', '_blank')">Voir Plus</button>
                    </div>
                </li>
                `
                gameList.insertAdjacentHTML("beforeend", gameItemEl)
            });
            loaderEl.classList.add("loaded");
            
            // Afficher ou masquer le bouton "Load More" en fonction de la disponibilité de la page suivante
            if (nextGameListUrl) {
                loadMoreGamesBtn.classList.remove("hidden");
            } else {
                loadMoreGamesBtn.classList.add("hidden");
            }
        })
        .catch(error => {
            console.log("Une erreur s'est produite :", error);
            loaderEl.classList.add("loaded");
        });
}

// Charger les jeux par défaut
loadGames(url);

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    currentPage = 1;
    if (query) {
        const searchUrl = `https://api.rawg.io/api/games?key=${keyapp}&search=${query}`;
        loadGames(searchUrl);
    }
});

loadMoreGamesBtn.addEventListener("click", () => {
    if (nextGameListUrl) {
        loadGames(nextGameListUrl, true);
        currentPage++;
    }
});
