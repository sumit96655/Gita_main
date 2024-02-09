import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {RiRobot2Line} from 'react-icons/ri';
import {TiMessages} from 'react-icons/ti';
import {IoSearchSharp} from 'react-icons/io5';
import { GrChapterAdd } from "react-icons/gr";
import {CiSignpostDuo1} from 'react-icons/ci';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'ChatBot',
    path: '/home',
    icon: <RiRobot2Line />,
    cName: 'nav-text'
  },
  {
    title: 'Discussion Forum',
    path: '/DiscussionForum',
    icon: <TiMessages />,
    cName: 'nav-text'
  },
  {
    title: 'Chapter Summary',
    path: '/reports',
    icon: <GrChapterAdd />,
    cName: 'nav-text'
  },
  {
    title: 'Search Verse',
    path: '/SearchVerse',
    icon: <IoSearchSharp />,
    cName: 'nav-text'
  },
  {
    title: 'Daily Verse',
    path: '/DailyVerse',
    icon: <CiSignpostDuo1 />,
    cName: 'nav-text'
  },
  
];