function getOneChampion(champions) {
    const randomNum = (Math.floor(Math.random() * champions.length))
    const randomChamp = champions[randomNum]
    return randomChamp
}

module.exports = getOneChampion;

