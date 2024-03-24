import {hasCookie} from "cookies-next";


export function isAuthenticated() {
  return hasCookie('token');
}