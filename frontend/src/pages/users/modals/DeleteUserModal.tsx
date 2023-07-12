import {
    Box,
    Button,
    Modal
} from "@mui/material";
import React, { useState } from "react";
import { ICreateUpdateUserForm, ICreateUserModalProps, IDeleteUserModalProps } from "./interfaces";
import { modalBoxStyle } from "@/variables";
import { createUser, deleteUser } from "./functions";
import { IRole } from "@/redux/interfaces/role/IRole";
import { useFormik } from "formik";
import * as Yup from "yup"

function DeleteUserModal({ isVisible, handleClose, state, router, userId }: IDeleteUserModalProps) {
    return (
        <>
            <Modal open={isVisible} onClose={handleClose}>
                <Box sx={modalBoxStyle}>
                    <div className="mb-8">
                        <h1 className="font-bold text-xl">Kullanıcı Sil</h1>
                    </div>

                    <div>
                        <Button color="error" onClick={() => {
                            deleteUser(userId, state, router);
                        }}>
                            Kullanıcıyı Sil
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default DeleteUserModal;
