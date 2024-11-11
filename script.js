let score = 0;
let pointsPerClick = 1; // Base points per click
let cursorCount = 0; // Number of cursors
let clockInterval = null; // For automatic clicks via clock
let clockCount = 0; // Number of clocks

// Elements
const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const upgradeButton1 = document.getElementById('upgradeButton1');
const upgradeButton2 = document.getElementById('upgradeButton2');
const cursorButton = document.getElementById('cursorButton');
const clockButton = document.getElementById('clockButton');
const upgrade1CostElement = document.getElementById('upgrade1Cost');
const upgrade2CostElement = document.getElementById('upgrade2Cost');
const cursorCostElement = document.getElementById('cursorCost');
const clockCostElement = document.getElementById('clockCost');

// Upgrade costs
let upgrade1Cost = 10;
let upgrade2Cost = 50;
let cursorCost = 100;
let clockCost = 200;

// Click event
clickButton.addEventListener('click', function() {
    score += pointsPerClick;
    scoreElement.textContent = score;
});

// Buy Upgrade 1 (adds +1 point per click)
upgradeButton1.addEventListener('click', function() {
    if (score >= upgrade1Cost) {
        score -= upgrade1Cost;
        pointsPerClick += 1; // +1 point per click
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5); // Increase cost for Upgrade 1
        upgrade1CostElement.textContent = upgrade1Cost;
        scoreElement.textContent = score;
    } else {
        alert('Not enough points for this upgrade!');
    }
});

// Buy Upgrade 2 (adds +5 points per click)
upgradeButton2.addEventListener('click', function() {
    if (score >= upgrade2Cost) {
        score -= upgrade2Cost;
        pointsPerClick += 5; // +5 points per click
        upgrade2Cost = Math.floor(upgrade2Cost * 1.5); // Increase cost for Upgrade 2
        upgrade2CostElement.textContent = upgrade2Cost;
        scoreElement.textContent = score;
    } else {
        alert('Not enough points for this upgrade!');
    }
});

// Buy Cursor Upgrade (adds +1 point per click automatically)
cursorButton.addEventListener('click', function() {
    if (score >= cursorCost) {
        score -= cursorCost;
        cursorCount += 1; // Adds another cursor
        cursorCost = Math.floor(cursorCost * 1.5); // Increase cost for next cursor
        cursorCostElement.textContent = cursorCost;
        scoreElement.textContent = score;
    } else {
        alert('Not enough points for this upgrade!');
    }
});

// Buy Clock Upgrade (adds +1 click per second)
clockButton.addEventListener('click', function() {
    if (score >= clockCost) {
        score -= clockCost;
        clockCount += 1; // Adds another clock
        clockCost = Math.floor(clockCost * 1.5); // Increase cost for next clock
        clockCostElement.textContent = clockCost;
        scoreElement.textContent = score;

        // Start the clock if it's not already active
        if (!clockInterval) {
            clockInterval = setInterval(function() {
                score += clockCount; // Each clock gives 1 click per second
                scoreElement.textContent = score;
            }, 1000); // Every 1 second
        }
    } else {
        alert('Not enough points for this upgrade!');
    }
});
