const filterMatches = (matches) => {

    const infoMatch = matches.map(match => {
        let totalAssists100 = 0
        let totalAssists200 = 0
        let totalDeaths100 = 0
        let totalDeaths200 = 0

        const { info } = match
        const { gameMode, participants, teams } = info

        const playersData = participants.map(player => {
            const { assists, challenges, championName, deaths, kills, totalDamageDealtToChampions, totalDamageTaken, summonerName } = player
            const { kda } = challenges

            player.teamId === 100
                ? totalAssists100 += assists
                : totalAssists200 += assists

            player.teamId === 100
                ? totalDeaths100 += deaths
                : totalDeaths200 += deaths

            return {
                summonerName,
                championName,
                kda: kda.toFixed(2),
                kills,
                assists,
                deaths,
                totalDamageDealtToChampions,
                totalDamageTaken
            }
        })
        const teamsData = teams.map(team => {
            const { objectives, teamId, win } = team
            const { champion: asesinatos, inhibitor, tower } = objectives
            const { kills } = asesinatos
            const { kills: nInhibitors } = inhibitor
            const { kills: nTowers } = tower
            let teamAssists
            let teamDeadths

            team.teamId === 100
                ? teamAssists = totalAssists100
                : teamAssists = totalAssists200

            team.teamId === 100
                ? teamDeadths = totalDeaths100
                : teamDeadths = totalDeaths200

            return {
                teamId,
                win,
                teamKills: kills,
                teamDeadths,
                teamAssists,
                inhibitor: nInhibitors,
                tower: nTowers
            }
        })

        return { gameMode, teamsData, playersData }
    })
    return infoMatch
}

module.exports = filterMatches;