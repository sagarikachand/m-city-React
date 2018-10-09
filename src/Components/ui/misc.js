import React from 'react'
import {Link} from 'react-router-dom'


export const Tag =(props) =>{
    
    const template = <div
           style={{
               background : props.bck,
               color: props.color ,
               fontSize: props.size,
               padding : '5px 10px',
               display: 'inline-block',
               fontFamily : 'Righteous',
               ...props.add

           }}
    >  
            {props.children}
        </div>


    if(props.link){
       return( <Link to={props.linkto}>
           {template}
        </Link>
       )
    }else{

        return template;
    }

}


export const FirebaseLopper =(snapshot) =>{
 let data=[];
 snapshot.forEach( (childSnapshot ) =>{
    data.push({
        ...childSnapshot.val() ,
        id: childSnapshot.key
    })
 })

 return data;
}


export const FieldValidator =(element) =>{
      
   let valid=[true,'']
    if(element.validation){

        if(element.validation.email){
            const isValid =  /\S+@\S+\.\S+/.test(element.value);;
            const mesg = `${ !isValid ? 'Must be a valid Email' : '' }`
            valid = !isValid ? [isValid , mesg] : valid
        }
        if(element.validation.required){
            const isValid = (element.value !== '')
            const mesg = `${ !isValid ? `Enter  ${element.label}` : '' }`
            valid = !isValid ? [isValid , mesg] : valid
        }

       
    }
       return valid
   }