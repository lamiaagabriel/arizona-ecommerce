import { useForm } from 'react-hook-form';
import { useStore } from 'utils/store';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import CheckoutWizard from 'components/CheckoutWizard';
import Layout from "components/layout";
import { useRouter } from 'next/router';

export default function Shipping() {
    const router = useRouter();
    const { state, dispatch } = useStore();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues
    } = useForm();

    useEffect(() => {
        setValue('name', state.cart.shippingAddress.name);
        setValue('address', state.cart.shippingAddress.address);
        setValue('country', state.cart.shippingAddress.country);
        setValue('city', state.cart.shippingAddress.city);
        setValue('postalCode', state.cart.shippingAddress.postalCode);
    }, [setValue, state.cart.shippingAddress])

    const submitHandler = async ({ name, address, country, city, postalCode }) => {
        dispatch({
            type: 'ADD_SHIPPING_ADDRESS',
            payload: { name, address, country, city, postalCode }
        });
        Cookies.set('cart', 
            JSON.stringify({
                ...state.cart,
                shippingAddress: { name, address, country, city, postalCode }
            })
        );
        router.push('/payment')
    }
    return (
        <Layout title='Shipping'>
            <section>
                <div className="container">
                    <CheckoutWizard currentStep={2} />
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="container py-16 max-w-[30rem] ring-1 ring-slate-200 shadow-xl rounded-lg">
                            <div className="input-field">
                                <label>Full Name</label>
                                <input type="text" autoFocus { 
                                    ...register('name', { required: 'Name is required' })} 
                                />
                                <p>{errors.name?.message}</p>
                            </div>
                            <div className="input-field">
                                <label>Address</label>
                                <input type="address" {
                                    ...register('address', { required: 'Address is required' })}
                                />
                                <p>{errors.address?.message}</p>
                            </div>
                            <div className="input-field">
                                <label>Country</label>
                                <input type="country" {
                                    ...register('country', { required: 'Country is required' })}
                                />
                                <p>{errors.country?.message}</p>
                            </div>
                            <div className="input-field">
                                <label>City</label>
                                <input type="city" {
                                    ...register('city', { required: 'City is required' })}
                                />
                                <p>{errors.city?.message}</p>
                            </div>
                            <div className="input-field">
                                <label>Postal Code</label>
                                <input type="Postal Code" {
                                    ...register('postalCode', { required: 'Postal Code is required' })}
                                />
                                <p>{errors.postalCode?.message}</p>
                            </div>
                            <button type="submit" className="w-full mt-5 primary-button">Next</button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
Shipping.auth = true;