import React from 'react';

const Home = React.lazy(() => import('./views/home'));
const AnimeDetails = React.lazy(() => import('./views/anime/details'));
const AnimeSeasonal = React.lazy(() => import('./views/anime/seasonal'));
const MangaDetails = React.lazy(() => import('./views/manga/details'));
const CharacterDetails = React.lazy(() => import('./views/character/details'));
const PeopleDetails = React.lazy(() => import('./views/people/details'));
const Search = React.lazy(() => import('./views/search'));
const Top = React.lazy(() => import('./views/top'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/anime/seasonal', exact: true, name: 'Anime Seasonal', component: AnimeSeasonal },
  { path: '/anime/:id/:title?', exact: true, name: 'Anime Details', component: AnimeDetails },
  { path: '/manga/:id/:title?', exact: true, name: 'Manga Details', component: MangaDetails },
  { path: '/character/:id/:name?', exact: true, name: 'Character Details', component: CharacterDetails },
  { path: '/people/:id/:name?', exact: true, name: 'People Details', component: PeopleDetails },
  { path: '/search/:type', exact: true, name: 'Search', component: Search },
  { path: '/top/:type', exact: true, name: 'Top List', component: Top },
];

export default routes;
