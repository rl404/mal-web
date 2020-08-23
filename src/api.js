const Host = process.env.REACT_APP_API_HOST

export async function getMainTotal() {
    const result = await fetch(Host + `/summary/main-total`)
    return result.json()
}

export async function getYearlyScore() {
    const result = await fetch(Host + `/summary/yearly-score`)
    return result.json()
}

export async function getSeasonalAnime(season, year) {
    const result = await fetch(Host + `/season?season=` + season + `&year=` + year)
    return result.json()
}

export async function getEntryDetail(type, id) {
    const result = await fetch(Host + `/` + type + `/` + id)
    return result.json()
}

export async function getTopList(mainType, topType, page, season = "", year = 0) {
    const result = await fetch(Host + `/top/` + mainType + `?type=` + topType + `&page=` + page + `&season=` + season + `&year=` + year)
    return result.json()
}