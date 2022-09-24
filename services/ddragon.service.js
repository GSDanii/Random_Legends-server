const axios = require('axios');
const getSixItems = require("../utils/getRandomKeys")
const getOneChamp = require("../utils/getChampions")

class DDragonService {
    constructor() {
        this.axios = axios.create({
            baseURL: 'http://ddragon.leagueoflegends.com/cdn'
        });
    }

    getItemKeys() {
        return this.axios.get('/12.17.1/data/en_US/item.json').then(({ data }) => {
            const itemsObj = data.data
            let keys = Object.keys(itemsObj)
            keys = keys.filter((key) => key > 3000 && key != 3070 && key != 3330 && key != 7050)
            console.log('filtrado', keys)
            return getSixItems(keys)
        })
    }

    getChampion() {
        return this.axios.get('/12.17.1/data/en_US/champion.json').then((res) => {
            const champions = res.data.data
            let championKeys = Object.keys(champions)
            return getOneChamp(championKeys)

        })
    }

    getAllChampions() {
        return this.axios.get('/12.17.1/data/en_US/champion.json').then((res) => {
            const champions = res.data.data
            let keys = Object.keys(champions)
            return keys
        })
    }

    getDetailsChampions(name) {
        return this.axios.get(`/12.17.1/data/en_US/champion/${name}.json`).then((res) => {
            const champions = res.data.data
            return champions
        })
    }

    getChampionInfo() {
        return this.axios.get('/12.17.1/data/en_US/champion.json').then((res) => {
            const champions = res.data.data
            return champions
        })
    }

}

module.exports = new DDragonService()


