import React, { Component } from 'react'

import { Tag } from '../ui/misc'
import FormField from '../ui/FormFields'
import { FieldValidator } from '../ui/misc'
import { firebase } from '../../firebase';




class SignIn extends Component {


    state = {
        formSuccess: '',
        formError: false,
        formdata: {
            email: {
                element: 'input',
                value: '',
                label: 'Email',
                config: {
                    name: "email_input",
                    type: 'email',
                    placeholder: "Enter your Email here"
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: true,
                touched: false,
                validationMesg: ''
            },
            password: {
                element: 'input',
                value: '',
                label:'Password',
                config: {
                    name: "password_input",
                    type: 'password',
                    placeholder: "Enter your password here"
                },
                validation: {
                    required: true,
                    
                },
                valid: true,
                touched: false,
                validationMesg: ''
            }
        }
    }

    onInputChange = (event, id) => {
        const newFormdata = { ...this.state.formdata }

        const newFormElement = { ...this.state.formdata[id] }
        console.log(event.target.value)
        console.log(id)

        newFormElement.value = event.target.value
        newFormElement.touched = true
        let validationResult = FieldValidator(newFormElement)
        newFormElement.valid = validationResult[0]
        newFormElement.validationMesg = validationResult[1]
        newFormdata[id] = newFormElement;
        this.setState({
            formdata: newFormdata
        })
    }

    handleFormSubmit =(event) =>{
        event.preventDefault();
     
        let dataToSubmit={}
        let formisValid= true;

        for(let key in this.state.formdata){
             dataToSubmit[key] = this.state.formdata[key].value 
             formisValid = this.state.formdata[key].valid && this.state.formdata[key].touched && formisValid 
        }

        if(formisValid){
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=>{
                this.props.history.push('/dashboard')
            }).catch(()=>{
                this.setState({
                    formError: true
                })
            })
           
                    
        }else{
              this.setState({
                  formError: true
              })
             
         }
        

    }



    render() {
        return (
            <div className="container">
            <div className="signIn_wrapper">
                <form noValidate onSubmit={this.handleFormSubmit}>
                    <h2> Please Login </h2>

                    <div className="signIn_input">
                        <FormField formElementdata={this.state.formdata['email']} id={'email'} change={(event, id) => this.onInputChange(event, id)} />
                       
                    </div>

                    <div className="signIn_input">
                        <FormField formElementdata={this.state.formdata['password']} id={'password'} change={(event, id) => this.onInputChange(event, id)} />
                    </div>
                   
                     <div className="error_label">{ this.state.formError ? 'Something is wrong .Try again': null}</div>
                
                    <button type="submit" onSubmit={this.handleFormSubmit}>Login </button>
              </form>
            </div>
            </div>
            
        )
    }


}

export default SignIn