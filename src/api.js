import * as cons from './constant';

const Host = process.env.REACT_APP_API_HOST

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

export async function getMainTotal() {
    return getCache(`${Host}/summary/main-total`)
}

export async function getYearlyScore() {
    return getCache(`${Host}/summary/yearly-score`)
}

// Entry (anime, manga, character, people) endpoints.

export async function getEntryDetail(type, id) {
    return getCache(`${Host}/${type}/${id}`)
}

export async function getEntryStats(type, id) {
    return getCache(`${Host}/${type}/${id}/stats`)
}

export async function getEntryCharacters(type, id) {
    return getCache(`${Host}/${type}/${id}/characters`)
}

export async function getEntryStaff(type, id) {
    return getCache(`${Host}/${type}/${id}/staff`)
}

export async function getEntryAnime(type, id) {
    return getCache(`${Host}/${type}/${id}/anime`)
}

export async function getEntryManga(type, id) {
    return getCache(`${Host}/${type}/${id}/manga`)
}

export async function getEntryVA(type, id) {
    return getCache(`${Host}/${type}/${id}/va`)
}

// Seasonal anime endpoints.

export async function getSeasonalAnime(season, year) {
    return getCache(`${Host}/season?season=${season}&year=${year}`)
}

// Top list endpoints.

export async function getTopList(mainType, topType, page, season = '', year = 0) {
    return getCache(`${Host}/top/${mainType}?type=${topType}&page=${page}&season=${season}&year=${year}`)
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
        let baseQuery = `query=${query}&page=${page}`;

        if (advQuery) {
            if (advQuery.order && advQuery.order !== '' && advQuery.order !== '-') {
                baseQuery += `&order=${advQuery.order}`;
            }
        }

        return getCache(`${Host}/search/${type}?${baseQuery}`)
    } else {
        return getCache(`${Host}/search?query=${query}`)
    }
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

export async function getGenres() {
    return getCache(`${Host}/genres`)
}

// User endpoints.

export async function getUser(usernamme) {
    return getCache(`${Host}/user/${usernamme}`)
}

export async function getUserList(username, type) {
    if (type === cons.ANIME_TYPE) {
        return getCache(`${Host}/user/${username}/anime`)
    } else if (type === cons.MANGA_TYPE) {
        return getCache(`${Host}/user/${username}/manga`)
    }
}

export async function getUserStats(username) {
    return getCache(`${Host}/user/${username}/stats`)
}

export async function getUserScore(username) {
    return getCache(`${Host}/user/${username}/score`)
}

export async function getUserType(username) {
    return getCache(`${Host}/user/${username}/type`)
}

export async function getUserGenre(username) {
    return getCache(`${Host}/user/${username}/genre`)
}

export async function getUserStudioAuthor(username, type) {
    if (type === cons.ANIME_TYPE) {
        return getCache(`${Host}/user/${username}/studio`)
    } else if (type === cons.MANGA_TYPE) {
        return getCache(`${Host}/user/${username}/author`)
    }
}

export async function reparseUser(username) {
    const result = await fetch(`${Host}/user/${username}/enqueue`)
    return result.json()
}

// Re-parse endpoint.

export async function reparse(type, id) {
    const result = await fetch(`${Host}/enqueue?type=${type}&id=${id}`)
    return result.json()
}
