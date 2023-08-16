import React from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { auth } from '../../firebase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const Header = () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{ boxShadow: 0}}>
                <Toolbar className='toolbar'>
                    <div>
                        <img src="images/twitter-icon.png" alt="" className='twitter-icon' />
                    </div>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'text.primary'}}/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="検索"
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{ borderRadius: 5, color: 'text.primary', border: 0.5}}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box >

    );
}

export default Header;