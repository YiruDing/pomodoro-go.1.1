import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect, cloneElement } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import MainLogo from './MainLogo';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { HomeOutlined } from '@material-ui/icons';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { authenticateGoogle, logout } from '../store';

const headersData = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Block Sites',
    href: '/blocksites',
  },
  {
    label: 'Friends',
    href: '/friends',
  },
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'Sign up',
    href: '/signup',
  },
  {
    label: 'Logout',
    href: '/',
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#5061a9',
    paddingRight: '79px',
    paddingLeft: '118px',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  logo: {
    // fontFamily: 'Work Sans, sans-serif',
    // fontWeight: 600,
    color: '#ffffff',
    textAlign: 'left',
  },
  menuButton: {
    // fontFamily: 'Open Sans, sans-serif',
    // fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerContainer: {
    padding: '20px 30px',
  },
}));

export default connect(
  ({ auth }) => ({ auth }),
  (dispatch) => {
    return {
      getMe(data) {
        dispatch(authenticateGoogle(data));
      },
    };
  }
)(function Header(props) {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);
  const handleSuccess = (response) => {
    props.getMe(response);
  };
  const handleFail = (response) => {
    console.log('sign in failure', response);
  };
  const displayDesktop = () => {
    console.log(getMenuButtons());
    return (
      <Toolbar className={toolbar}>
        <MainLogo />
        <div>
          {getMenuButtons()}
          {!props.isLoggedIn ? <GoogleAuth getMe={props.getMe} /> : ''}
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <MainLogo />
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    const choices = headersData.map(({ label, href }) => {
      if (props.isLoggedIn) {
        if (label === 'Logout' && !['Login', 'Sign'].includes(label)) {
          return <MenuItem onClick={props.handleLogOut}>Logout</MenuItem>;
        } else if (!['Login', 'Sign'].includes(label)) {
          return (
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: 'inherit',
                style: { textDecoration: 'none' },
                key: label,
              }}
            >
              <MenuItem>{label}</MenuItem>
            </Link>
          );
        }
      } else {
        if (
          ![
            'Dashboard',
            'Home',
            'Block Sites',
            'Sign',
            'Friends',
            'Logout',
          ].includes(label)
        ) {
          return (
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: 'inherit',
                style: { textDecoration: 'none' },
                key: label,
              }}
            >
              <MenuItem>{label}</MenuItem>
            </Link>
          );
        }
      }
    });
    if (!props.isLoggedIn) {
      choices.unshift(
        <Link
          {...{
            component: RouterLink,
            to: '/',
            color: 'inherit',
            style: { textDecoration: 'none' },
            key: 'Home',
          }}
        >
          <MenuItem>Home</MenuItem>
        </Link>
      );
      choices.push(
        <GoogleLogin
          clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleSuccess}
          onFailure={handleFail}
          cookiePolicy={'single_host_origin'}
          isSignedIn={props.isLoggedIn}
          redirectUri={`${process.env.API_URL}/home`}
        />
      );
    }
    return choices;
  };
  const addIcons = (choices) => {
    return choices.map((navItem) => {
      if (navItem?.key === 'Home') {
        return cloneElement(
          navItem,
          [navItem.props],
          [<HomeOutlined style={{ color: '#e0e2e4', fontSize: 30 }} />, 'Home']
        );
      } else if (navItem?.key === 'Dashboard') {
        return cloneElement(
          navItem,
          [navItem.props],
          [
            <AssessmentIcon style={{ color: '#e0e2e4', fontSize: 30 }} />,
            'Dashboard',
          ]
        );
      } else if (navItem?.key === 'Block Sites') {
        return cloneElement(
          navItem,
          [navItem.props],
          [
            <DomainDisabledIcon style={{ color: '#e0e2e4', fontSize: 30 }} />,
            'Block Sites',
          ]
        );
      } else if (navItem?.key === 'Friends') {
        return cloneElement(
          navItem,
          [navItem.props],
          [
            <PeopleAltIcon style={{ color: '#e0e2e4', fontSize: 30 }} />,
            'Friends',
          ]
        );
      } else if (
        navItem?.key === 'Logout' ||
        navItem?.key === 'Login' ||
        navItem?.key === 'Sign up'
      ) {
        return navItem;
      }
    });
  };
  const getMenuButtons = () => {
    return addIcons(
      headersData.map(({ label, href }) => {
        if (props.isLoggedIn && label === 'Logout') {
          return (
            <Button
              {...{
                key: label,
                color: 'inherit',
                className: menuButton,
                onClick: props.handleLogOut,
                style: {
                  color: 'white',
                  fontSize: 15,
                },
              }}
            >
              {label}
            </Button>
          );
        } else if (
          props.isLoggedIn &&
          ['Home', 'Dashboard', 'Block Sites', 'Friends'].includes(label)
        )
          return (
            <IconButton
              {...{
                key: label,
                color: 'inherit',
                to: href,
                component: RouterLink,
                className: menuButton,
                edge: 'start',
                size: 'medium',
                style: {
                  color: 'white',
                  fontSize: 15,
                  flexDirection: 'column',
                },
              }}
            >
              {label}
            </IconButton>
          );
        else if (!props.isLoggedIn && ['Login', 'Sign up'].includes(label)) {
          return (
            <IconButton
              {...{
                key: label,
                color: 'inherit',
                to: href,
                component: RouterLink,
                className: menuButton,
                edge: 'start',
                size: 'medium',
                style: {
                  color: 'white',
                  fontSize: 15,
                  flexDirection: 'column',
                },
              }}
            >
              {label}
            </IconButton>
          );
        }
      })
    );
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
});
