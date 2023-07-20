import {
    Box,
    Button,
    Modal
} from "@mui/material";
import React, { useState } from "react";
import { modalBoxStyle } from "@/variables";
import * as Yup from "yup"
import { IDeleteRoleModalProps } from "./interfaces";
import deleteRole from "./functions/deleteRole";

function DeleteRoleModal({ isVisible, handleClose, state, router, roleId }: IDeleteRoleModalProps) {
    return (
        <>
            <Modal open={isVisible} onClose={handleClose}>
                <Box sx={modalBoxStyle}>
                    <div className="mb-8">
                        <h1 className="font-bold text-xl">Rolü Sil</h1>
                    </div>

                    <div>
                        <Button color="error" variant="contained" onClick={() => {
                            deleteRole(roleId, state, handleClose);
                        }}>
                            Rolü Sil
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default DeleteRoleModal;
