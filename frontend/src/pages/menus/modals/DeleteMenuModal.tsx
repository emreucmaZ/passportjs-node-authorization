import {
    Box,
    Button,
    Modal
} from "@mui/material";
import React, { useState } from "react";
import { modalBoxStyle } from "@/variables";
import { deleteMenu } from "./functions";
import { IDeleteMenuModalProps } from "./interfaces";

function DeleteMenuModal({ isVisible, handleClose, state, menuId}: IDeleteMenuModalProps) {
    return (
        <>
            <Modal open={isVisible} onClose={handleClose}>
                <Box sx={modalBoxStyle}>
                    <div className="mb-8">
                        <h1 className="font-bold text-xl">Kullanıcı Sil</h1>
                    </div>

                    <div>
                        <Button variant="contained" color="error" onClick={() => {
                            deleteMenu(menuId, state, handleClose);
                        }}>
                            Menüyü Sil
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default DeleteMenuModal;
