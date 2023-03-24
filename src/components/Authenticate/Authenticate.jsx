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
    super(props);
    this.state = {
      isLogInClicked: false,
      // testUser: INIT_TEST,
      users: INIT_TEST,
      //this is where the user will be added
      user: newUser,
      error: {},
      passwordClicked: false,
      isRegistered: false,
    };
  }

  //add the test user to users to populate the object
  addUserToState = (obj) => {
    const newArr = [...this.state.users];
    newArr.push(obj);
    this.setState((prevState) => ({
      ...prevState,
      users: newArr,
    }));
  };

  //this checks if current user is in array
  checkIfUserExist = (arr, type) => {
    const foundUser = arr.find((item) => {
      return item.type === type;
    });
    return foundUser.length > 0 ? true : false;
  };

  handleValidations = (name, value) => {
    let errorText;
    switch (name) {
      // case 'firstName':
      //    if(!value) {
      //       errorText = 'First Name is Required'
      //    } else {
      //       errorText = onlyTextValidation(value);
      //       this.setState((prevState) => ({
      //          error: {
      //             ...prevState.error,
      //             firstNameError: errorText
      //          },
      //       }));
      //    }

      // break;
      // case 'lastName':
      //    if(!value){
      //       errorText = 'Last Name is Required'
      //    } else {
      //       errorText = onlyTextValidation(value);
      //       this.setState((prevState) => ({
      //          error: {
      //             ...prevState.error,
      //             lastNameError: errorText
      //          },
      //       }));
      //    }
      // break;
      // case 'password':
      //    if(!value) {
      //       errorText = 'Password is Required'
      //    } else {
      //       errorText = passwordValidation(value);
      //       this.setState((prevState) => ({
      //          error: {
      //             ...prevState.error,
      //             passwordError: errorText
      //          },
      //       }))
      //    }
      // break;
      // case 'confPassword':
      //    if(!value) {
      //       errorText = 'Confirm Password is Required'
      //    } else {
      //       if (value !== this.state.user.password) {
      //          errorText = 'Password does not match'
      //       }
      //       this.setState((prevState) => ({
      //          error: {
      //             ...prevState.error, confPasswordError: errorText},
      //          }))
      //    }
      // break;
      // case 'email':
      //    if(!value) {
      //       errorText = 'Email is Required'
      //    } else {
      //       errorText = emailValidation(value);
      //       this.setState((prevState) => ({
      //          error: {
      //             ...prevState.error,
      //             emailError: errorText
      //          },
      //       }))
      //    }
      // break;
      // case 'zipCode':
      //    if(!value) {
      //       errorText = 'Zipcode is Required'
      //    } else {
      //       errorText= zipCodeValidation(value);
      //       this.setState((prevState) => ({
      //          error: {
      //             ...prevState.error,
      //             zipCodeError: errorText
      //          },
      //       }))
      //    }
      // break;
      // default:
      //    break;

      case "firstName":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            firstNameError: errorText,
          },
        }));
        break;
      case "lastName":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            lastNameError: errorText,
          },
        }));
        break;
      case "password":
        errorText = passwordValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            passwordError: errorText,
          },
        }));
        break;
      case "confPassword":
        if (value !== this.state.user.password) {
          errorText = "Password does not match";
        }
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            confPasswordError: errorText,
          },
        }));
        break;
      case "email":
        errorText = emailValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            emailError: errorText,
          },
        }));
        break;
      case "zipCode":
        errorText = zipCodeValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zipCodeError: errorText,
          },
        }));
        break;
      default:
        break;
    }

    if (this.state.isRegistered) {
      this.setState((prevState) => ({
        error: {
          ...prevState.error,
          [`${name}Error`]: errorText || "Required",
        },
      }));
    }
  };

  handleBlur = (e) => {
    this.handleValidations(e.target.name, e.target.value);
  };

  //onChange function
  handleInputData = (e) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [e.target.name]: e.target.value,
      },
    }));

    //i know that when i write something, it might have something to do with the input and registering
  };

  //onclick for radio buttons
  handleSignUpRadio = () => {
    this.setState({ isLogInClicked: true });
  };

  handleSignInRadio = () => {
    this.setState({ isLogInClicked: false });
  };

  handlePasswordVisibilityT = () => {
    this.setState({ passwordClicked: true });
  };

  handlePasswordVisibilityF = () => {
    this.setState({ passwordClicked: false });
  };

  checkErrorBeforeSave = () => {
    let errorValue = {};
    let isError = false;

    Object.keys(this.state.user).forEach((val) => {
      // console.log(this.state.user[val], 'stateuser[val]')
      // console.log(this.state.user[val].length, 'stateuser[val]')
      // console.log(!this.state.user[val].length, '!stateuser[val]')
      // console.log(this.state.user, 'state user')

      if (!this.state.user[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        console.log(errorValue, 'errorValue');
        isError = true;
      } 
      else if(val === 'email') {
         if (!this.state.user.email) {
            errorValue = {
               ...errorValue,
               emailError : 'Email is Required'
            };
            isError = true;
         }
      }
      else if (val === "firstName") {
        if (!this.state.user.firstName) {
          errorValue = {
            ...errorValue,
            firstNameError: "First Name is Required",
          };
          isError = true;
        }
      } else if (val === "lastName") {
        if (!this.state.user.lastName) {
          errorValue = {
            ...errorValue,
            lastNameError: "Last Name is Required",
          };
          isError = true;
        }
      } else if (val === "zipCode") {
        if (!this.state.user.zipCode) {
          errorValue = {
            ...errorValue,
            zipCodeError: "Zipcode is Required",
          };
          isError = true;
        }
      }
    });
    this.setState({ error : errorValue });
    return isError;
  };

  //button for signUP
  handleSignUpUser = (e) => {
    e.preventDefault();

    if(this.checkErrorBeforeSave()){
      return;
    }
    const errorCheck = this.checkErrorBeforeSave();
    console.log(errorCheck, 'errorCheck');

    this.state.users.forEach(user => {
      if(user.email === this.state.user.email) {
         this.setState((prevState) => ({
            error: {
               ...prevState.error,
               emailError: 'Email already exists, please sign in'
            }
         }))
      } 
   })

    if (!errorCheck) {
      this.addUserToState(this.state.user);

      this.props.isLoggedInStateT();
      this.setState((prevState) => ({
        user: newUser,
      //   user: "",
        users: {
          ...prevState.users,
          user: ''
        },
        error: {},
        isRegistered: false,
      }));
    }
    //im close on the email errors , just need to get them taken care of
  };

  //button for signIn
  handleSignInUser = () => {
    const errorCheck = this.checkErrorBeforeSave("signIn");

    if (!errorCheck) {
      this.state.users.forEach((user) => {
        console.log(user);
        if (user.email !== this.state.user.email) {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              emailError: "Email cannot be found",
            },
          }));
        } else if (user.password !== this.state.user.password) {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              passwordError: "Password is Incorrect",
            },
          }));
        } else {
          // this.addUserToState(this.state.user);
          
          this.props.isLoggedInStateT();
          this.setState(       
            (prevState) => ({
            user: newUser,
            users: {
              ...prevState.use
            },
          }));
        }
      });
    }
  };
//asd
  render() {
    return (
      <div className="mainBox">
        <h1>Get Started</h1>
        <div className="main-radioBox" onChange={this.handleSignIn}>
          <label htmlFor="">
            <input
              type="radio"
              name="radioTag"
              value="register"
              onClick={this.handleSignUpRadio}
              checked={this.state.isLogInClicked}
            />
            Register
          </label>
          <label htmlFor="">
            <input
              type="radio"
              name="radioTag"
              value="login"
              onClick={this.handleSignInRadio}
              checked={!this.state.isLogInClicked}
            />
            Login
          </label>
        </div>

        {this.state.isLogInClicked ? (
          <Register
            userState={this.state.user}
            UsersState={this.state.users}
            userTest={this.state.testUser}
            handleInputData={this.handleInputData}
            handlePasswordVisibilityT={this.handlePasswordVisibilityT}
            handlePasswordVisibilityF={this.handlePasswordVisibilityF}
            passwordState={this.state.passwordClicked}
            onBlurFunc={this.handleBlur}
            errorMState={this.state.error}
            onSubmitFunc={this.handleSignUpUser}
            disabledButtonState={!this.state.isRegistered}
          />
        ) : (
          <Login
            UserState={this.state.user}
            UsersState={this.state.users}
            userTest={this.state.testUser}
            handleInputData={this.handleInputData}
            handlePasswordVisibilityT={this.handlePasswordVisibilityT}
            handlePasswordVisibilityF={this.handlePasswordVisibilityF}
            passwordState={this.state.passwordClicked}
            onBlurFunc={this.handleBlur}
            errorMState={this.state.error}
            onSubmitFunc={this.handleSignInUser}
          />
        )}

        <div className="fb">
          <label htmlFor="" className="fb-box">
            <h2>Facebook</h2>
          </label>
        </div>
      </div>
    );
  }
}


export default Authenticate;