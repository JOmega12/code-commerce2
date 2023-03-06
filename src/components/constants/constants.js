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

//might have to restructure the shippingInfoDataInput  similar to shippingInfoData because when i click the button to go next, i would put the data input into the shippingInfoData, therefore it would change the whole structure of my code in shippingINfo component because it would change my onchange and value and have it structured similar to authenticate component in order for the object to be properly added and then move on

//so then the problem and the solution is when i restructure the shippingInfoDataInput, how do i change the onchange value to better reflect the onchange so that i am able to add the data into the button? 

export const shippingInfoDataInput =[
   {addressTitle: '', name: '', address: '', zipCode: '', country: 'United States', city: 'Los Angeles', state: 'California', phoneNumber: '', telephone: ''},
]


export const expressShipping = [
   {placeHolder: 'Standard Shipping', regularShipping: 0, value: '', description: 'Delivery in 4-6 Business Days - Free',},
   {placeHolder: 'Express Shipping', expressShipping: 5, value: '', description: 'Delivery in 1-3 Business Days - $5',}
]


export const cardInformation = 
{cardHolderName: '', cardNumber: '', monthExp: '', yearExp: '', cvv: ''}


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



// the confirmation screen with all of the props
//make the progress bar at top
//

//current bug is forcing me to cut me off after the first character input
//reason being is because the elements are in an input instead of outside of the input


//current bug is in shippingexpress info because whenever i click the radio button in shippingInfo comp
// it doesn't click the button when clicked, but it does show the state to go true or false why is not clicking?
//it wasnt hooked up properly to the state of checkout comp of t/f