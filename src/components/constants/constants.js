

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

//then the error messages, cannot move forward until it is in
//also the loading bar which comprises of true or false statements and show the color


export const shippingInfoData = [
   {addressTitle: 'Tester Industry', name: 'jake', address: '123 test', zipCode: '12345', county: 'Los Angeles', city: 'Los Angeles', phoneNumber: '1234567890', telephone: '1234567890'},
]

export const shippingInfoDataInput =[
   {name: 'addressTitle', value: ''},
   {name: 'name', value: ''},
   {name: 'address', value: ''},
   {name: 'zipCode', value: ''},
   {name: 'country', value: 'United States'},
   {name: 'city', value: 'Los Angeles'},
   {name: 'state', value: 'California'},
   {name: 'phoneNumber', value: ''},
   {name: 'telephone', value: ''},
]

   // {addressTitle: 'Tester Industry', name: 'jake', address: '123 test', zipCode: '12345', county: 'Los Angeles', city: 'Los Angeles', phoneNumber: '1234567890', telephone: '1234567890'},

export const expressShipping = [
   {regularShipping: 0, value: ''},
   {expressShipping: 5, value: ''}
]