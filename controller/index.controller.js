const axios = require('axios');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const DDragonService = require("../services/ddragon.service");
const apiRiotService = require("../services/api-riot.service")
const getChampionId = require("../utils/getChampionId")
const ChampionsModel = require('../models/Champions.model')

const champNameAndImg = (req, res, next) => {
    let tags = []

    for (const key in req.query) {
        if (req.query[key] === 'true') {
            tags.push(key)
        }
    }
    tags.length === 0
        ?

        ChampionsModel
            .find()
            .then(champions => {
                console.log('estas en 0', champions)
                const championImages = champions.map((champ) => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`)
                let nameAndImg = champions.map((champ, i) => {
                    return { name: champ.id, 'img': championImages[i], tags: champ.tags }
                })
                res.status(200).json(nameAndImg)
                // res.render("index/champions", { nameAndImg });
            })
            .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
        :
        ChampionsModel
            .find({ 'tags': { "$all": tags } })
            .then(champions => {
                console.log('estas en 1', champions)
                const championImages = champions.map((champ) => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`)
                let nameAndImg = champions.map((champ, i) => {
                    return { name: champ.id, 'img': championImages[i], tags: champ.tags }
                })
                res.status(200).json(nameAndImg)
                // res.render("index/champions", { nameAndImg });
            })
            .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
};

const searchChamps = (req, res, next) => {
    console.log(req.query)
    let tags = []

    for (const key in req.query) {
        if (req.query[key] === 'true') {
            tags.push(key)
        }
    }
    console.log(tags)

    ChampionsModel
        .find({ 'tags': { "$all": [] } })
        .then(foundChamps => res.status(200).json(foundChamps))
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))


}

const randomChampAndItems = (req, res, next) => {
    let items = {}
    console.log('random items', req.user)
    DDragonService
        .getItemKeys()
        .then(randomKeys => {
            const images = randomKeys.map((e) => `http://ddragon.leagueoflegends.com/cdn/12.17.1/img/item/${e}.png`)
            items = images
            return DDragonService.getChampion()
        })
        .then(randomChamp => {
            const image = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${randomChamp}_0.jpg`
            const itemsAndChamp = { items, randomChamp, image }
            res.status(200).json(itemsAndChamp)
            // res.render('index/random', itemsAndChamp)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))

};

const weeklyRotation = (req, res, next) => {
    let champIDs
    apiRiotService
        .getWeeklyChampion()
        .then(ids => {
            champIDs = ids
            return DDragonService.getChampionInfo()
        })
        .then((champions) => {
            let champNames = getChampionId(champIDs, champions)
            const images = champNames.map((champName) => `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`)
            let nameAndImg = champNames.map((name, i) => {
                return { name, 'img': images[i] }
            })
            res.status(200).json(nameAndImg)
            // res.render("index/rotation", { nameAndImg });
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
    // .catch((err) => next(err));
};

const championDetails = (req, res, next) => {
    const { championName } = req.params
    ChampionsModel.findOne({ id: `${championName}` })
        // DDragonService
        //     .getDetailsChampions(championName)
        .then((championDetails) => {
            console.log(championDetails)

            const image = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`
            // let oneChampion = championDetails[championName]
            const { id, key, name, title, lore, allytips, enemytips, passive, stats, skins, tags } = championDetails

            // const stringStats = JSON.stringify(stats)

            let championData = { id, image, key, name, title, lore, allytips, enemytips, passive, stats, skins, tags }
            res.status(200).json(championData)
            // res.render("index/champion-details", championData)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
    // .catch((err) => next(err));
}

const allChamps = (req, res, next) => {
    ChampionsModel.find()
        .then(allChamps => res.status(200).json(allChamps))
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

module.exports = {
    champNameAndImg,
    searchChamps,
    randomChampAndItems,
    weeklyRotation,
    championDetails,
    allChamps
};