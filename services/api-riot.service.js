const axios = require('axios');
const API_KEY = process.env.API_KEY

class apiRiotService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://euw1.api.riotgames.com/lol',
            headers: {
                "X-Riot-Token": API_KEY
            },
        });
    }

    getSummonerInfo(summonerName) {
        let encondeName = encodeURIComponent(summonerName)
        return this.axios
            .get(`/summoner/v4/summoners/by-name/${encondeName}`)
            .then(({ data }) => {
                return data
            })
            .catch(e => console.log(e))
    }

    getSummonerElo(id) {
        return this.axios
            .get(`/league/v4/entries/by-summoner/${id}`)
            .then(({ data }) => data)
            .catch(e => console.log(e))
    }

    getWeeklyChampion() {
        return this.axios
            .get('/platform/v3/champion-rotations')
            .then(({ data }) => {
                let { freeChampionIds } = data
                return freeChampionIds
            })
            .catch(e => console.log(e))
    }
}

module.exports = new apiRiotService()