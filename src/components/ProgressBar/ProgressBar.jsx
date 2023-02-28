import React from 'react';
import './progressBar.css';



class ProgressBar extends React.Component {

   render() {
      const { percentage } = this.props;
      const style = {
         width: `${percentage}%`
      };
      return(
         <div className='progress-bar'>
            <div className='progress-bar-fill'
            style={style}></div>
            <div className='progress-bar-text'>
               <div>Cart</div>
               <div>Delivery</div>
               <div>Payment</div>
               <div>Confirmation</div>
            </div>
            <div>
               
            </div>
         </div>
      )
   }
}

export default ProgressBar;