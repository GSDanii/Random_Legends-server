require("dotenv/config");
const DDRAGONSERVICE = require('../services/ddragon.service')
const ChampionsModel = require('../models/Champions.model');

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI




mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`);

        return DDRAGONSERVICE.getAllChampions()
    })
    .then((championsNames) => Promise.all(championsNames.map(championName => {

        return DDRAGONSERVICE.getDetailsChampions(`${championName}`)
    })))

        })

    .then((champions) => {

        const allChampionsDb = []

        champions.forEach(champ => {
            allChampionsDb.push(...Object.values(champ))
        })

        const newArr = allChampionsDb.map(champ => {
            const { key, name, title, skins, lore, allytips, enemytips, tags, stats } = champ
            let numSkins = skins.map(skin => skin.num)
            return { key, name, title, skins: numSkins, lore, allytips, enemytips, tags, stats }

        })

        console.log(newArr)

        return ChampionsModel.insertMany(newArr)
    })

    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    })

    .finally(() => {
        mongoose.disconnect()
    })





//   [{
//     Rakan: {
//       id: 'Rakan',
//       key: '497',
//       name: 'Rakan',
//       title: 'The Charmer',
//       image: [Object],
//       skins: [Array],
//       lore: 'As mercurial as he is charming, Rakan is an infamous vastayan troublemaker and the greatest battle-dancer in Lhotlan tribal history. To the humans of the Ionian highlands, his name has long been synonymous with wild festivals, uncontrollable parties, and anarchic music. Few would suspect this energetic, traveling showman is also partner to the rebel Xayah, and is dedicated to her cause.',
//       blurb: 'As mercurial as he is charming, Rakan is an infamous vastayan troublemaker and the greatest battle-dancer in Lhotlan tribal history. To the humans of the Ionian highlands, his name has long been synonymous with wild festivals, uncontrollable parties...',
//       allytips: [Array],
//       enemytips: [Array],
//       tags: [Array],
//       partype: 'Mana',
//       info: [Object],
//       stats: [Object],
//       spells: [Array],
//       passive: [Object],
//       recommended: []
//     }
//   },
//   {
//     Rammus: {
//       id: 'Rammus',
//       key: '33',
//       name: 'Rammus',
//       title: 'the Armordillo',
//       image: [Object],
//       skins: [Array],
//       lore: 'Idolized by many, dismissed by some, mystifying to all, the curious being Rammus is an enigma. Protected by a spiked shell, he inspires increasingly disparate theories on his origin wherever he goes—from demigod, to sacred oracle, to a mere beast transformed by magic. Whatever the truth may be, Rammus keeps his own counsel and stops for no one as he roams the Shuriman desert.',
//       blurb: 'Idolized by many, dismissed by some, mystifying to all, the curious being Rammus is an enigma. Protected by a spiked shell, he inspires increasingly disparate theories on his origin wherever he goes—from demigod, to sacred oracle, to a mere beast...',
//       allytips: [Array],
//       enemytips: [Array],
//       tags: [Array],
//       partype: 'Mana',
//       info: [Object],
//       stats: [Object],
//       spells: [Array],
//       passive: [Object],
//       recommended: []
//     }
//   },
//   {
//     RekSai: {
//       id: 'RekSai',
//       key: '421',
//       name: "Rek'Sai",
//       title: 'the Void Burrower',
//       image: [Object],
//       skins: [Array],
//       lore: "An apex predator, Rek'Sai is a merciless Void-spawn that tunnels beneath the ground to ambush and devour unsuspecting prey. Her insatiable hunger has laid waste to entire regions of the once-great empire of Shurima—merchants, traders, even armed caravans, will go hundreds of miles out of their way to avoid her and her offspring's hunting grounds. All know that once Rek'Sai is seen on the horizon, death from below is all but guaranteed.",
//       blurb: "An apex predator, Rek'Sai is a merciless Void-spawn that tunnels beneath the ground to ambush and devour unsuspecting prey. Her insatiable hunger has laid waste to entire regions of the once-great empire of Shurima—merchants, traders, even armed...",
//       allytips: [Array],
//       enemytips: [Array],
//       tags: [Array],
//       partype: 'Rage',
//       info: [Object],
//       stats: [Object],
//       spells: [Array],
//       passive: [Object],
//       recommended: []
//     }
//   }]