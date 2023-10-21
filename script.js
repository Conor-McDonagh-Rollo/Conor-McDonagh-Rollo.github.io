

document.querySelector("#contact-form").addEventListener("submit", function(event) {
    var honeypot = document.querySelector("#honeypot").value;
    if (honeypot) {
        // If honeypot is filled, it's likely a bot
        console.log("Looks like it's a bot");
        event.preventDefault(); // Stop form submission
        return false;
    }
});

function formatLanguage(lang) {
    if (!lang) return '';
    if (lang === 'C++') return 'cpp';
    return lang.replace(/\s|\+|\./g, '-').toLowerCase();
}

document.addEventListener("DOMContentLoaded", function() {
    // Fetch repositories
    fetch("https://api.github.com/users/Conor-McDonagh-Rollo/repos")
        .then(response => response.json())
        .then(data => {
            let portfolioSection = document.querySelector('.repo-grid');

            // Loop through repositories and add to portfolio (limited to 25)
            for (let i = 0; i < Math.min(data.length, 25); i++) {
                let repo = data[i];

                let repoCard = document.createElement('div');
                repoCard.className = "repo-card";

                let repoTitle = document.createElement('div');
                repoTitle.className = "repo-title";
                let titleLink = document.createElement('a');
                titleLink.href = repo.html_url;
                titleLink.textContent = repo.name;
                repoTitle.appendChild(titleLink);

                let repoDescription = document.createElement('div');
                repoDescription.className = "repo-description";
                repoDescription.textContent = repo.description || "No description provided.";

                let repoInfo = document.createElement('div');
                repoInfo.className = "repo-info";

                let languageSpan = document.createElement('span');
                languageSpan.className = "language language-" + formatLanguage(repo.language);
                languageSpan.textContent = repo.language || "N/A";

                let starsSpan = document.createElement('span');
                starsSpan.className = "stars";
                starsSpan.textContent = "⭐ " + repo.stargazers_count;

                let forksSpan = document.createElement('span');
                forksSpan.className = "forks";
                forksSpan.textContent = "🍴 " + repo.forks_count;

                repoInfo.appendChild(languageSpan);
                repoInfo.appendChild(starsSpan);
                repoInfo.appendChild(forksSpan);

                repoCard.appendChild(repoTitle);
                repoCard.appendChild(repoDescription);
                repoCard.appendChild(repoInfo);

                portfolioSection.appendChild(repoCard);
            }
        })
        .catch(error => {
            console.error("There was an error fetching the repositories!", error);
        });
});


const canvas = document.getElementById('starry-header');
const ctx = canvas.getContext('2d');

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

const stars = [];

function createStar() {
    const star = {
        x: -10,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,  // Size range between 1 to 3
        speed: Math.random() * 3 + 1  // Speed range between 1 to 4
    };
    stars.push(star);
}

const STAR_SPAWN_DELAY_IN_MS = 30;
let delay = 0;

function updateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        // Move star
        star.x += star.speed;

        // Remove star if it's out of the canvas
        if (star.x - star.size > canvas.width) {
            const index = stars.indexOf(star);
            stars.splice(index, 1);
        }
    }
    
    delay++;
    if (delay > STAR_SPAWN_DELAY_IN_MS) {
        delay = 0;
        createStar();
    }

    requestAnimationFrame(updateStars);
}

updateStars();