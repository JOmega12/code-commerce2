import React from 'react';
import InputBase from '../../InputBase/InputBase';


class Login extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         user: this.props.UserState,
         users: this.props.UsersState,
         userTest: this.props.userTest,
      }
   }

   submitRegister = (e) => {
      e.preventDefault(e);
      this.props.onSubmitFunc()
   }
   


   render() {

      const {handleInputData, handlePasswordVisibilityT,handlePasswordVisibilityF, onBlurFunc, passwordState} = this.props;

      const loginData = [
         {label: 'Email', type: 'text', name: 'email', error: 'emailError'},
         {label: 'Password', type: (passwordState ? 'text' : 'password'), name: 'password', error: 'passwordError'},
      ]

      return (
         <form onSubmit= {(e) => this.submitRegister(e)}>
            {loginData.map((item) => (
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

            <i className="bi bi-eye-slash loginPass" id="togglePassword" onClick={passwordState ? handlePasswordVisibilityF: handlePasswordVisibilityT}
            ></i>

            <div>
               <InputBase type = 'submit' value='Sign In'/>
            </div>
         </form>
      )
   }

}

export default Login;