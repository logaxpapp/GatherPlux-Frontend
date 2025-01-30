import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  exp: number;
}

export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes,
) => {
  Cookies.set(name, value, options);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};

export function isTokenValid(token: string | null): boolean {
  try {
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch {
    return false;
  }
}
