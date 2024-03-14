const fs = require('fs');
const path = require('path');
const xpFilePath = path.join(__dirname, 'xpData.json');

// Initialize or load XP data
let xpData = {};
if (fs.existsSync(xpFilePath)) {
    xpData = JSON.parse(fs.readFileSync(xpFilePath, 'utf8'));
}

function saveXPData() {
    fs.writeFileSync(xpFilePath, JSON.stringify(xpData, null, 2), 'utf8');
}

function getUserXPData(userId) {
    return xpData[userId] || { nickname: '', identifier: '', id: userId, xp: 0 };
}

function updateUserXPData(userId, data) {
    xpData[userId] = data;
    saveXPData();
}

function addXP(userId, amount, member = null) {
    const userData = getUserXPData(userId);

    // Update nickname and identifier if member object is provided
    if (member) {
        userData.nickname = member.displayName; // Discord nickname
        userData.identifier = `${member.user.username}#${member.user.discriminator}`; // Discord identifier (username#discriminator)
    }

    // Initialize or update the rate limiting tracker
    const now = Date.now();
    if (!userData.lastUpdate || now - userData.lastUpdate > 5 * 60 * 1000) {
        // If more than 5 minutes have passed or no previous update, reset tracking
        userData.lastUpdate = now;
        userData.xpGainInWindow = 0; // Reset XP gain in the current window
    }

    // Calculate possible XP addition without exceeding the limit
    const potentialXP = userData.xpGainInWindow + amount;
    if (potentialXP > 100) {
        // If the addition exceeds 100 XP in the window, adjust the amount
        if (userData.xpGainInWindow >= 100) {
            // If 100 XP already gained in this window, add no more XP
            amount = 0;
        } else {
            // Adjust amount to not exceed 100 XP in the window
            amount = 100 - userData.xpGainInWindow;
        }
    }
    userData.xpGainInWindow += amount; // Update XP gained in the current window

    // Ensure XP is not set to null
    if (!userData.xp) userData.xp = 0; // Initialize XP if not present
    userData.xp += amount; // Safely add XP

    updateUserXPData(userId, userData);
}

function removeXP(userId, amount) {
    const userData = getUserXPData(userId);
    userData.xp = Math.max(0, userData.xp - amount); // Ensure XP does not go below 0
    updateUserXPData(userId, userData);
}


module.exports = {
    addXP,
    removeXP,
    getUserXPData
};
