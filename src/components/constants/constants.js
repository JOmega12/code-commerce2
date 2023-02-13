

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


//i think it has to do with something in the state data ofmain checkout component which ties back to here, try to make a small adjustment on the state where you will only measure the address title input and check for any on change values. 
//i think I will need two state data to finish this because the onchange is fine, so it needs one export const for general input and one for storing the state data
export const shippingInfoData = [
   {addressTitle: 'Tester Industry', name: 'jake', address: '123 test', zipCode: '12345', county: 'Los Angeles', city: 'Los Angeles', phoneNumber: '1234567890', telephone: '1234567890'},
]

export const shippingInfoDataInput =[
   {addressTitle: '', name: '', address: '', zipCode: '', county: '', city: '', phoneNumber: '', telephone: ''},
]

   // {addressTitle: 'Tester Industry', name: 'jake', address: '123 test', zipCode: '12345', county: 'Los Angeles', city: 'Los Angeles', phoneNumber: '1234567890', telephone: '1234567890'},

export const expressShipping = [
   {regularShipping: 0},
   {expressShipping: 5}
]