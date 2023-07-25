import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { modalBoxStyle } from "@/variables";
import { deleteBlog } from "./functions";
import deleteSocialConnection from "./functions/updateSocialConnectionDeletion";
import { IDeleteSocialConnectionModalProps } from "./interfaces";

function DeleteSocialConnectionModal({
  isVisible,
  handleClose,
  state,
  socialConnectionId
}: IDeleteSocialConnectionModalProps) {
  return (
    <>
      <Modal open={isVisible} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Sosyal Bağlantıyı Sil</h1>
          </div>

          <div>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteSocialConnection(socialConnectionId, state, handleClose,true,()=>{});
              }}
            >
              Sosyal bağlantıyı Sil
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteSocialConnectionModal;
