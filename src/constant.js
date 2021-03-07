// MyAnimeList web.
export const MAL_URL = 'https://myanimelist.net'

// Response code.
export const CODE_OK = 200

// Main types.
export const ANIME_TYPE = 'anime'
export const MANGA_TYPE = 'manga'
export const CHAR_TYPE = 'character'
export const PEOPLE_TYPE = 'people'
export const MAIN_TYPES = [ANIME_TYPE, MANGA_TYPE, CHAR_TYPE, PEOPLE_TYPE]

// Anime top list types.
export const ANIME_TOP_ALL = 0
export const ANIME_TOP_AIRING = 1
export const ANIME_TOP_UPCOMING = 2
export const ANIME_TOP_TV = 3
export const ANIME_TOP_MOVIE = 4
export const ANIME_TOP_OVA = 5
export const ANIME_TOP_ONA = 6
export const ANIME_TOP_SPECIAL = 7
export const ANIME_TOP_POPULAR = 8
export const ANIME_TOP_FAVORITE = 9

// Anime series types.
export const ANIME_TV_ID = 1
export const ANIME_OVA_ID = 2
export const ANIME_MOVIE_ID = 3
export const ANIME_SPECIAL_ID = 4
export const ANIME_ONA_ID = 5
export const ANIME_MUSIC_ID = 6
export const ANIME_TV = 'TV'
export const ANIME_OVA = 'OVA'
export const ANIME_MOVIE = 'Movie'
export const ANIME_SPECIAL = 'Special'
export const ANIME_ONA = 'ONA'
export const ANIME_MUSIC = 'Music'
export const ANIME_TYPES = [
  '?',
  ANIME_TV,
  ANIME_OVA,
  ANIME_MOVIE,
  ANIME_SPECIAL,
  ANIME_ONA,
  ANIME_MUSIC,
]

// Anime rating.
export const ANIME_RATING_G_ID = 1
export const ANIME_RATING_PG_ID = 2
export const ANIME_RATING_PG13_ID = 3
export const ANIME_RATING_R_ID = 4
export const ANIME_RATING_RP_ID = 5
export const ANIME_RATING_RX_ID = 6
export const ANIME_RATING_G = 'G - All Ages'
export const ANIME_RATING_PG = 'PG - Children'
export const ANIME_RATING_PG13 = 'PG-13 - Teens 13 or Older'
export const ANIME_RATING_R = 'R - 17+ (violence & profanity'
export const ANIME_RATING_RP = 'R+ - Mild Nudity'
export const ANIME_RATING_RX = 'Rx -  Hentai'
export const ANIME_RATINGS = [
  '?',
  ANIME_RATING_G,
  ANIME_RATING_PG,
  ANIME_RATING_PG13,
  ANIME_RATING_R,
  ANIME_RATING_RP,
  ANIME_RATING_RX,
]

// Anime status.
export const ANIME_STATUS_AIRING_ID = 1
export const ANIME_STATUS_FINISHED_ID = 2
export const ANIME_STATUS_NOT_ID = 3
export const ANIME_STATUS_AIRING = 'Currently Airing'
export const ANIME_STATUS_FINISHED = 'Finished Airing'
export const ANIME_STATUS_NOT = 'Not yet aired'
export const ANIME_STATUS = [
  '?',
  ANIME_STATUS_AIRING,
  ANIME_STATUS_FINISHED,
  ANIME_STATUS_NOT,
]

// Anime source.
export const ANIME_SOURCE_ORI_ID = 1
export const ANIME_SOURCE_MANGA_ID = 2
export const ANIME_SOURCE_4KOMA_ID = 3
export const ANIME_SOURCE_WEB_ID = 4
export const ANIME_SOURCE_DIGITAL_ID = 5
export const ANIME_SOURCE_NOVEL_ID = 6
export const ANIME_SOURCE_LIGHT_ID = 7
export const ANIME_SOURCE_VISUAL_ID = 8
export const ANIME_SOURCE_GAME_ID = 9
export const ANIME_SOURCE_CARD_ID = 10
export const ANIME_SOURCE_BOOK_ID = 11
export const ANIME_SOURCE_PICTURE_ID = 12
export const ANIME_SOURCE_RADIO_ID = 13
export const ANIME_SOURCE_MUSIC_ID = 14
export const ANIME_SOURCE_ORI = 'Original'
export const ANIME_SOURCE_MANGA = 'Manga'
export const ANIME_SOURCE_4KOMA = '4-koma Manga'
export const ANIME_SOURCE_WEB = 'Web Manga'
export const ANIME_SOURCE_DIGITAL = 'Digital Manga'
export const ANIME_SOURCE_NOVEL = 'Novel'
export const ANIME_SOURCE_LIGHT = 'Light Novel'
export const ANIME_SOURCE_VISUAL = 'Visual Novel'
export const ANIME_SOURCE_GAME = 'Game'
export const ANIME_SOURCE_CARD = 'Card Game'
export const ANIME_SOURCE_BOOK = 'Book'
export const ANIME_SOURCE_PICTURE = 'Picture Book'
export const ANIME_SOURCE_RADIO = 'Radio'
export const ANIME_SOURCE_MUSIC = 'Music'
export const ANIME_SOURCES = [
  '?',
  ANIME_SOURCE_ORI,
  ANIME_SOURCE_MANGA,
  ANIME_SOURCE_4KOMA,
  ANIME_SOURCE_WEB,
  ANIME_SOURCE_DIGITAL,
  ANIME_SOURCE_NOVEL,
  ANIME_SOURCE_LIGHT,
  ANIME_SOURCE_VISUAL,
  ANIME_SOURCE_GAME,
  ANIME_SOURCE_CARD,
  ANIME_SOURCE_BOOK,
  ANIME_SOURCE_PICTURE,
  ANIME_SOURCE_RADIO,
  ANIME_SOURCE_MUSIC,
]

// Anime season.
export const SEASON_WINTER = 'winter'
export const SEASON_SPRING = 'spring'
export const SEASON_SUMMER = 'summer'
export const SEASON_FALL = 'fall'
export const SEASONS = [SEASON_WINTER, SEASON_SPRING, SEASON_SUMMER, SEASON_FALL]

// Manga types.
export const MANGA_MANGA_ID = 1
export const MANGA_LIGHT_NOVEL_ID = 2
export const MANGA_ONESHOT_ID = 3
export const MANGA_DOUJINSHI_ID = 4
export const MANGA_MANHWA_ID = 5
export const MANGA_MANHUA_ID = 6
export const MANGA_OEL_ID = 7
export const MANGA_NOVEL_ID = 8
export const MANGA_MANGA = 'Manga'
export const MANGA_LIGHT_NOVEL = 'Light Novel'
export const MANGA_ONESHOT = 'One-shot'
export const MANGA_DOUJINSHI = 'Doujinshi'
export const MANGA_MANHWA = 'Manhwa'
export const MANGA_MANHUA = 'Manhua'
export const MANGA_OEL = 'OEL'
export const MANGA_NOVEL = 'Novel'
export const MANGA_TYPES = [
  '?',
  MANGA_MANGA,
  MANGA_LIGHT_NOVEL,
  MANGA_ONESHOT,
  MANGA_DOUJINSHI,
  MANGA_MANHWA,
  MANGA_MANHUA,
  MANGA_OEL,
  MANGA_NOVEL,
]

// Manga status.
export const MANGA_STATUS_PUBLISHING_ID = 1
export const MANGA_STATUS_FINISHED_ID = 2
export const MANGA_STATUS_NOT_ID = 3
export const MANGA_STATUS_HIATUS_ID = 4
export const MANGA_STATUS_DISCONTINUED_ID = 5
export const MANGA_STATUS_PUBLISHING = 'Publishing'
export const MANGA_STATUS_FINISHED = 'Finished'
export const MANGA_STATUS_NOT = 'Not yet published'
export const MANGA_STATUS_HIATUS = 'On Hiatus'
export const MANGA_STATUS_DISCONTINUED = 'Discontinued'
export const MANGA_STATUS = [
  '?',
  MANGA_STATUS_PUBLISHING,
  MANGA_STATUS_FINISHED,
  MANGA_STATUS_NOT,
  MANGA_STATUS_HIATUS,
  MANGA_STATUS_DISCONTINUED,
]

// User status.
export const ANIME_STATUS_WATCHING_ID = 1
export const ANIME_STATUS_COMPLETED_ID = 2
export const ANIME_STATUS_ONHOLD_ID = 3
export const ANIME_STATUS_DROPPED_ID = 4
export const ANIME_STATUS_PLANNED_ID = 6
export const ANIME_STATUS_WATCHING = 'Watching'
export const ANIME_STATUS_COMPLETED = 'Completed'
export const ANIME_STATUS_ONHOLD = 'On-hold'
export const ANIME_STATUS_DROPPED = 'Dropped'
export const ANIME_STATUS_PLANNED = 'Planned'
export const ANIME_USER_STATUS = [
  '?',
  ANIME_STATUS_WATCHING,
  ANIME_STATUS_COMPLETED,
  ANIME_STATUS_ONHOLD,
  ANIME_STATUS_DROPPED,
  '?',
  ANIME_STATUS_PLANNED,
]

export const MANGA_STATUS_READING_ID = 1
export const MANGA_STATUS_COMPLETED_ID = 2
export const MANGA_STATUS_ONHOLD_ID = 3
export const MANGA_STATUS_DROPPED_ID = 4
export const MANGA_STATUS_PLANNED_ID = 6
export const MANGA_STATUS_READING = 'Reading'
export const MANGA_STATUS_COMPLETED = 'Completed'
export const MANGA_STATUS_ONHOLD = 'On-hold'
export const MANGA_STATUS_DROPPED = 'Dropped'
export const MANGA_STATUS_PLANNED = 'Planned'
export const MANGA_USER_STATUS = [
  '?',
  MANGA_STATUS_READING,
  MANGA_STATUS_COMPLETED,
  MANGA_STATUS_ONHOLD,
  MANGA_STATUS_DROPPED,
  '?',
  MANGA_STATUS_PLANNED,
]

export const ORDERS = {
  [ANIME_TYPE]: {
    'member': 'Member asc',
    '-': 'Member desc',
    'title': "Title asc",
    '-title': "Title desc",
    'score': "Score asc",
    '-score': "Score desc",
  },
  [MANGA_TYPE]: {
    'member': 'Member asc',
    '-': 'Member desc',
    'title': "Title asc",
    '-title': "Title desc",
    'score': "Score asc",
    '-score': "Score desc",
  },
  [CHAR_TYPE]: {
    'favorite': 'Favorite asc',
    '-': 'Favorite desc',
    'name': "Name asc",
    '-name': "Name desc",
  },
  [PEOPLE_TYPE]: {
    'favorite': 'Favorite asc',
    '-': 'Favorite desc',
    'name': "Name asc",
    '-name': "Name desc",
  },
  'comparison': {
    'title': 'Title asc',
    '-title': 'Title desc',
    'score': 'Score asc',
    '-score': 'Score desc',
  }
};