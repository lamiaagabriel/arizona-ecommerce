import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStore } from 'utils/store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import CheckoutWizard from 'components/CheckoutWizard';
import Layout from "components/layout";

const paymentMethods = [ 'PayPal', 'Strip', 'CashOnDelivery' ];

export default function Payment() {
    const [selected, setSelected] = useState(paymentMethods[0]);
    const { state, dispatch } = useStore();
    const router = useRouter();
    
    const submitHandler= (e) => {
        e.preventDefault();

        if(!selected)
            return toast.error('Please, Choose a payment method');
        
        dispatch({ type: 'ADD_PAYMENT_METHOD', payload: selected })
        Cookies.set('cart', JSON.stringify({
            ...state.cart,
            paymentMethod: selected
        }));
        router.push('/place-order');
    }
    return (
        <Layout title='Payment'>
            <section>
                <div className="container">
                    <CheckoutWizard currentStep={3} />
                    <form onSubmit={submitHandler}>
                        <div className="container py-16 max-w-[30rem] ring-1 ring-slate-200 shadow-xl rounded-lg">
                            <h1 className='font-semibold text-lg pb-4'>Payment Method</h1>
                            {paymentMethods.map((payment, i) => (
                                <div key={i} className="font-semibold flex-start gap-2">
                                    <input id={payment} type="radio"  className='w-fit' checked={selected === payment} onChange={() => setSelected(payment)}/>
                                    <label htmlFor={payment}>{payment}</label>
                                </div>
                            ))}
                            <div className='flex-between gap-4 pt-4'>
                                <Link href='/shipping' className="cancel-button px-5">Back</Link>
                                <button type="submit" className="primary-button px-5">Next</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
Payment.auth = true;