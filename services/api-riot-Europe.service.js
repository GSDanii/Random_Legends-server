const axios = require('axios');
const API_KEY = process.env.API_KEY

class apiRiotEurope {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://europe.api.riotgames.com/lol',
            headers: {
                "X-Riot-Token": API_KEY
            },
        });
    }

    getLastMatches(puuid) {
        console.log(puuid)
        return this.axios
            .get(`/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`)
            .then(({ data }) => data)
            .catch(e => console.log(e))
    }

    getInfoMatch(match) {
        return this.axios
            .get(`/match/v5/matches/${match}`)
            .then(({ data }) => data)
            .catch(e => console.log(e))
    }
}

module.exports = new apiRiotEurope()