const { Schema, model } = require('mongoose');

const championsSchema = new Schema(
    {
        key: { type: String },
        name: { type: String },
        title: { type: String },
        skins: [{ type: Number }],
        lore: { type: String },
        allytips: [{ type: String }],
        enemytips: [{ type: String }],
        tags: [{ type: String }],
        stats: {
            hp: { type: Number },
            hpperlevel: { type: Number },
            mp: { type: Number },
            mpperlevel: { type: Number },
            movespeed: { type: Number },
            armor: { type: Number },
            armorperlevel: { type: Number },
            spellblock: { type: Number },
            spellblockperlevel: { type: Number },
            attackrange: { type: Number },
            hpregen: { type: Number },
            hpregenperlevel: { type: Number },
            mpregen: { type: Number },
            mpregenperlevel: { type: Number },
            crit: { type: Number },
            critperlevel: { type: Number },
            attackdamage: { type: Number },
            attackdamageperlevel: { type: Number },
            attackspeedperlevel: { type: Number },
            attackspeed: { type: Number },
        }
    },

    {
        timestamps: true,
    }
)

const ChampionsModel = model('Champions', championsSchema);
module.exports = ChampionsModel
