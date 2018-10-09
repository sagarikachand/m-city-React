import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout'
import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../../firebase'
import { FirebaseLopper } from '../../ui/misc'


class AdminMatches extends Component {

    state = {
        isLoading: true,
        matches: []
    }

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot => {
            const matches = FirebaseLopper(snapshot);

            this.setState({
                isLoading: false,
                matches: matches.reverse()
            })
        })


    }


    render() {

        console.log(this.state.matches)
        return (
            <AdminLayout>
                <Paper>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell >Match</TableCell>
                                <TableCell >Result</TableCell>
                                <TableCell >Final</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.matches.map((match, i) => {
                                return (

                                    <TableRow key={i}>

                                        <TableCell>{match.date}</TableCell>

                                        <TableCell > <Link to={`/admin_matches/edit_match/${match.id}`} >
                                            {match.away} -{match.local}
                                        </Link>
                                        </TableCell>
                                        <TableCell >  {match.resultAway} -{match.resultLocal}</TableCell>
                                        <TableCell >
                                            {
                                                match.final === 'Yes' ?
                                               <span className="matches_tag_red">Final</span>  :
                                              <span className="matches_tag_green">Yet to be played</span>

                                           }
                                            
                                        </TableCell>
                                        
                                    </TableRow>

                                                        );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <div className="admin_progress">
                                                {this.state.isLoading ?
                                                    <CircularProgress style={{ color: '#98c5e9' }} thickness={7} /> :
                                                    null}
                                            </div>

                
            </AdminLayout>
                                        )
    }

};

export default AdminMatches;