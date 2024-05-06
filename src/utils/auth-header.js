import Cookies from "js-cookie";

const authHeader = () => {
  return Cookies.get("jwt");
};

export default authHeader;
