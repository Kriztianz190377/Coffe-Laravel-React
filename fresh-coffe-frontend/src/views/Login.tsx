import { createRef, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { useAuth } from "../hooks/useAuth";





export default function Login() {

  const [errors, setErrors] = useState<string[]>([]);

  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  // ✅ Mostrar el warning solo si realmente hay error de password
  const hasPasswordError = useMemo(() => {
    return errors.some((e) => e.toLowerCase().includes("password"));
  }, [errors]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const dataUser = {
      email: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
    };

    login({ dataUser, setErrors, emailRef, passwordRef })

  };
  return (
    <>
      <h1 className='text-4xl font-black text-center'>Log in</h1>

      <div className='md:w-4/w-full 12  bg-white shadow-md mt-10 px-5 py-10 rounded-lg'>
        <form
          onSubmit={handleSubmit} noValidate
          className='mb-5'>
          {errors.length > 0 && (
            <div className="mb-4 space-y-2">
              {errors.map((msg, idx) => (
                <Alert key={idx}>{msg}</Alert>
              ))}
            </div>
          )}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block uppercase text-gray-500 font-bold'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Your email'
              className='bg-gray-50 p-3 w-full rounded-lg  '
              ref={emailRef}
            />
          </div>
          <div className='mb-4'>
            {hasPasswordError && (
              <Alert variant="warning">
                Password must contain letters, numbers and symbols
              </Alert>
            )}
            <label
              htmlFor='password'
              className='mb-2 block uppercase text-gray-500 font-bold'
            >
              Password
            </label>
            <input
              id='  password'
              name='password'
              type='password'
              placeholder='Your password'
              className='bg-gray-50 p-3 w-full rounded-lg  '
              ref={passwordRef}
            />
          </div>

          <input
            type='submit'
            value='Log in'
            className='bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 
                    text-white rounded-lg'
          />
        </form>

        <nav className='mt-5 hover:text-sky-700'>
          <Link to="/auth/register">
            Don't have an account? Create one
          </Link>
        </nav>
      </div>
    </>
  )
}
