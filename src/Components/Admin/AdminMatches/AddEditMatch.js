import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout'
import FormField from '../../ui/FormFields'
import { FieldValidator } from '../../ui/misc'
import { firebaseMatches, firebaseDB, firebaseTeams } from '../../../firebase'
import { FirebaseLopper } from '../../ui/misc'



const FORMEDIT="Edit Match";
const FORMADD ="Add Match"
class AddEditMatch extends Component {

    state = {
        formType: '',
        matchId: '',
        formError: false,
        formSuccess: '',
        formdata: {
            date: {
                element: 'input',
                value: '',
                label: 'Event Date',
                config: {
                    name: "date_input",
                    type: 'date',
                    placeholder: ""
                },
                validation: {
                    required: true,

                },
                valid: true,
                touched: false,
                validationMesg: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                label: 'Select a local team',
                config: {
                    name: "select_local_input",
                    type: 'select',
                    placeholder: "",
                    options: []
                },
                validation: {
                    required: true,

                },
                valid: true,
                touched: false,
                validationMesg: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '-',
                label: 'Result local',
                config: {

                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: true,
                validationMessage: '',
                touched: false,
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                label: 'Select a away team',
                config: {

                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '-',
                label: 'Result Away',
                config: {

                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: true,
                validationMessage: '',
                touched: false,
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                label: 'Referee',
                config: {

                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: true,
                validationMessage: '',
                touched: false,
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                label: 'Stadium',
                config: {

                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                label: 'Team result',
                config: {

                    name: 'select_result',
                    type: 'select',
                    options: [
                        { key: 'W', value: 'W' },
                        { key: 'L', value: 'L' },
                        { key: 'D', value: 'D' },
                        { key: 'n/a', value: 'n/a' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                label: 'Game played ?',
                config: {

                    name: 'select_played',
                    type: 'select',
                    options: [
                        { key: 'Yes', value: 'Yes' },
                        { key: 'No', value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        },
        teamOptions: []
    }


    componentDidMount() {
        const matchId = this.props.match.params.id
        // console.log(matchId)

        const getTeams = (match, type) => {
            firebaseTeams.once('value').then(snapshot => {
                const teams = FirebaseLopper(snapshot);
                // console.log(teams)
                let teamOptions = [];
                teamOptions = teams.map((team) => {
                    return ({
                        key: team.shortName,
                        value: team.shortName,
                        disabled: false
                    })
                })
                // console.log(teamOptions)
                
                    this.populateForm(match, teamOptions, teams, type, matchId)
            })
        }

        if (!matchId) {
            //Fetch data for teams
            getTeams(null, FORMADD)

        } else {
            //fetch all data
            firebaseDB.ref(`matches/${matchId}`).once('value')
                .then((snapshot) => {
                    let match = snapshot.val();
                    getTeams(match, FORMEDIT)
                })
        }
    }
    populateForm = (match, teamOptions, teams, type, matchId) => {
        const newFormdata = {
            ...this.state.formdata,
        }

        for (let key in newFormdata) {
            if (match) {
                newFormdata[key].value = match[key]
                newFormdata[key].valid = true
                newFormdata[key].touched = false

            }
            if (key == 'local' || key == 'away') {
                const newTeamOption = this.setTeamOptions(newFormdata, teamOptions)
                newFormdata['local'].config.options = newTeamOption
                newFormdata['away'].config.options = newTeamOption
            }
        }
        console.log(newFormdata)
        this.setState({
            matchId,
            formType: type,
            formdata: newFormdata,
            teamOptions: teamOptions,
            teams
        })

    }

    setTeamOptions = (newFormdata, teamOptions) => {
        teamOptions.map((option) => {
            option.disabled = false;
            if (option.value == newFormdata['local'].value || option.value == newFormdata['away'].value) {
                option.disabled = true
            }

        })

        return teamOptions
    }
    onInputChange = (event, id) => {
        const newFormdata = { ...this.state.formdata }
        const newFormElement = { ...this.state.formdata[id] }

        newFormElement.value = event.target.value
        newFormElement.touched = true
        let validationResult = FieldValidator(newFormElement)
        newFormElement.valid = validationResult[0]
        newFormElement.validationMesg = validationResult[1]
        newFormdata[id] = newFormElement;
        if (id == 'local' || id == 'away') {
            const newTeamOption = this.setTeamOptions(newFormdata, this.state.teamOptions)
            newFormdata['local'].config.options = newTeamOption
            newFormdata['away'].config.options = newTeamOption
        }

        console.log(newFormdata)
        this.setState({
            formdata: newFormdata,

        })
    }

    setformSuccess = () => {
        this.setState({
            formSuccess: 'Updated Succesfully',
            formError: false
        })
        this.resetSuccess()
    }

    resetSuccess = () => {
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        }, 2000);
    }
    handelFormSubmit = (event) => {
        event.preventDefault();

        let dataToSubmit = {}
        let formisValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value
            formisValid = this.state.formdata[key].valid && formisValid
        }
        console.log(dataToSubmit)
        if (formisValid) {
            
            this.state.teams.map((team) => {
                if (dataToSubmit.local == team.shortName) {
                    dataToSubmit['localThmb'] = team.thmb
                }
                if (dataToSubmit.away == team.shortName) {
                    dataToSubmit['awayThmb'] = team.thmb
                }
            })
            console.log(this.state.formType)
            if (this.state.formType == FORMEDIT) {
                firebaseDB.ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit).then((response) => {
                        this.setformSuccess();
                    }).catch((e) => {
                        this.setState({
                            formError: true
                        })
                    })
            } else {
                firebaseMatches.push(dataToSubmit).then( () =>{
                    this.props.history.push('/admin_matches')
                }).catch(()=>{
                    console.log('not edit')
                    this.setState({
                        formError: true
                    })
        
                });
              
            }


        } else {
            console.log('error')
            this.setState({
                formError: true
            })

        }


    }
    render() {

        return (
            <AdminLayout>
                <div className="edit_match_wrapper">
                    <h2>{this.state.formType} </h2>
                    <div>
                        <form onSubmit={(event) => this.handelFormSubmit(event)}>
                            <FormField formElementdata={this.state.formdata['date']} id={'date'} change={(event, id) => this.onInputChange(event, id)} />
                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'local'}
                                            formElementdata={this.state.formdata.local}
                                            change={(event, id) => this.onInputChange(event, id)}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={'resultLocal'}
                                            formElementdata={this.state.formdata.resultLocal}
                                            change={(event, id) => this.onInputChange(event, id)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'away'}
                                            formElementdata={this.state.formdata.away}
                                            change={(event, id) => this.onInputChange(event, id)}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            id={'resultAway'}
                                            formElementdata={this.state.formdata.resultAway}
                                            change={(event, id) => this.onInputChange(event, id)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'referee'}
                                    formElementdata={this.state.formdata.referee}
                                    change={(event, id) => this.onInputChange(event, id)}
                                />

                                <FormField
                                    id={'stadium'}
                                    formElementdata={this.state.formdata.stadium}
                                    change={(event, id) => this.onInputChange(event, id)}
                                />
                            </div>

                            <div className="split_fields last">
                                <FormField
                                    id={'result'}
                                    formElementdata={this.state.formdata.result}
                                    change={(event, id) => this.onInputChange(event, id)}
                                />

                                <FormField
                                    id={'final'}
                                    formElementdata={this.state.formdata.final}
                                    change={(event, id) => this.onInputChange(event, id)}
                                />

                            </div>

                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                : ''
                            }
                            <div className="admin_submit">
                                <button onClick={(event) => this.handelFormSubmit(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        )
    }



}

export default AddEditMatch