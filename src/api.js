const Host = process.env.REACT_APP_API_HOST

// Summary endpoints.

export async function getMainTotal() {
    const result = await fetch(`${Host}/summary/main-total`)
    return result.json()
}

export async function getYearlyScore() {
    const result = await fetch(`${Host}/summary/yearly-score`)
    return result.json()
}

// Entry (anime, manga, character, people) endpoints.

export async function getEntryDetail(type, id) {
    const result = await fetch(`${Host}/${type}/${id}`)
    return result.json()
}

export async function getEntryStats(type, id) {
    const result = await fetch(`${Host}/${type}/${id}/stats`)
    return result.json()
}

export async function getEntryCharacters(type, id) {
    const result = await fetch(`${Host}/${type}/${id}/characters`)
    return result.json()
}

export async function getEntryStaff(type, id) {
    const result = await fetch(`${Host}/${type}/${id}/staff`)
    return result.json()
}

export async function getEntryAnime(type, id) {
    const result = await fetch(`${Host}/${type}/${id}/anime`)
    return result.json()
}

export async function getEntryManga(type, id) {
    const result = await fetch(`${Host}/${type}/${id}/manga`)
    return result.json()
}

export async function getEntryVA(type, id) {
    const result = await fetch(`${Host}/${type}/${id}/va`)
    return result.json()
}

// Seasonal anime endpoints.

export async function getSeasonalAnime(season, year) {
    const result = await fetch(`${Host}/season?season=${season}&year=${year}`)
    return result.json()
}

// Top list endpoints.

export async function getTopList(mainType, topType, page, season = '', year = 0) {
    const result = await fetch(`${Host}/top/${mainType}?type=${topType}&page=${page}&season=${season}&year=${year}`)
    return result.json()
}