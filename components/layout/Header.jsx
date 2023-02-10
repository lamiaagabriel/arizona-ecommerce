import Link from "next/link";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "utils/store";
import Cookies from "js-cookie";

// NavLink from react-router is a function component that is a specialized version of Link which exposes a innerRef prop for that purpose.
export default function Header() {
  const { status, data: session } = useSession();

  const { state, dispatch } = useStore();
  const [ cartItemsCount, setCartItemsCount ] = useState(0);

  useEffect(() => {
    // reduce: loops over the array and the return value is processed in the next process  -> reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
    setCartItemsCount(state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [state.cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'RESET_CART' })
    signOut({ callbackUrl: '/' });
  }
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
             {status === 'authenticated'? (
                <Menu as='div' className='relative inline-block'>
                  <Menu.Button>{session.user.name}</Menu.Button>
                  <Menu.Items className='w-56 bg-white flex-col-between gap-1 absolute right-0 origin-top-right shadow-lg rounded-lg ring-1 ring-slate-200 p-2'>
                    <Menu.Item>
                      <Link href='/profile' className='p-2 hover:bg-slate-200'>
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href='/' className='p-2 hover:bg-slate-200'>
                        Link
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button onClick={logoutHandler} className='text-start p-2 hover:bg-slate-200'>Logout</button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              )
              : <Link href='/auth/login'>Login</Link>}
          </nav>
      </div>
    </header>
  )
}