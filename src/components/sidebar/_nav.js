import React from 'react';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';

export default [
  {
    id: 1,
    name: 'Anime',
    icon: <TheatersIcon />,
    subItems: [
      {
        id: 1,
        name: 'Anime Search',
        icon: <SearchIcon />,
        link: '/search/anime'
      },
      {
        id: 2,
        name: 'Seasonal Anime',
        icon: <ListIcon />,
        link: '/anime/seasonal'
      }
    ]
  },
  {
    id: 2,
    name: 'Manga',
    icon: <MenuBookIcon />,
    subItems: [
      {
        id: 1,
        name: 'Manga Search',
        icon: <SearchIcon />,
        link: '/search/manga'
      }
    ]
  }
];