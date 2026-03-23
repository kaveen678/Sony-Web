const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

export default async function handler(req, res) {
    const { url } = req.query;
    // ඔබ ලබා දුන් ඉන්දියානු Proxy එක
    const agent = new HttpsProxyAgent('http://103.179.46.49:6789');

    try {
        const response = await axios.get(url, {
            httpsAgent: agent,
            responseType: 'stream',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        response.data.pipe(res);
    } catch (e) {
        res.status(500).send("Proxy Error");
    }
}