import React, { Component } from 'react'
import PromotionAnimation from './PromotionAnimation'
import { Tag } from '../../ui/misc'
import FormField from '../../ui/FormFields'
import { FieldValidator } from '../../ui/misc'
import {firebasePromotions} from '../../../firebase'
class Enroll extends Component {


    state = {
        formSuccess: '',
        formError: false,
        formdata: {
            email: {
                element: 'input',
                value: '',
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
            console.log("form is valid")
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
             .then(
                 ( snapshot ) =>{
                     if(snapshot.val() == null){
                        firebasePromotions.push(dataToSubmit);
                        this.resetFormSuccess(true)
                     }else{
                        this.resetFormSuccess(false)
                     }
                 }
             )
        
        }else{
              this.setState({
                  formError: true
              })
             
         }
        

    }

    resetFormSuccess   =(type) =>{
        let  newFormdata={...this.state.formdata}

        for(let key in newFormdata){
            newFormdata[key].value =''
            newFormdata[key].valid =true
            newFormdata[key].touched =false
            newFormdata[key].validationMesg= ''

        }
        this.setState({
            formdata : newFormdata,
            formError : false ,
            formSuccess: type ? 'Congratulations' : 'Email already listed'
        })
        this.removeFormSuccessMesg()
    }
    removeFormSuccessMesg =() =>{
      setTimeout(() => {
          this.setState({formSuccess : ''})
      }, 2000);
    }


    render() {
        return (
            <div className="enroll_wrapper">
                <form noValidate onSubmit={this.handleFormSubmit}>
                    <div className="enroll_title"> Enter your email </div>

                    <div className="enroll_input">
                        <FormField formElementdata={this.state.formdata['email']} id={'email'} change={(event, id) => this.onInputChange(event, id)} />
                    </div>
                     <div className="error_label">{ this.state.formError ? 'Something is wrong .Try again': null}</div>
                     <div className="success_label">{this.state.formSuccess}</div>
                    <button type="submit" onSubmit={this.handleFormSubmit}>Enroll </button>
              </form>
            </div>
        )
    }


}

export default Enroll