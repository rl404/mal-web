<p align=center>
    <img src="https://raw.githubusercontent.com/rl404/mal-web/master/public/images/logo.svg" width='50%'>
</p>

*MyAnimeList Drive-Thru* or *MAL-DT* is a website where you can quick look at [MyAnimeList](https://myanimelist.net)'s contents (anime, manga, character, and voice actor). That's why it's called *drive-thru*.

Powered by my [mal-db](https://github.com/rl404/mal-db) as backend.

Yes, everything is open-source and you can host both the backend and frontend by yourself.

## Feature

- Simple dashboard (total entries count and graph)
- Simple and modern UI style
- Details for every entries (anime, manga, character, and voice actor/staff)
- Anime, manga, character, and voice actor/staff search

## Development

### Requirement

- [NodeJS](https://nodejs.org)
- [Backend service](https://github.com/rl404/mal-db)
- [Docker](https://docker.com) + [Docker compose](https://docs.docker.com/compose/) (optional)

### Step

1. Clone the repo.
    ```
    git clone https://github.com/rl404/mal-web
    ```
2. Go inside the folder.
    ```
    cd mal-web
    ```
3. Modify `.env` file.
4. Install dependecies.
    ```
    npm ci
    ```
5. Start.
    ```
    npm run dev
    ```
6. [http://localhost:3000](http://localhost:3000) is ready.

## Disclamer

_myanimelist drive-thru_ is meant for educational purpose and personal usage only. Use it responsibly according to MyAnimeList's [Terms Of Service](https://myanimelist.net/about/terms_of_use).

All data (including anime, manga, people, etc) and MyAnimeList logos belong to their respective copyrights owners. *myanimelist drive-thru* does not have any affiliation with content providers.

## License

MIT License

Copyright (c) 2020 Axel