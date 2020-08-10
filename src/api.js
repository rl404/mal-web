const Host = process.env.REACT_APP_API_HOST
const Host2 = process.env.REACT_APP_API_HOST2

export async function getSeasonalAnime(season, year) {
    const result = await fetch(Host + `/season?season=` + season + `&year=` + year)
    return result.json()
}

export async function getEntryDetail(type, id) {
    const result = await fetch(Host2 + `/` + type + `/` + id)
    return result.json()
}

export async function getTopList(mainType, topType, page) {
    const result = await fetch(Host + `/top/` + mainType + `?type=` + topType + `&page=` + page)
    return result.json()
}