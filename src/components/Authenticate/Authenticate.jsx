import React from 'react';
import { INIT_TEST, newUser } from '../constants/constants';
// import InputBase from '../InputBase/InputBase.jsx';
import { emailValidation, 
   onlyTextValidation, 
   passwordValidation, 
   zipCodeValidation } 
   from '../validations/validation';
// import Register from './Register/Register';
import './Authenticate.css';
import Login from './Login/Login';
import Register from './Register/Register';


class Authenticate extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         // isLoggedInState: this.props.isLoggedInState,
         isLogInClicked: false,
         testUser: INIT_TEST,
         users: newUser,
         //this is where the user will be added 
         user: '',
         error: {},
         passwordClicked: false,
      }
   }


   addUserToState = (obj) => {
      const newArr = [...this.state.users];
      newArr.push(obj);
      this.setState((prevState) => ({
         ...prevState,
         users: newArr,
      }))
   }

   handleValidations = (name, value) => {
      let errorText;

      switch (name) {
         case 'firstName':
            errorText = onlyTextValidation(value);
            this.setState((prevState) => ({
               error: {
                  ...prevState.error, 
                  firstNameError: errorText
               },
            }));

         break;
         case 'lastName':
            errorText = onlyTextValidation(value);
            this.setState((prevState) => ({
               error: {
                  ...prevState.error, 
                  lastNameError: errorText
               },
            }));
         break;
         case 'password':
            errorText = passwordValidation(value);
            this.setState((prevState) => ({
               error: {
                  ...prevState.error, 
                  passwordError: errorText
               },
            }))
         break;
         case 'confPassword':
            //checks if confirm password is === to initial password

            if (value !== this.state.newUser.password) {
               errorText = 'Password does not match'
            }

            this.setState((prevState) => ({
               error: {
                  ...prevState.error, confPasswordError: errorText},
               }))

         break;
         case 'email':
            errorText = emailValidation(value);

            this.setState((prevState) => ({
               error: {
                  ...prevState.error,
                  emailError: errorText
               },
            }))
         break;
         case 'zipCode':
            errorText= zipCodeValidation(value);

            this.setState((prevState) => ({
               error: {
                  ...prevState.error,
                  zipCodeError: errorText
               },
            }))
         break;
         default:
            break;
      }
   }

   handleBlur = (e) => {
      this.handleValidations(e.target.name, e.target.value);
   }

   //onChange function (done)
   handleInputData = (e) => {
      this.setState((prevState) => ({
         user: {
            ...prevState.user,
            [e.target.name]: e.target.value,
         }
      }))
   }

   //onclick for radio buttons
   handleSignUpRadio = () => {
      this.setState({isLogInClicked : true})
   }

   handleSignInRadio = () => {
      this.setState({isLogInClicked : false})
   }

   handlePasswordVisibilityT = () => {
      this.setState({passwordClicked: true});
   }

   handlePasswordVisibilityF = () => {
      this.setState({passwordClicked: false});
   }

   //this checks if current user is in 
   checkIfUserExist = (email) => {
      return this.props.userData.filter(item => {
         return item.email === email
      })
   }

 //it works in terms of  but why does it not reset the values when pressing the register button and why does it not go to the next component
   checkErrorBeforeSave = () => {
      let errorValue = {};
      let isError = false;
      Object.keys(this.state.user).forEach((val) => {
         if (!this.state.user[val].length) {
            errorValue = { ...errorValue, [`${val}Error`] : 'Required' };
            isError = true
         } 
         
         else if (val.email) {
            this.state.user.forEach(user => {
               if (user.email === this.state.users.email) {
                  errorValue = {...errorValue, emailError: 'Email is already logged in'};
                  isError = true
               }
            })
         }

      });
      this.setState({ error : errorValue });
      return isError;
   }

   //this is the submit button for Register
   handleSignUpUser = () => {
      const errorCheck = this.checkErrorBeforeSave();
      console.log(errorCheck);

      if (!errorCheck) {
         this.addUserToState(this.state.user);
         this.props.isLoggedInStateT();
         this.setState({
            users: newUser,
            user: ''
         })
      }
   }


   render() {

      return (
         <div className='mainBox'>
            <h1>Get Started</h1>
            <div className='main-radioBox' onChange={this.handleSignIn}>
               <label htmlFor="">
                     <input type="radio" name='radioTag' value='register'
                     onClick={this.handleSignUpRadio}
                     checked = {this.state.isLogInClicked}
                     />
                     Register
                  </label>
                  <label htmlFor="">
                     <input type="radio" name='radioTag' value='login'
                     onClick={this.handleSignInRadio}
                     checked = {!this.state.isLogInClicked}
                     />
                     Login
                  </label>
            </div>

            

            {this.state.isLogInClicked ? (
               <Register 
               UserState={this.state.user}
               UsersState = {this.state.users}
               userTest = {this.state.testUser}

               handleInputData = {this.handleInputData}
               handlePasswordVisibilityT = {this.handlePasswordVisibilityT}
               handlePasswordVisibilityF = {this.handlePasswordVisibilityF}
               passwordState = {this.state.passwordClicked}
               onBlurFunc = {this.handleBlur}
               errorMState = {this.state.error}

               onSubmitFunc = {this.handleSignUpUser}
               /> 
            ): <Login 
               UserState={this.state.user}
               UsersState = {this.state.users}
               userTest = {this.state.testUser}

               handleInputData = {this.handleInputData}
               handlePasswordVisibilityT = {this.handlePasswordVisibilityT}
               handlePasswordVisibilityF = {this.handlePasswordVisibilityF}
               passwordState = {this.state.passwordClicked}

               onBlurFunc = {this.handleBlur}
               errorMState = {this.state.error}
               />
            
            }


            <div className='fb'>
               <label htmlFor="" className='fb-box'>
                  <h2>Facebook</h2>
               </label>
            </div>
         </div>
      )
   }
}


export default Authenticate;