import * as cons from './constant';

export const Host = process.env.NEXT_PUBLIC_API_HOST;

// Cache handling.
var cache = []
async function getCache(url) {
    if (cache[url]) {
        return cache[url]
    }
    const result = await fetch(url)
    const data = await result.json()
    cache[url] = data
    return data
}

// Summary endpoints.

export async function getSummaryTotal() {
    return getCache(`${Host}/summary/total`)
}

export async function getSummaryYear() {
    return getCache(`${Host}/summary/year`)
}

// Search endpoints.

export async function getSearch(type, query, page = 1, limit = 20, advQuery) {
    if (type === cons.ANIME_TYPE || type === cons.MANGA_TYPE) {
        let baseQuery = `title=${query.trim()}&page=${page}&limit=${limit}`;

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
                baseQuery += `&producer=${advQuery.producer}`;
            }
            if (advQuery.magazine && advQuery.magazine > 0) {
                baseQuery += `&magazine=${advQuery.magazine}`;
            }

            var genreList = [];
            if (advQuery.genre && advQuery.genre.length > 0) {
                genreList = [...genreList, ...advQuery.genre];
            }
            if (advQuery.genre2 && advQuery.genre2.length > 0) {
                genreList = [...genreList, ...advQuery.genre2];
            }
            if (genreList.length > 0) {
                baseQuery += `&genre=${genreList.join()}`;
            }
        }

        return getCache(`${Host}/search/${type}?${baseQuery}`)
    } else if (type === cons.CHAR_TYPE || type === cons.PEOPLE_TYPE) {
        let baseQuery = `name=${query.trim()}&page=${page}&limit=${limit}`;

        if (advQuery) {
            if (advQuery.order && advQuery.order !== '' && advQuery.order !== '-') {
                baseQuery += `&order=${advQuery.order}`;
            }
        }

        return getCache(`${Host}/search/${type}?${baseQuery}`)
    } else {
        return getCache(`${Host}/search?query=${query.trim()}`)
    }
}

// Entry (anime, manga, character, people) endpoints.

export async function getEntryDetail(type, id) {
    return getCache(`${Host}/${type}/${id}`)
}

export async function getEntryStats(type, id) {
    return getCache(`${Host}/${type}/${id}/stats`)
}

export async function getEntryCharacters(type, id, page = 1, limit = 10) {
    return getCache(`${Host}/${type}/${id}/characters?page=${page}&limit=${limit}`)
}

export async function getEntryStaff(type, id, page = 1, limit = 10) {
    return getCache(`${Host}/${type}/${id}/staff?page=${page}&limit=${limit}`)
}

export async function getEntryOgraphy(type, id, oType, page = 1, limit = 10) {
    return getCache(`${Host}/${type}/${id}/${oType}?page=${page}&limit=${limit}`)
}

export async function getEntryVA(type, id, page = 1, limit = 10) {
    return getCache(`${Host}/${type}/${id}/va?page=${page}&limit=${limit}`)
}

export async function getEntryStatsHistory(type, id, page = 1, limit = 6) {
    return getCache(`${Host}/stats/history/${type}/${id}?page=${page}&limit=${limit}`)
}

// Producer/magazine endpoints.

export async function getProducers(type) {
    if (type === cons.ANIME_TYPE) {
        return getCache(`${Host}/producers`)
    } else {
        return getCache(`${Host}/magazines`)
    }
}

// Genre endpoints.

export async function getGenres(type) {
    return getCache(`${Host}/genres/${type}`)
}

// Re-parse endpoint.

export async function reparse(type, id) {
    const result = await fetch(`${Host}/enqueue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: type, id: parseInt(id) }),
    })
    return result.json()
}

// Score comparison endpoint.

export async function compareScore(query, order, page = 1, limit = 20) {
    return getCache(`${Host}/compare/score?title=${query}&order=${order}&page=${page}&limit=${limit}`)
}
