const fs = require('fs').promises;
const tokenFilePath = './tokens.json';
const axios = require('axios');

async function saveTokens(tokens) {
    try {
        await fs.writeFile(tokenFilePath, JSON.stringify(tokens));
        console.log('Tokens saved to file');
    } catch (error) {
        console.error('Error saving tokens to file:', error);
    }
}

async function loadTokens() {
    try {
        const data = await fs.readFile(tokenFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading tokens from file:', error);
        return null;
    }
}

async function refreshAccessToken() {
    const tokens = await loadTokens(); // Load tokens from file
    if (!tokens || !tokens.refreshToken) {
        console.error('Refresh token not found. User needs to re-authenticate.');
        return null;
    }

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: tokens.refreshToken,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Check if the response is successful and contains data
        if (response.status === 200 && response.data) {
            const updatedTokens = {
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token || tokens.refreshToken, // Use new refresh token if provided, else fallback to old
                expiry: Date.now() + response.data.expires_in * 1000,
            };

            await saveTokens(updatedTokens); // Save updated tokens
            console.log('Access token refreshed and saved.');
            return updatedTokens; // Return the updated tokens
        } else {
            // Handle unsuccessful response
            console.error('Failed to refresh access token. Response:', response);
            return null;
        }
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
        return null;
    }
}

module.exports = { saveTokens, loadTokens, refreshAccessToken };
