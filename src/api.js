import * as cons from './constant';

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

// Search endpoints.

export async function getSearch(type, query, page = 1, advQuery) {
    if (type === cons.ANIME_TYPE || type === cons.MANGA_TYPE) {
        let baseQuery = `title=${query}&page=${page}`;

        if (advQuery) {
            if (advQuery.score && advQuery.score > 0) {
                baseQuery += `&score=${advQuery.score}`;
            }
            if (advQuery.type && advQuery.type > 0) {
                baseQuery += `&type=${advQuery.type}`;
            }
            if (advQuery.status && advQuery.status > 0) {
                baseQuery += `&status=${advQuery.status}`;
            }
            if (advQuery.rating && advQuery.rating > 0) {
                baseQuery += `&rating=${advQuery.rating}`;
            }
            if (advQuery.source && advQuery.source > 0) {
                baseQuery += `&source=${advQuery.source}`;
            }
            if (advQuery.season && advQuery.season !== '' && advQuery.season !== '-') {
                baseQuery += `&season=${advQuery.season}`;
            }
            if (advQuery.year && advQuery.year.length === 4) {
                baseQuery += `&year=${advQuery.year}`;
            }
            if (advQuery.order && advQuery.order !== '' && advQuery.order !== '-') {
                baseQuery += `&order=${advQuery.order}`;
            }
            if (advQuery.producer && advQuery.producer > 0) {
                if (type === cons.ANIME_TYPE) {
                    baseQuery += `&producer=${advQuery.producer}`;
                } else {
                    baseQuery += `&magazine=${advQuery.producer}`;
                }
            }
        }

        const result = await fetch(`${Host}/search/${type}?${baseQuery}`)
        return result.json()
    } else if (type === cons.CHAR_TYPE || type === cons.PEOPLE_TYPE) {
        let baseQuery = `query=${query}&page=${page}`;

        if (advQuery) {
            if (advQuery.order && advQuery.order !== '' && advQuery.order !== '-') {
                baseQuery += `&order=${advQuery.order}`;
            }
        }

        const result = await fetch(`${Host}/search/${type}?${baseQuery}`)
        return result.json()
    } else {
        const result = await fetch(`${Host}/search?query=${query}`)
        return result.json()
    }
}

// Producer/magazine endpoints.

export async function getProducers(type) {
    if (type === cons.ANIME_TYPE) {
        const result = await fetch(`${Host}/producers`)
        return result.json()
    } else {
        const result = await fetch(`${Host}/magazines`)
        return result.json()
    }
}