import {
    Box,
    Button,
    Modal
} from "@mui/material";
import React, { useState } from "react";
import { IDeleteBlogModalProps } from "./interfaces";
import { modalBoxStyle } from "@/variables";
import { deleteBlog } from "./functions";

function DeleteBlogModal({ isVisible, handleClose, state, blogId,router}: IDeleteBlogModalProps) {
    return (
        <>
            <Modal open={isVisible} onClose={handleClose}>
                <Box sx={modalBoxStyle}>
                    <div className="mb-8">
                        <h1 className="font-bold text-xl">Blog Yazısı Sil</h1>
                    </div>

                    <div>
                        <Button variant="contained" color="error" onClick={() => {
                            deleteBlog(blogId, state, handleClose);
                        }}>
                            Blog Yazısını Sil
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default DeleteBlogModal;
