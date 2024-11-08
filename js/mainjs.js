const keyapp = "e333805db6c041b3aa4abda25d09a021";
const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("js-preloader");
const loadMoreGamesBtn = document.querySelector(".main-button")
let nextGameListUrl = null;


const url = `https://api.rawg.io/api/games?key=${keyapp}&date=2023-06-01,2024-10-30&ordering=-added`;

const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(pl => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
}

function loadGames(url){
    loaderEl.classList.remove("loaded");
    
    // Fetch recently released games from RAWG API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            nextGameListUrl = data.next ? data.next : null;
            const games = data.results;
    
            games.forEach(game => {
                const gameItemEl = `
                <li class="item-a">
                    <div class="carte_action">
                        <img src="${game.background_image}" alt="${game.name} image" class="modele">
                        <h4 class="game-name">${game.name}<br><span class="platforms">${getPlatformStr(game.parent_platforms)}</span></h4>
                        <ul>
                            <li><i class="fa fa-star"></i> <span class="rating">${game.rating}</span></li>
                            <li><i class="fa-regular fa-calendar"></i> <span class="date">${game.released}</span></li>
                        </ul>
                        <button class="jeuvid"> VOIR PLUS </button>
                    </div>
                </li>
                `
                gameList.insertAdjacentHTML("beforeend", gameItemEl)
            });
            loaderEl.classList.add("loaded");
            if (nextGameListUrl) {
                loadMoreGamesBtn.classList.remove("hidden");
            } else {
                loadMoreGamesBtn.classList.add("hidden");
            }
        })
        .catch(error => {
            console.log("An error occurred:", error);
        });
}

// load games
loadGames(url);

// loadMoreGamebtn.addEventListener("click", ()=>{
//     if(nextGameListUrl){
//         loadGames(nextGameListUrl);
//     }
// })