import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

function isLoggedIn() {
  const token = cookies.get("token");
  if (token && token != "") {
    return true;
  } else {
    return false;
  }
}

function getToken() {
  return cookies.get("token");
}

function setToken(value) {
  cookies.set("token", value, "1d");
}

function removeToken(value) {
  cookies.remove("token");
}

export { isLoggedIn, getToken, setToken, removeToken };
