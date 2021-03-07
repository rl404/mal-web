import React from 'react';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

const navigation = [
  {
    id: 1,
    name: 'Anime',
    icon: <TheatersIcon />,
    subItems: [
      {
        id: 1,
        name: 'Anime Search',
        icon: <SearchIcon />,
        link: '/search/anime',
      },
    ],
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
        link: '/search/manga',
      },
      {
        id: 2,
        name: 'Score Comparison',
        icon: <CompareArrowsIcon />,
        link: '/compare/score',
      },
    ],
  },
  {
    id: 3,
    name: 'Character',
    icon: <PersonIcon />,
    subItems: [
      {
        id: 1,
        name: 'Character Search',
        icon: <SearchIcon />,
        link: '/search/character',
      },
    ],
  },
  {
    id: 4,
    name: 'People',
    icon: <PersonIcon />,
    subItems: [
      {
        id: 1,
        name: 'People Search',
        icon: <SearchIcon />,
        link: '/search/people',
      },
    ],
  },
];

export default navigation;