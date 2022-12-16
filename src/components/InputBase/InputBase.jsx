
import './InputBase.css'

const InputBase = ({errorM,...props}) => {

   return (
   <label htmlFor="">
      <input className= 'input-root' {...props} />
      {errorM && (
      <div className='error'> {errorM}</div>
      )}
   </label>
   )
   
}

export default InputBase;