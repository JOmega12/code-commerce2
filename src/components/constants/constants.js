import VISA_ICON from '../assets/visa.png';
import AMERICAN_EXPRESS from '../assets/amex.png';
import MASTER_CARD from '../assets/masterCard.png';
import DISCOVER_ICON from '../assets/discover.png';

export const INIT_TEST = [{
   email: 'test@test.com',
   password: 'Test1234',
   confPassword: 'Test1234',
   firstName: 'jake',
   lastName: 'snake',
   zipCode: '11111',
},]

export const newUser =[
   {
   email: '',
   password: '',
   confPassword: '',
   firstName: '',
   lastName: '',
   zipCode: '',
   },
]

export const shoppingItems = [
   {img: '/IMAGE/milk.png', name: 'Milk', price: 10, totalPrice: 0, quantity: 0},
   {img: '/IMAGE/cheese1.png', name: 'Cheese', price: 20, totalPrice: 0, quantity: 0},
   {img: '/IMAGE/goat.png', name: 'Goat', price: 50, totalPrice: 0, quantity: 0},
   {img: '/IMAGE/rice.png', name: 'Rice', price: 5, totalPrice: 0, quantity: 0},
]

export const discountVal = [
   {number: 0.10, word: 'ten'},
   {number: 0.20, word: 'twenty'},
]


export const shippingInfoData = [
   {addressTitle: 'Tester Industry', name: 'jake', address: '123 test', zipCode: '12345', county: 'Los Angeles', city: 'Los Angeles', phoneNumber: '1234567890', telephone: '1234567890'},
]


export const shippingInfoDataInput = 
[
   {addressTitle: '', name: '', address: '', zipCode: '', country: 'United States', city: 'Los Angeles', state: 'California', phoneNumber: '', telephone: ''}
]


export const expressShipping = [
   {placeHolder: 'Standard Shipping', regularShipping: 0, value: '', description: 'Delivery in 4-6 Business Days - Free',},
   {placeHolder: 'Express Shipping', expressShipping: 5, value: '', description: 'Delivery in 1-3 Business Days - $5',}
]


export const cardInformation = 
{cardHolderName: '', cardNumber: '', monthExp: 'Jan', yearExp: '2023', cvv: ''}

export const OTHERCARDS = [
   /[1-9]/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
];

export const AMERICANEXPRESS = [
   /[1-9]/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   ' ',
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   /\d/,
];

export const CARD = [
   'VISA',
   'MASTERCARD',
   'AMERICAN_EXPRESS',
   'DISCOVER'
];

export const CARDICON = {
   VISA: VISA_ICON,
   MASTERCARD: MASTER_CARD,
   AMERICAN_EXPRESS: AMERICAN_EXPRESS,
   DISCOVER: DISCOVER_ICON,
}


//current code problem in the authenticate component is that it goes on to the next component without checking if the input is not in
//current code bugs are that errors only show after the first error is present then it can be shown. The error do not show intially until the first error unrelated to empty input occurs
//the one thing related to the one above is in the handleValidations method but it does not occur in the checkErrorBeforeSave method. 
//next try out the button to see if it works or not

//also current bug does not want me to register/authenticate the user


//check if the fields have length > 0,if there is an error for current input field 
//if error fields are not 


//when i click the input it doesn't show the error, 
//when i 