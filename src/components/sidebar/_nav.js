import React from 'react';
import TheatersIcon from '@material-ui/icons/Theaters';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import GradeIcon from '@material-ui/icons/Grade';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
        link: '/search/anime',
      },
      {
        id: 2,
        name: 'Seasonal Anime',
        icon: <ListIcon />,
        link: '/anime/seasonal',
      },
      {
        id: 3,
        name: 'Top Anime',
        icon: <GradeIcon />,
        link: '/top/anime',
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
        name: 'Top Manga',
        icon: <GradeIcon />,
        link: '/top/manga',
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
      {
        id: 2,
        name: 'Top Character',
        icon: <GradeIcon />,
        link: '/top/character',
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
      {
        id: 2,
        name: 'Top People',
        icon: <GradeIcon />,
        link: '/top/people',
      },
    ],
  },
  {
    id: 5,
    name: 'User',
    icon: <PersonIcon />,
    subItems: [
      {
        id: 1,
        name: 'Profile',
        icon: <AccountBoxIcon />,
        link: '/user',
      },
    ],
  },
];