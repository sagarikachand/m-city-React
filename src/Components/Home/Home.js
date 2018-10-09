import React , { Component } from 'react'

import Featured from './Featured/Featured'
import Matches from './Matches/Matches'
import MeetPlayers from './MeetPlayers/MeetPlayers'
import Promotion from './Promotions/Promotion';

class Home extends Component {

    render(){

        return (
        <div style={{minWidth : '1280px'}}> 
          <Featured />
          <Matches />
          <MeetPlayers />
          <Promotion />
         </div>
        )
    }
}

export default Home;