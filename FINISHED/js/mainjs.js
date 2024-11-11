const keyapp = "e333805db6c041b3aa4abda25d09a021";
const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("js-preloader");
const searchInput = document.getElementById("site-search");
const searchButton = document.querySelector(".btn_search");

const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(pl => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
}

function loadGames(url){
    loaderEl.classList.remove("loaded");
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const games = data.results;
            gameList.innerHTML = ""; // Effacer les résultats précédents
    
            games.forEach(game => {
                const gameItemEl = `
                <li class="item-a">
                    <div class="carte_action">
                        <img src="${game.background_image}" alt="Image de ${game.name}" class="modele">
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
        })
        .catch(error => {
            console.log("Une erreur s'est produite :", error);
        });
}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        const searchUrl = `https://api.rawg.io/api/games?key=${keyapp}&search=${query}`;
        loadGames(searchUrl);
    }
});

// Charger les jeux par défaut
loadGames(`https://api.rawg.io/api/games?key=${keyapp}&date=2023-06-01,2024-10-30&ordering=-added`);