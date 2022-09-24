function getRandomKeys(itemFilter) {

    let randomKeys = []
    for (let i = 0; i < 6; i++) {
        const randomNum = (Math.floor(Math.random() * itemFilter.length))
        const index = itemFilter[randomNum]
        randomKeys.push(index)
    }
    return randomKeys
}

module.exports = getRandomKeys;