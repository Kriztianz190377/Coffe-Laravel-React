import useSWR from "swr";
import { clientAxios } from "../config/axios"
import type { AxiosError } from "axios";
import type { AuthProps, AuthResponse, LaravelErrors, LoginProps, RegisterProps, SwrAuthError, UseAuthReturn, User } from "../types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const useAuth = ({ middleware, url }: AuthProps = {} as AuthProps): UseAuthReturn => {

  const navigate = useNavigate();
  const token = localStorage.getItem('AUTH_TOKEN')

  const { data: user, error, mutate } = useSWR<User, SwrAuthError>(
    token ? "/api/user" : null, // ✅ importante
    () =>
      clientAxios('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.data)
        .catch((error) => {
          // ✅ el throw debe ser Error (string), no objeto
          const message =
            error?.response?.data?.message ??
            JSON.stringify(error?.response?.data?.errors ?? error?.message ?? "Unknown error");
          throw new Error(message);
        })
  )



  const login = async ({ dataUser, setErrors, emailRef, passwordRef }: LoginProps) => {

    try {
      const { data } = await clientAxios.post<AuthResponse>("/api/login", dataUser);
            localStorage.setItem('AUTH_TOKEN', data.token)

      // Opcional: limpiar inputs si todo OK        

      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";


      await mutate();
      navigate("/", { replace: true });

    } catch (error) {
      console.error(error);
      const err = error as AxiosError<{ errors?: LaravelErrors; message?: string }>;
      const fieldErrors = err.response?.data?.errors;

      if (err.response?.status === 422 && fieldErrors) {
        // Errores de validación Laravel
        setErrors(Object.values(fieldErrors).flat());
      } else if (err.response?.status === 500) {
        // Error interno del servidor
        setErrors(["Internal server error (check laravel.log)"]);
      } else {
        // Cualquier otro error (network, timeout, etc.)
        setErrors([err.message ?? "Unexpected error"]);
      }
    }
  }


  const register = async (
    { dataUser, setErrors}
    : RegisterProps) => {

    try {
      const { data } = await clientAxios.post("/api/register", dataUser);

      localStorage.setItem('AUTH_TOKEN', data.token);
     
      setErrors([]),
      await mutate();
      

    } catch (error) {
      console.error(error);
      const err = error as AxiosError<{ errors?: LaravelErrors; message?: string }>;
      const fieldErrors = err.response?.data?.errors;

      if (err.response?.status === 422 && fieldErrors) {
        // Errores de validación Laravel
        setErrors(Object.values(fieldErrors).flat());
      } else if (err.response?.status === 500) {
        // Error interno del servidor
        setErrors(["Internal server error (check laravel.log)"]);
      } else {
        // Cualquier otro error (network, timeout, etc.)
        setErrors([err.message ?? "Unexpected error"]);
      }
    }

  }

  const logout = async () => {
    try {

      await clientAxios.post<AuthResponse>("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('AUTH_TOKEN')
      await mutate(undefined);
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    // ✅ Si ruta protegida y NO hay token: redirigir
    if (middleware === "auth" && !token) {
      navigate("/auth/login", { replace: true });
      return;
    }

    // ✅ Si guest y ya hay user: redirigir
    if (middleware === "guest" && user && user.admin) {
      navigate('/admin', { replace: true });
      return;
    }
    if (middleware === "admin" && user && !user.admin) {
      navigate('/', { replace: true });
      return;
    }
    // ✅ Si guest y ya hay user: redirigir
    if (middleware === "guest" && url && user) {
      navigate(url, { replace: true });
      return;
    }

    // ✅ Si hay token pero falla /api/user (token inválido)
    if (middleware === "auth" && error && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [middleware, url, user, error, token, navigate]);



  return {
    login,
    register,
    logout,
    user,
    error

  }
}
