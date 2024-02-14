import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);
  return (
    <>
      <div>Logout</div>
      <Button onClick={logoutUser}>Log out</Button>
    </>
  );
}

export default Logout;
