import React from 'react'



const FormField = ({ formElementdata, id, change }) => {


    const renderError = () => {
        let errorMesg = null;
        if (formElementdata.validation && !formElementdata.valid) {
            errorMesg = <div className="error_label">
                {formElementdata.validationMesg}
            </div>
        }

        return errorMesg
    }

    const renderTemplate = () => {
        let formTemplete = null;
        switch (formElementdata.element) {

            case 'input':
                formTemplete = <input {...formElementdata.config} value={formElementdata.value} onChange={(event) => change(event, id)} />
                break;

            case 'select':
                formTemplete = <select {...formElementdata.config} value={formElementdata.value} onChange={(event) => change(event, id)}>
                    <option value="" default>Select one</option>
                    {
                        formElementdata.config.options.map((item, i) => {
                            return <option key={item.key} value={item.key} disabled={item.disabled}> {item.value} </option>
                        })
                    } 
                                
                            </select>
          break;

            default :

            formTemplete =null
        }
         return formTemplete;
    }

    return (
        <div>
                        {formElementdata.showLabel ?
                            <div className="label_inputs   ">{formElementdata.label}</div> : null}
                        {renderTemplate()}
                        {renderError()}

                    </div>
                    )
}


export default FormField