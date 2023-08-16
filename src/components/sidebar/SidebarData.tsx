import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';

export const SidebarData = [
    {
        title: "ホーム",
        icon: <HomeIcon />,
        link: "/home"
    },
    {
        title: "話題を検索",
        icon: <TagIcon />,
        link: "/tag",
    },
    {
        title: "通知",
        icon: <NotificationsNoneIcon />,
        link: "/notice",
    },
    {
        title: "メッセージ",
        icon: <AttachEmailIcon />,
        link: "/mail"
    },
    {
        title: "ブックマーク",
        icon: <BookmarkBorderIcon />,
        link: "/bookmark",
    },
    {
        title: "リスト",
        icon: <ListAltIcon />,
        link: "/list",
    },
    {
        title: "プロフィール",
        icon: <PersonIcon />,
        link: "/profile",
    },
]