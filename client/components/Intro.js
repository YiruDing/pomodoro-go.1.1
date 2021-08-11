import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core';
import Typical from 'react-typical';

import TeamProfile from './TeamProfile';

const Intro = () => {
  return (
    <div id="intro-content">
      <div className="paper">
        <div className="lines">
          <div className="text">
            <Typical
              steps={[
                'Hello there 👋',
                3000,
                'Welcome to Pomodoro Go 🍅!',
                3000,
                'This is an app that helps boost your work effeciency by blocking time-sinking websites and bringing in your favorite music...come set the goal and hit the road!',
                3000,
              ]}
              loop={2}
              wrapper='h3'
            />
            <Typical
              steps={['Brought to you by these lovely folks 👉', 5000]}
              wrapper="p"
            />
            <Button variant='outlined' color='primary' target='_blank' rel='noreferrer' href='https://github.com/2101-Warriors/pomodoro-go'>
              Link to repo
            </Button>
          </div>
        </div>
        <div className='holes hole-top'></div>
        <div className='holes hole-middle'></div>
        <div className='holes hole-bottom'></div>
      </div>
      <TeamProfile />
    </div>
  );
};

export default Intro;
