import React, { useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function StripeApp(){
	const stripePromise = loadStripe('pk_test_51MJf0VGkviSamXGKRwa74Dl7mHXsIAqYbmUyGQFycucGDStXFxaY44IGQZEqsYrtqkTS79Pq0dfcq4ak5HviRIdY00aPL7iZGs');

  function Checkout(){
    const [messages, addMessage] = useState();
    const [err, setErr] = useState(false);

    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!stripe || !elements) return;
      addMessage('Creating payment intent...');

      //Create payment intent on the server.        
      const {error: backendError, clientSecret} = await fetch('http://localhost:5252/create-payment-intent', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'eur',
        }),
      }).then(r => r.json());

      if(backendError){
        addMessage(backendError.message);
        setErr(true)
        return;
      }

      addMessage('Payment intent created');
      
      // Confirm the payment on the client.
      let {paymentIntent} = await stripe.confirmCardPayment(
        clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        }
      )

      addMessage(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`)

    }

    return(
        <div className=''>
          {messages && <div className={`alert ${err ? 'alert-danger': 'alert-success'}`}>
            {messages}
          </div>}
          <h1>Become a Pro</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='card-element'>Card</label>
            <CardElement id="card-element"/>
            <button 
              type='submit' 
              className="btn btn-primary w-100">Pay</button>
          </form>
        </div>
    )
  }

	return(
		<Elements stripe={stripePromise}>
			<Checkout />
		</Elements>
	)

}