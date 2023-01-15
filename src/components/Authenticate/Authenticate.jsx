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
         isLogInClicked: false,
         // testUser: INIT_TEST,
         users: INIT_TEST,
         //this is where the user will be added 
         user: '',
         error: {},
         passwordClicked: false,
      }
   }

   //add the test user to users to populate the object
   addUserToState = (obj) => {
      const newArr = [...this.state.users];
      newArr.push(obj);
      this.setState((prevState) => ({
         ...prevState,
         users: newArr,
      }))
   }

   //this checks if current user is in array
   checkIfUserExist = (arr, type) => {
      const foundUser = arr.forEach((item) => {
         return item.type === type
      })
      return foundUser.length > 0 ? true: false;
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

            if (value !== this.state.user.password) {
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

   //onChange function
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

   checkErrorBeforeSave = (type) => {
      let errorValue = {};
      let isError = false;
      Object.keys(this.state.user).forEach((val) => {
         if (!this.state.user[val].length) {
            errorValue = { ...errorValue, [`${val}Error`] : 'Required' };
            isError = true
         } 

         else if (type === 'signUp') {
            this.state.users.forEach(item => {
               if (item.email === this.state.user.email) {
                  errorValue = {
                     ...errorValue, 
                     emailError: 'Email already exists'};
                     isError = true
               }
            })
         }

      });
      this.setState({ error : errorValue });
      return isError;
   }

   //button for signUP
   handleSignUpUser = () => {
      const errorCheck = this.checkErrorBeforeSave('create');


      if (!errorCheck) {
         this.state.users.forEach(user => {
            if(user.email === this.state.user.email) {
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error,
                     emailError: 'Email already exists, please sign in'
                  }
               }))
            } else {
               this.addUserToState(this.state.user);
               this.props.isLoggedInStateT();
               this.setState((prevState) => ({
                  users: {
                     ...prevState.users,
                     user: '',
                  }
               }))
            }
         })

      }

   }

   //button for signIn
   handleSignInUser = () => {
      const errorCheck = this.checkErrorBeforeSave('signIn');

      if (!errorCheck) {
         this.state.users.forEach(user => {
            console.log(user)
            if (user.email !== this.state.user.email) {
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error,
                     emailError: 'Email cannot be found'
                  }
               }))
            } else if (user.password !== this.state.user.password) {
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error,
                     passwordError: 'Password is Incorrect'
                  }
               }))
            }  else {
                  this.addUserToState(this.state.user);
                  this.props.isLoggedInStateT();
                  this.setState({
                     users: newUser,
                     user: '',
                  })
               }
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

               onSubmitFunc = {this.handleSignInUser}
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