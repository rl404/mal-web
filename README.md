<p align=center>
    <img src="https://raw.githubusercontent.com/rl404/mal-web/master/public/images/logo.svg" width='50%'>
</p>

*MyAnimeList Drive-Thru* or *MAL-DT* is a website where you can quick look at [MyAnimeList](https://myanimelist.net)'s contents (anime, manga, character, and voice actor). That's why it's called *drive-thru*.

Powered by my [go-malscraper](https://github.com/rl404/go-malscraper) as backend. Using at least version `v0.13.0` for the backend.

Yes, everything is open-source and you can host both the backend and frontend by yourself.

## Feature

- Simple dashboard (total entries count and graph)
- Simple and modern style
- Details for every entries (anime, manga, character, and voice actor/staff)
- Entries search
- Seasonal anime list
- Top list

## Development

### Requirement

- [NodeJS](https://nodejs.org)
- [Backend service](https://github.com/rl404/go-malscraper)
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
    If using Docker, let's build and start the container. Then skip to step 6.
    ```
    docker-compose up
    ```
5. Start.
    ```
    npm start
    ```
6. [http://localhost:3001](http://localhost:3001) is ready*.

**Port depends on `PORT` in `.env` file.*

## Disclamer

_myanimelist drive-thru_ is meant for educational purpose and personal usage only. Use it responsibly according to MyAnimeList's [Terms Of Service](https://myanimelist.net/about/terms_of_use).

All data (including anime, manga, people, etc) and MyAnimeList logos belong to their respective copyrights owners. *myanimelist drive-thru* does not have any affiliation with content providers.

## License

MIT License

Copyright (c) 2020 Axel