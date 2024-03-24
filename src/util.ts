import {getCookie, hasCookie} from "cookies-next";


export function isAuthenticated() {
  return hasCookie('token');
}

export function getAuthenticatedHeaders() {
  return {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': 'Bearer ' + getCookie('token')
  };
}