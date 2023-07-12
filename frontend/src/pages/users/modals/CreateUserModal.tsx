import {
  Box,
  Button,
  TextField,
  Input,
  InputLabel,
  Modal,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { ICreateUpdateUserForm, ICreateUserModalProps } from "./interfaces";
import { modalBoxStyle } from "@/variables";
import createUser from "./functions";
import { IRole } from "@/redux/interfaces/role/IRole";

function CreateUserModal({ isVisible, handleClose,roles,state }: ICreateUserModalProps) {
  const [createUserForm, setCreateUserForm] = useState<ICreateUpdateUserForm>({
    username: "",
    password: "",
    roleId: null,
  });

  return (
    <>
      <Modal open={isVisible} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <div className="mb-8">
            <h1 className="font-bold text-xl">Kullanıcı Ekle</h1>
          </div>

          <FormControl fullWidth>
            <TextField
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCreateUserForm({
                  ...createUserForm,
                  username: e.currentTarget.value,
                });
              }}
              id="username-input"
              aria-describedby="username-helper-text"
            />
          </FormControl>
          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <TextField
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCreateUserForm({
                  ...createUserForm,
                  password: e.currentTarget.value,
                });
              }}
              id="password-input"
              aria-describedby="password-helper-text"
            />
          </FormControl>
          <FormControl fullWidth sx={{marginTop:2}}>
            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
            <Select

              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={createUserForm.roleId}
              label="Age"
            >
              {
                roles?.map((role:IRole)=>{
                  return <MenuItem onClick={()=>{
                    setCreateUserForm({
                      ...createUserForm,
                      roleId:role._id
                    })
                  }} value={role._id}>{role.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              createUser(createUserForm,state);
            }}
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Ekle
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default CreateUserModal;
