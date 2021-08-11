import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  largeClicked: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    position: 'relative',
    top: '-30px',
    left: '-10px',
    border: '3px solid black',
    boxShadow: '7px 7px black'
  }
}));

const TeamProfile = (props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState({
    russel: true,
    ding: false,
    stephan: false,
    felicity: false
  });

  const toggle = (ev) => {
    const name = ev.target.alt;
    if (expanded[name] === true) {
      setExpanded({...expanded, [ev.target.alt]: false});
    } else {
      setExpanded({...expanded, [ev.target.alt]: true});
    }
  };

  return (
    <div id='profile-group'>
      <div id='profile-expand'>
        {expanded.russel === true && (
          <div className='each-profile'>
            <div className='dev-name'>
              Russel
              <br />
              McMillan
            </div>
            <div className='links'>
              <a target='_blank' rel='noreferrer' href='https://github.com/rfmcmillan'>
                <GitHubIcon />
              </a>
              <LinkedInIcon />
              <EmailIcon />
            </div>
          </div>
        )}
        {expanded.ding === true && (
          <div className='each-profile'>
            <div className='dev-name'>
              Yiru
              <br />
              Ding
            </div>
            <div className='links'>
              <a target='_blank' rel='noreferrer' href='https://github.com/YiruDing'>
                <GitHubIcon />
              </a>
              <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/yiru-ding/'>
                <LinkedInIcon />
              </a>
              <a href=''>
                <EmailIcon />
              </a>
            </div>
          </div>
        )}
        {expanded.stephan === true && (
          <div className='each-profile'>
            <div className='dev-name'>
              Stephan
              <br />
              Alas
            </div>
            <div className='links'>
              <a target='_blank' rel='noreferrer' href='https://github.com/stephanalas'>
                <GitHubIcon />
              </a>
              <LinkedInIcon />
              <EmailIcon />
            </div>
          </div>
        )}
        {expanded.felicity === true && (
          <div className='each-profile'>
            <div className='dev-name'>
              Felicity
              <br />
              Wu
            </div>
            <div className='links'>
              <a target='_blank' rel='noreferrer' href='https://github.com/felicityandherdragon'>
                <GitHubIcon />
              </a>
              <LinkedInIcon />
              <EmailIcon />
            </div>
          </div>
        )}
      </div>
      <AvatarGroup max={5} id='avatars'>
        <Avatar alt='russel' src="https://ca.slack-edge.com/T024FPYBQ-U01K4T2GC7J-729e221b6004-512" className={expanded.russel === true ? classes.largeClicked : classes.large} onClick={toggle}/>
        <Avatar alt='ding' src="https://ca.slack-edge.com/T024FPYBQ-U01J88VDNSJ-bf4326c217e1-512" className={expanded.ding === true ? classes.largeClicked : classes.large} onClick={toggle}/>
        <Avatar alt='stephan' src="https://ca.slack-edge.com/T024FPYBQ-U01JF29P57C-c12ee469d629-512" className={expanded.stephan === true ? classes.largeClicked : classes.large} onClick={toggle}/>
        <Avatar alt='felicity' src="https://ca.slack-edge.com/T024FPYBQ-U01JF8BDK35-fc70b3a47007-512" className={expanded.felicity === true ? classes.largeClicked : classes.large} onClick={toggle}/>
      </AvatarGroup>
    </div>
  );
};

export default TeamProfile;
