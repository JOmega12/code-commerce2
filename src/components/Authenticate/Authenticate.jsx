import React from 'react';
import { INIT_TEST, newUser } from '../constants/constants';

import { emailValidation, 
   onlyTextValidation, 
   passwordValidation, 
   zipCodeValidation } 
   from '../validations/validation';

import './Authenticate.css';
import Login from './Login/Login';
import Register from './Register/Register';


class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //isLogInClicked is false
      isLogInClicked: false,
      users: INIT_TEST,
      //this is where the user will be added
      user: newUser,
      error: {},
      passwordClicked: false,
      isRegistered: false,
      doesUserExist: false,
    };
  }

  checkIfUserInUsers = (arr, email) => {
    const userExist = arr.some((item) => item.email === email)
    this.setState({doesUserExist: userExist})
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

    this.setState({doesUserExist: foundUser.length > 0})
  };

  handleValidations = (name, value) => {
    let errorText;
    switch (name) {
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

    if(this.state.isRegistered && !['email', 'password'].includes(e.target.name)) {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  //onclick for radio buttons
  handleClick = (bool) => {
    this.setState({ isLogInClicked: bool });
  }


  handlePasswordVisibility = () => {

    this.setState((prevState) => ({
      passwordClicked: !prevState.passwordClicked,
    }));
  }

  checkErrorBeforeSave = (type) => {
    let errorValue = {};
    let isError = false;


    if(type === "create") {
      Object.keys(this.state.user).forEach((val) => {
        if (!this.state.user[val].length) {
          errorValue = { ...errorValue, [`${val}Error`]: "Required" };
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
    }


    else if (type === 'signIn') {
      Object.keys(this.state.user).forEach((val) => {
        if (!this.state.user['email'].length || !this.state.user['password'].length) {
          errorValue = { ...errorValue, [`${val}Error`]: "Required" };
          isError = true;
        } 
      })

      this.setState({isRegistered: true})
    }
    this.setState({ error : errorValue });
    return isError;
  };

  //button for signUP
  handleSignUpUser = (e) => {
    e.preventDefault();

    if(this.checkErrorBeforeSave('create')){
      return;
    }
    const errorCheck = this.checkErrorBeforeSave('create');
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
        users: {
          ...prevState.users,
          user: ''
        },
        error: {},
        isRegistered: true,
      }));
    }
  };

  //button for signIn
  handleSignInUser = () => {
    const errorCheck = this.checkErrorBeforeSave("signIn");

    if (!errorCheck) {
      this.state.users.forEach((user) => {
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

  render() {

    const inputRadio = [
      { 
        id: 1, 
        label: 'register', 
        title: 'Register', 
        // onClick: this.handleSignUpRadio, 
        checked: this.state.isLogInClicked, 
        onChange: (()=> this.handleClick(true))
      },
      { 
        id: 2, 
        label: 'login', 
        title: 'Login', 
        checked: !this.state.isLogInClicked, 
        onChange: (()=> this.handleClick(false))
      }
    ];

    return (
      <div className="mainBox">
        <h1>Get Started</h1>
        <div className="main-radioBox" onChange={this.handleSignIn}>

          {inputRadio.map((item) => (
            <label htmlFor="">
            <input
              id={item.id}
              type="radio"
              name="radioTag"
              value={item.label}
              onClick={item.onChange}
              checked= {item.checked}
            />
            {item.title}
            </label>
          ))}



        </div>

        {this.state.isLogInClicked ? (
          <Register
            userState={this.state.user}
            UsersState={this.state.users}
            userTest={this.state.testUser}
            handleInputData={this.handleInputData}
            
            checkIfUserInUsers= {this.checkIfUserInUsers}
            doesUserStateExist = {this.state.doesUserExist}
            handlePasswordVisible= {this.handlePasswordVisibility}

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

            handlePasswordVisible= {this.handlePasswordVisibility}

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