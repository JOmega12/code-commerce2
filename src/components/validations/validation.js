import moment from 'moment';

export const emailValidation = (value) => {
   if (value) {
      if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value)) {
         return undefined
      } else {
         return 'Email does not meet requirements'
      }
   }
}

export const passwordValidation = (value) => {
   if (value) {
      //this is 8 min, one letter, one number
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(value)) {
         return undefined
      } else {
         return 'Password needs 8 minimum chars, 1 Capital, 1 Number'
      }
   } else {
      return undefined;
   }
}

export const zipCodeValidation = (value) => {
   if (value){
      if (/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/i.test(value)) {
         return undefined
      } else {
         return 'Zipcode needs 5 characters'
      }
   }
}


export const onlyTextValidation = (value) => {
   if (value) {
      if (/^[a-zA-Z]*$/i.test(value)) {
         return undefined
      } else {
         return 'Alphabetical letters only'
      } 
   } else {
      return undefined;
   }
}


export const cardNumberValidation = (cardNumber) => {
   const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}^[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
   };
   for(const card in regexPattern){
      if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
         if (cardNumber) {
            return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber
            .replace(/[^\d]/g, "")
            .trim())
            ? ''
            : 'Enter a valid Card';
         }
      }
   }
   return 'Enter a valid Card';
}

export const cardExpireValidation = (value) => {
   if (value) {
      if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
         let today = new Date();
         const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(today.getFullYear(),
            today.getMonth() + 1, 0).getDate()}`
         let currentDate = moment(new Date(date));
         let visaValue = value.split('/');
         let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
         return currentDate < moment(visaDate)
            ? undefined
            : `Please enter a valid date`;
      } else {
         return 'Invalid date format';
      }
   }
};

export const securityCodeValidation = (min, value) => 
(value && value.length < min) ? 'Must be 3 characters or more' : undefined 


export const addressValidation = (value) => {
   if (value) {
      if(/^[0-9]{1,4}(([/][0-9]{1,4})|(\/[ABCDFGHJKLMNPRSTV]{1,2}))*$/) {
         return undefined
      }
   } else if (!value) {
      return 'You need an address'
   }
}
// /^[0-9]{1,4}(([\-\/][0-9]{1,4})|(\/[ABCDFGHJKLMNPRSTV]{1,2}))*$/

export const phoneNumberValidation = (value) => {
   const phoneNumberRegex = /^[0-9]{10}$/; 
   if (!phoneNumberRegex.test(value)) {
      return 'Please enter a valid 10-digit phone number.';
   }
}