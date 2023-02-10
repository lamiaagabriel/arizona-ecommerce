import Link from 'next/link';
import { useStore } from 'utils/store';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import CheckoutWizard from 'components/CheckoutWizard';
import Layout from "components/layout";

export default function PlaceOrder() {
    const { data: session } = useSession();
    const router = useRouter();
    const { state: { cart }, dispatch } = useStore();
    const { cartItems, paymentMethod, shippingAddress } = cart;
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingPrice = 10;
    const taxPrice = 10;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    
    const placeOrderHandler = async () => {
        const { data: { _id } } = await axios.post('http://localhost:3000/api/orders', {
            user: session._id,
            items: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        });
        console.log(_id)
        router.replace(`/orders/${_id}`);
        dispatch({ type: 'RESET_CART_ITEMS' });
        Cookies.set('cart', JSON.stringify({
            ...cart,
            cartItems: []
        }));
    }
    return (
        <Layout title='Place Order'>
            <section>
                <div className="container">
                    <CheckoutWizard currentStep={4} />
                    <h1 className='font-semibold text-xl pb-4'>Place Order</h1>
                    <div className='grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-4'>
                        <div className='flex-col-between gap-4'>
                            <div className='card p-4 text-lg'>
                                <div className='flex-between gap-2'>
                                    <h1 className='font-semibold pb-4'>Shipping Address</h1>
                                    <Link href='/shipping' className='text-blue-800'>Edit</Link>
                                </div>
                                <div className="w-full [&>p]:flex-between p-2">
                                    <p>Full Name: <span>{shippingAddress.name}</span></p>
                                    <p>Address: <span>{shippingAddress.address}</span></p>
                                    <p>Country: <span>{shippingAddress.country}</span></p>
                                    <p>City: <span>{shippingAddress.city}</span></p>
                                    <p>Postal Code: <span>{shippingAddress.postalCode}</span></p>
                                </div>
                            </div>

                            <div className='card p-4 c'>
                                <div className='flex-between gap-2'>
                                    <h1 className='font-semibold pb-4'>Payment Method</h1>
                                    <Link href='/payment' className='text-blue-800'>Edit</Link>
                                </div>
                                <p>{paymentMethod}</p>
                            </div>

                            <div className='card p-4'>
                                <div className='flex-between gap-2'>
                                    <h1 className='font-semibold pb-4 text-lg'>Order Items</h1>
                                    <Link href='/cart' className='text-blue-800'>Edit</Link>
                                </div>
                                <table className='w-full'>
                                    <thead className='border-b border-b-slate-400 [&>tr>th]:py-2 md:[&>tr>th]:py-4'>
                                        <tr>
                                            <th>Title</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center [&>tr>td]:py-2 md:[&>tr>td]:py-4'>
                                        {cartItems.map(product => (
                                            <tr key={product.slug}>
                                                <td>
                                                    <Link href={'/products/' + product.slug}>
                                                        <div className='flex-start gap-4'>
                                                            <Image
                                                                src={product.image}
                                                                alt={product.title}
                                                                width={1000}
                                                                height={1000}
                                                                className='w-16 h-16 object-cover object-center'
                                                            />
                                                            {product.title}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td>{product.quantity}</td>
                                                <td>${product.price}</td>
                                                <td>${product.price * product.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div className='card p-4 text-lg'>
                                <h1 className='font-semibold pb-4'>Order Summary</h1>
                                <div className="w-full [&>p]:flex-between p-2">
                                    <p>Items: <span>${itemsPrice}</span></p>
                                    <p>shipping: <span>${shippingPrice}</span></p>
                                    <p>tax: <span>${taxPrice}</span></p>
                                    <p>total: <span>${totalPrice}</span></p>
                                    <button className='w-full mt-2 primary-button' onClick={placeOrderHandler}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
PlaceOrder.auth = true;