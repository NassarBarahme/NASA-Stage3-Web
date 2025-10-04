const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(cors());

// API routes first
app.get('/api/weather', async (req, res) => {
    const { lat, lng, start, end } = req.query;
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR,RH2M,WS2M&community=AG&longitude=${lng}&latitude=${lat}&start=${start}&end=${end}&format=JSON`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'NASA API Error' });
    }
});

app.get('/api/forecast', async (req, res) => {
    const { lat, lng } = req.query;
    const API_KEY = '710ec0ca555852a8726987b7a79df0a8';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Forecast API Error' });
    }
});

// Static files last
app.use(express.static(path.join(__dirname)));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
    console.log('Try: http://localhost:3000/DASH.html');
});