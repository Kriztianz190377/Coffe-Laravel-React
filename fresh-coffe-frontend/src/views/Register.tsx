import { createRef, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";


import Alert from "../components/Alert";
import { useAuth } from "../hooks/useAuth";




export default function Register() {
  
  const [errors, setErrors] = useState<string[]>([]);
  
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const passwordConfirmationRef = createRef<HTMLInputElement>();
  
  const {register}=useAuth({
    middleware: 'guest',
    url: '/'
  });
  // ✅ Mostrar el warning solo si realmente hay error de password
  const hasPasswordError = useMemo(() => {
    return errors.some((e) => e.toLowerCase().includes("password"));
  }, [errors]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const dataUser = {
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
      password_confirmation: passwordConfirmationRef.current?.value ?? "",
    };

   register({dataUser, setErrors,nameRef,emailRef,passwordRef,passwordConfirmationRef})

  };

  return (
    <>
      <h1 className="text-4xl font-black">Create an account</h1>

      <div className="md:w-4/w-full 12 bg-white shadow-md mt-10 px-5 py-10 rounded-lg">
        <form onSubmit={handleSubmit} className="mb-5" noValidate>
          {errors.length > 0 && (
            <div className="mb-4 space-y-2">
              {errors.map((msg, idx) => (
                <Alert key={idx}>{msg}</Alert>
              ))}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block uppercase text-gray-500 font-bold"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="bg-gray-50 p-3 w-full rounded-lg"
              ref={nameRef}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block uppercase text-gray-500 font-bold"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              className="bg-gray-50 p-3 w-full rounded-lg"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            {hasPasswordError && (
              <Alert variant="warning">
                Password must contain letters, numbers and symbols
              </Alert>
            )}

            <label
              htmlFor="password"
              className="mb-2 block uppercase text-gray-500 font-bold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              className="bg-gray-50 p-3 w-full rounded-lg"
              ref={passwordRef}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="mb-2 block uppercase text-gray-500 font-bold"
            >
              Password confirmation
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Re-enter password"
              className="bg-gray-50 p-3 w-full rounded-lg"
              ref={passwordConfirmationRef}
            />
          </div>

          <input
            type="submit"
            value="Create Account"
            className="bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg"
          />
        </form>

        <nav className="mt-5 hover:text-sky-700">
          <Link to="/auth/login">Already have an account? Log in</Link>
        </nav>
      </div>
    </>
  );
}
