function getChampionId(arr, champions) {
    const champiosNames = []
    for (const property in champions) {
        arr.forEach((el) => {
            if (el == champions[property].key) {
                champiosNames.push(property)
            }
        })
    }
    return champiosNames

}

module.exports = getChampionId;