import React from "react";
import InputBase from "../../InputBase/InputBase";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userState,
      users: this.props.UsersState,
      userTest: this.props.userTest,
      currentUserEmail: "",
    };
  }

  onChangeAction = (e) => {
    this.props.handleInputData(e)
    if(e.target.name === 'email') {
      this.props.checkIfUserInUsers(this.props.UsersState, e.target.value)
    }
  }

  render() {
    //functions
    const {
      passwordState,
      onBlurFunc,
      handlePasswordVisible,
    } = this.props;

    const inputData = [
      { label: "Email", type: "text", name: "email", error: "emailError" },
      {
        className: "passwordInputType",
        label: "Password",
        type: passwordState ? "text" : "password",
        name: "password",
        error: "passwordError",
      },
      {
        label: "Confirm Password",
        type: passwordState ? "text" : "password",
        name: "confPassword",
        error: "confPasswordError",
      },
      {
        label: "First Name",
        type: "text",
        name: "firstName",
        error: "firstNameError",
      },
      {
        label: "Last Name",
        type: "text",
        name: "lastName",
        error: "lastNameError",
      },
      {
        label: "Zip Code",
        type: "number",
        name: "zipCode",
        error: "zipCodeError",
      },
    ];

    return (
      <form
        onSubmit={(e) => this.props.onSubmitFunc(e)}
        disabled={this.props.disabledButtonState}
      >
        {inputData.map((item) => (
          <InputBase
            placeholder={item.label}
            type={item.type}
            name={item.name}
            value={this.state.users && this.state.users[item.name]}
            onChange={this.onChangeAction}
            autoComplete="off"
            onBlur={onBlurFunc}
            errorM={
              this.props.errorMState &&
              this.props.errorMState[item.error] &&
              this.props.errorMState[item.error].length > 1
                ? this.props.errorMState[item.error]
                : null
            }
          />
        ))}
        <i
          className="bi bi-eye-slash registerPass"
          id="togglePassword"
          onClick={
            handlePasswordVisible
          }
        ></i>
        <div className="registerButton">
          <InputBase type="submit" value="Register" disabled = {this.props.doesUserStateExist}/>
        </div>
      </form>
    );
  }
}

export default Register;
