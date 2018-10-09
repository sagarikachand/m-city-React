import React, { Component } from 'react'
import { firebaseMatches } from '../../../firebase';
import { FirebaseLopper } from '../../ui/misc';
import MatchesBlock from '../../ui/MatchesBlock';


class Blocks extends Component {

    state = {
        matches: []
    }
    componentDidMount() {
        firebaseMatches.limitToLast(6).once('value').then((snapshot => {
            const matches = FirebaseLopper(snapshot);
            console.log(matches)
            this.setState({ matches: matches.reverse() })
        }))
    }

    showMatches = (matches) => {
        if (matches) {
            return (
                matches.map((match,i) => {
                    return (
                        <div className="item" key={i}>
                            <div className="wrapper">
                                <MatchesBlock match={match} />
                            </div>
                        </div>
                    )

                })


            )
        } else {
            return null
        }


    }
    render() {

        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        )

    }

}

export default Blocks