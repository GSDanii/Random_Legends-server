const DDRAGONSERVICE = require('../services/ddragon.service')
const ChampionsModel = require('../models/Champions.model');




DDRAGONSERVICE
    .getDetailsChampions('Aatrox')
    .then(({ Aatrox }) => {
        const { key, name, title, skins, lore, allytips, enemytips, tags, stats } = Aatrox
        console.log(typeof key.toString())

        return ChampionsModel.insertMany(key, name, title, skins, lore, allytips, enemytips, tags, stats)
    })
    .then(() => console.log('todo ok'))
    .catch((err) => console.log(err))


