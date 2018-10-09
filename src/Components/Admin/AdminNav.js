import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core'
import {firebase} from '../../firebase'




const AdminNav = (props) => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Player',
            linkTo: '/admin_players/add_player'
        },
    ]

    const style ={
        color:'#fff',
        fontWeight: '300',
       
        borderBottom:'1px solid #353535'
    }


    const renderItems = () => {
       return links.map((link, i) => {
            return (<Link key={i} to={link.linkTo}>
                <ListItem button style={style}>{link.title} </ListItem>
            </Link>)
        })
    }

    const Logout =() =>{
      firebase.auth().signOut();
    }
    return (
        <div>
            {renderItems()}
      
                <ListItem button style={style} onClick={Logout}>Log Out</ListItem>
     
        </div>

    )
}

export default AdminNav;