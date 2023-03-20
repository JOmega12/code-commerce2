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
   } else if(val === 'email') {
      if (!this.state.user.email) {
         errorValue = {
            ...errorValue,
            emailError : 'Email is Required'
         };
         isError = true;
      }
   }
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
            firstNameError : 'Last Name is Required'
         };
         isError = true;
      }
   }
   else if (val === 'zipCode') {
      if (!this.state.user.zipCode) {
         errorValue = {
            ...errorValue,
            firstNameError : 'Zipcode is Required'
         };
         isError = true;
      }
   }

   // else if (type === 'create' && val === 'email') {
   //    Object.keys(this.state.users).forEach(item => {
   //       if (item.email === this.state.user.email) {
   //          errorValue = {
   //             ...errorValue, 
   //             emailError: 'Email already exists'};
   //             isError = true
   //       }
   //    })
   // }

});