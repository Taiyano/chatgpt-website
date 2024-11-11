let score = 0;
let pointsPerClick = 1; // Base points per click
let cursorCount = 0; // Number of cursors
let clockInterval = null; // For automatic clicks via clock
let clockCount = 0; // Number of clocks

// Load game state from cookies (if available)
function loadGameState() {
    const cookies = document.cookie.split('; ');
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        switch(name) {
            case 'score':
                score = parseInt(value);
                break;
            case 'pointsPerClick':
                pointsPerClick = parseInt(value);
                break;
            case 'cursorCount':
                cursorCount = parseInt(value);
                break;
            case 'clockCount':
                clockCount = parseInt(value);
                break;
        }
    });

    // Update UI elements based on loaded data
    document.getElementById('score').textContent = score;
    document.getElementById('cursorCost').textContent = 100 * Math.pow(1.5, cursorCount); // Update cost dynamically
    document.getElementById('clockCost').textContent = 200 * Math.pow(1.5, clockCount); // Update cost dynamically
}

// Save game state to cookies
function saveGameState() {
    document.cookie = `score=${score}; path=/; max-age=31536000`;
    document.cookie = `pointsPerClick=${pointsPerClick}; path=/; max-age=31536000`;
    document.cookie = `cursorCount=${cursorCount}; path=/; max-age=31536000`;
    document.cookie = `clockCount=${clockCount}; path=/; max-age=31536000`;
}

// Click event
document.getElementById('clickButton').addEventListener('click', function() {
    score += pointsPerClick;
    document.getElementById('score').textContent = score;
    saveGameState(); // Save game state to cookies
});

// Upgrade 1 (adds +1 point per click)
document.getElementById('upgradeButton1').addEventListener('click', function() {
    const upgrade1Cost = parseInt(document.getElementById('upgrade1Cost').textContent);
    if (score >= upgrade1Cost) {
        score -= upgrade1Cost;
        pointsPerClick += 1;
        document.getElementById('upgrade1Cost').textContent = Math.floor(upgrade1Cost * 1.5);
        document.getElementById('score').textContent = score;
        saveGameState(); // Save game state to cookies
    } else {
        alert('Not enough points for this upgrade!');
    }
});

// Upgrade 2 (adds +5 points per click)
document.getElementById('upgradeButton2').addEventListener('click', function() {
    const upgrade2Cost = parseInt(document.getElementById('upgrade2Cost').textContent);
    if (score >= upgrade2Cost) {
        score -= upgrade2Cost;
        pointsPerClick += 5;
        document.getElementById('upgrade2Cost').textContent = Math.floor(upgrade2Cost * 1.5);
        document.getElementById('score').textContent = score;
        saveGameState(); // Save game state to cookies
    } else {
        alert('Not enough points for this upgrade!');
    }
});

// Cursor Upgrade (adds +1 point per click automatically)
document.getElementById('cursorButton').addEventListener('click', function() {
    const cursorCost = parseInt(document.getElementById('cursorCost').textContent);
    if (score >= cursorCost) {
        score -= cursorCost;
        cursorCount += 1;
        document.getElementById('cursorCost').textContent = Math.floor(cursorCost * 1.5);
        document.getElementById('score').textContent = score;
        saveGameState(); // Save game state to cookies
    } else {
        alert('Not enough points for this upgrade!');
    }
});

// Clock Upgrade (adds +1 click per second)
document.getElementById('clockButton').addEventListener('click', function() {
    const clockCost = parseInt(document.getElementById('clockCost').textContent);
    if (score >= clockCost) {
        score -= clockCost;
        clockCount += 1;
        document.getElementById('clockCost').textContent = Math.floor(clockCost * 1.5);
        document.getElementById('score').textContent = score;
        saveGameState(); // Save game state to cookies

        // Start the clock if it's not already active
        if (!clockInterval) {
            clockInterval = setInterval(function() {
                score += clockCount;
                document.getElementById('score').textContent = score;
                saveGameState(); // Save game state to cookies every second
            }, 1000); // Every 1 second
        }
    } else {
        alert('Not enough points for this upgrade!');
    }
});

// Initialize the game when the page loads
window.onload = function() {
    loadGameState(); // Load game state from cookies
};
