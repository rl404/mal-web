const Host = process.env.REACT_APP_API_HOST

export async function getMainTotal() {
    const result = await fetch(Host + `/summary/main-total`)
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

export async function getTopList(mainType, topType, page) {
    const result = await fetch(Host + `/top/` + mainType + `?type=` + topType + `&page=` + page)
    return result.json()
}