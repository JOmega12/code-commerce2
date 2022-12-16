import React from 'react';
import InputBase from '../../InputBase/InputBase';



class Register extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         user: this.props.UserState,
         users: this.props.UsersState,
         userTest: this.props.userTest
      }
   }

   //why do these error messages only show after i clicked off it? 
   render() {

      //functions
      const {handleInputData, handlePasswordVisibilityT, handlePasswordVisibilityF, passwordState,onBlurFunc} = this.props

      const inputData = [
         {label: 'Email', type: 'text', name: 'email', error: 'emailError'},
         {className: 'passwordInputType',label: 'Password', type: (passwordState ? 'text' : 'password'), name: 'password', error:'passwordError'},
         {label: 'Confirm Password', type: (passwordState ? 'text' : 'password'), name: 'cpassword', error:'confPasswordError'},
         {label: 'First Name', type: 'text', name: 'firstName', error:'firstNameError'},
         {label: 'Last Name', type: 'text', name: 'lastName', error: 'lastNameError'},
         {label: 'Zip Code', type: 'number', name: 'zipCode', error:'zipCodeError'},
      ]

      return (
         <form>
            {inputData.map((item) => (
            <InputBase
            placeholder= {item.label}
            type = {item.type}
            name = {item.name}
            value = {this.state.users && this.state.users[item.name]}
            onChange = {handleInputData}
            autoComplete = 'off'
            onBlur= {onBlurFunc}

            errorM = {
               (this.props.errorMState
               && this.props.errorMState[item.error]
               && this.props.errorMState[item.error].length > 1)
               ? this.props.errorMState[item.error]
               : null
            }
            />
         ))}
            <i className="bi bi-eye-slash registerPass" id="togglePassword" onClick={passwordState ? handlePasswordVisibilityF: handlePasswordVisibilityT}
            ></i>

            <div className='registerButton'>
            <InputBase type = 'submit' value='Register' onSubmit= {(e)=> this.props.onSubmitFunc(e)}/>
            </div>
         </form>
      )
   }
}

export default Register;