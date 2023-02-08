import Link from "next/link";
import { useForm } from "react-hook-form";

import Layout from "components/layout";
export default function Register() {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const submitHandler = () => {

    }
  return (
    <Layout title='Register' className='flex flex-col'>
        <section className="grow flex-center">
            <div className="container">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="container py-16 max-w-[30rem] ring-1 ring-slate-200 shadow-xl rounded-lg">
                        <div className="flex-between gap-1">
                            <div className="input-field">
                                <label>First Name</label>
                                <input type="text" autoFocus { 
                                    ...register('firstName', { 
                                        required: 'First Name is required' ,
                                        pattern: {
                                            value: /^[a-zA-Z_.-]+$/i,
                                            message: 'Please, Enter a valid name'
                                        }
                                    })} 
                                />
                                <p className={!errors.firstName && 'pb-5'}>{errors.firstName?.message}</p>
                            </div>
                            <div className="input-field">
                              <label>Last Name</label>
                              <input type="text" autoFocus { 
                                  ...register('lastName', { 
                                      required: 'Last Name is required' ,
                                      pattern: {
                                          value: /^[a-zA-Z_.-]+$/i,
                                          message: 'Please, Enter a valid name'
                                      }
                                  })} 
                              />
                              <p className={!errors.lastName && 'pb-5'}>{errors.lastName?.message}</p>
                          </div>
                        </div>
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
                            <p className={!errors.email && 'pb-5'}>{errors.email?.message}</p>
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <input type="password" {
                                ...register('password', { 
                                    required: 'Password is required' ,
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be more than 6 characters'
                                    }
                                })}
                            />
                            <p className={!errors.password && 'pb-5'}>{errors.password?.message}</p>
                        </div>
                        <button type="submit" className="w-full mt-5 primary-button">Register</button>
                        <p className="text-center text-sm mt-4">Already have an accout? <Link href='/auth/login' className="font-semibold">Login</Link></p>
                    </div>
                </form>
            </div>
        </section>
    </Layout>
  )
}
