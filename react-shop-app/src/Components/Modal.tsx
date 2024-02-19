import { Button } from "react-bootstrap";
import "../style/Modal.css";
import { useContext, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateModal() {
  const { closeModal } = useContext(ModalContext);
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") {
            closeModal();
          }
        }}
      >
        <div className="modal-content">
          <h3 className="d-flex ">Are You sure You want to Log out?</h3>
          <div className="d-inline">
            <Button
              className="close m-2"
              onClick={() => {
                logoutUser();
                closeModal();
              }}
            >
              Log out
            </Button>
            <Button className="close m-2" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateModal;
