import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "utils/store";

const navLinks = [
  {
    to: '/',
    title: 'Home'
  },
  {
    to: '/cart',
    title: 'Cart',
  },
  {
    to: '/auth/login',
    title: 'Login'
  }
]


export default function Header() {
  const { status, data: session } = useSession();

  const { state } = useStore();
  const [ cartItemsCount, setCartItemsCount ] = useState(0);

  useEffect(() => {
    // reduce: loops over the array and the return value is processed in the next process  -> reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
    setCartItemsCount(state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [state.cart.cartItems]);

    return (
      <header className="shadow">
        <div className="container flex-between gap-4">
            <h1 className="text-2xl font-semibold font-serif">
              <Link href='/'>Arizona</Link>
            </h1>
            
            <nav className="flex-center gap-5">
              <Link href='/cart' className='relative'>
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-[8px] -right-[15px] text-xs text-white bg-red-500 px-1 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === 'loading'? 'Loading'
                : status === 'authenticated'? <p>{session.user.name}</p>
                : <Link href='/auth/login'>Login</Link>}
            </nav>
        </div>
      </header>
    )
  }
