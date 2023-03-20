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
            if(!value) {
               errorText = 'First Name is Required'
               if(errorText) {
                  this.setState((prevState) => ({
                     error: {
                       ...prevState.error, 
                       [`${name}Error`]: errorText
                     },
                   }));
               }
            } else {
               errorText = onlyTextValidation(value);
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error, 
                     firstNameError: errorText
                  },
               }));
            }

         break;
         case 'lastName':
            if(!value){
               errorText = 'Last Name is Required'
            } else {
               errorText = onlyTextValidation(value);
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error, 
                     lastNameError: errorText
                  },
               }));
            }
         break;
         case 'password':
            if(!value) {
               errorText = 'Password is Required' 
            } else {
               errorText = passwordValidation(value);
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error, 
                     passwordError: errorText
                  },
               }))
            }
         break;
         case 'confPassword':
            if(!value) {
               errorText = 'Confirm Password is Required'
            } else {
               if (value !== this.state.user.password) {
                  errorText = 'Password does not match'
               }
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error, confPasswordError: errorText},
                  }))
            }
         break;
         case 'email':
            if(!value) {
               errorText = 'Email is Required'
            } else {
               errorText = emailValidation(value);
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error,
                     emailError: errorText
                  },
               }))
            }
         break;
         case 'zipCode':
            if(!value) {
               errorText = 'Zipcode is Required'
            } else {
               errorText= zipCodeValidation(value);
               this.setState((prevState) => ({
                  error: {
                     ...prevState.error,
                     zipCodeError: errorText
                  },
               }))
            }
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

   //check if the fields have length > 0,if there is an error for current input field 
   //if error fields are not 

   checkErrorBeforeSave = () => {
      let errorValue = {};
      let isError = false;

      if (!this.state.user.email) {
         errorValue = {
           ...errorValue,
           emailError: 'Email is Required'
         };
         isError = true;
       } else if (!this.state.user.password || !this.state.user.confPassword){
         errorValue = {
            ...errorValue,
            passwordError : 'Password is Required',
            confPasswordError: 'Password is Required'
         };
         isError = true;
      }
       
       else {
         Object.keys(this.state.user).forEach((val) => {
            if (!this.state.user[val].length) {
               errorValue = { ...errorValue, [`${val}Error`] : 'Required' };
               isError = true
            } 
            else if (val === 'confPassword' || val === 'password') {
               if (this.state.user.password !== this.state.user.confPassword) {
                  errorValue = {
                     ...errorValue,
                     passwordError : 'Password Must Match',
                     confPasswordError: 'Password Must Match'
                  };
                  isError = true;
               } 
            } else if (!this.state.user.password || !this.state.user.confPassword){
                  errorValue = {
                     ...errorValue,
                     passwordError : 'Password is Required',
                     confPasswordError: 'Password is Required'
                  };
                  isError = true;
            } 
            // else if(val === 'email') {
            //    if (!this.state.user.email) {
            //       errorValue = {
            //          ...errorValue,
            //          emailError : 'Email is Required'
            //       };
            //       isError = true;
            //    }
            // }
             else if(val === 'firstName') {
               if (!this.state.user.firstName) {
                  errorValue = {
                     ...errorValue,
                     firstNameError : 'First Name is Required'
                  };
                  isError = true;
               }
            }
            else if ( val ==='lastName') {
               if (!this.state.user.lastName) {
                  errorValue = {
                     ...errorValue,
                     lastNameError : 'Last Name is Required'
                  };
                  isError = true;
               }
            }
            else if (val === 'zipCode') {
               if (!this.state.user.zipCode) {
                  errorValue = {
                     ...errorValue,
                     zipCodeError : 'Zipcode is Required'
                  };
                  isError = true;
               }
            }
         });
       }

       Object.keys(this.state.error).forEach((val) => {
         if(this.state.error[val].length) {
            errorValue = {...errorValue, [val]: this.state.error[val]};
            isError = true;
         }
       });

       if(isError) {
         this.setState({error: errorValue});
         return true;
       } else {
         return false;
       }
      // this.setState({ error : errorValue });
      // return isError;
   }

   //button for signUP
   handleSignUpUser = (e) => {
      e.preventDefault();
      const errorCheck = this.checkErrorBeforeSave();


      if (!errorCheck) {
         this.addUserToState(...this.state.user);
         this.props.isLoggedInStateT();
         this.setState((prevState) => ({
            user: newUser,
            users: {
               ...prevState.users,
               user: '',
            },
            error: {},
         }))
         // this.state.users.forEach(user => {
         //    if(user.email === this.state.user.email) {
         //       this.setState((prevState) => ({
         //          error: {
         //             ...prevState.error,
         //             emailError: 'Email already exists, please sign in'
         //          }
         //       }))
         //    } else {
         //    }
         // })

      }
//im close on the email errors , just need to get them taken care of 
   }

   //button for signIn
   handleSignInUser = () => {
      const errorCheck = this.checkErrorBeforeSave('signIn');

      if (!errorCheck) {
         this.state.users.forEach(user => {
            // console.log(user)
            // if (user.email !== this.state.user.email) {
            //    this.setState((prevState) => ({
            //       error: {
            //          ...prevState.error,
            //          emailError: 'Email cannot be found'
            //       }
            //    }))
            // } else 
            if (user.password !== this.state.user.password) {
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