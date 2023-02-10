import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from 'next-auth/react';
import { toast } from "react-toastify";

import { getError } from "utils/error";

import Layout from "components/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const { redirect } = router.query;
    const { data: session } = useSession();

    useEffect(() => {
        if(session?.user)
            router.push(redirect || '/')
    }, [router, redirect, session]);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });
            if(result.error)
                toast.error(getError(result.error));

        } catch (err) {
            toast.error(getError(err));
        }
    }
  return (
    <Layout title='Login' className='flex flex-col'>
        <section className="grow flex-center">
            <div className="container">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="container py-16 max-w-[30rem] ring-1 ring-slate-200 shadow-xl rounded-lg">
                        <div className="input-field">
                            <label>Email</label>
                            <input type="text" autoFocus { 
                                ...register('email', { 
                                    required: 'Email is required' ,
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.-]+$/i,
                                        message: 'Please, Enter a valid email'
                                    }
                                })} 
                            />
                            <p>{errors.email?.message}</p>
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <input type="password" {
                                ...register('password', { 
                                    required: 'Password is required' ,
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be more than 6 characters',
                                    }
                                })}
                            />
                            <p>{errors.password?.message}</p>
                        </div>
                        <button type="submit" className="w-full mt-5 primary-button">Login</button>
                        <p className="text-center text-sm mt-4">Don&apos;t have an accout? 
                            <Link href={`/auth/register${redirect? `?redirect=${redirect}` : ''}`} className="font-semibold">  Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    </Layout>
  )
}
