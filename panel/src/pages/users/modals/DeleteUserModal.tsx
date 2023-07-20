import { Box, Button, Modal } from "@mui/material";
import React from "react";
import {
  IDeleteUserModalProps,
} from "./interfaces";
import { modalBoxStyle } from "@/variables";
import { deleteUser } from "./functions";

function DeleteUserModal({
  isVisible,
  handleClose,
  state,
  userId,
}: IDeleteUserModalProps) {
  const handleEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      deleteUser(userId, state, handleClose);
    }
  };

  return (
    <>
      <Modal
        onKeyDown={handleEnterKeyPress}
        open={isVisible}
        onClose={handleClose}
      >
        <Box sx={modalBoxStyle}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Kullanıcı Sil</h1>
          </div>

          <div>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteUser(userId, state, handleClose);
              }}
            >
              Kullanıcıyı Sil
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteUserModal;
