import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <>
        <div className="m-5">
          <Link to={"/signin"}>
            <h6 className="d-inline me-0">Log in</h6>
          </Link>

          <h6 className="d-inline ms-0"> please to leave a comment</h6>
        </div>
      </>
    );
  }
  return <div>{children}</div>;
};
export default ProtectedRoute;
