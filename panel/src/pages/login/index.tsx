import { ILoginForm } from "@/interfaces/ILoginForm";
import { login } from "@/redux/actions/user";
import { AppDispatch } from "@/redux/store";
import React, { ChangeEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    username: "",
    password: "",
  });
  const state = useSelector((state) => state);

  return (
    <>
      <div>LoginPage</div>
      <input
        type="text"
        placeholder="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLoginForm({
            ...loginForm,
            username: e.currentTarget.value,
          });
        }}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLoginForm({
            ...loginForm,
            password: e.currentTarget.value,
          });
        }}
      />
      <button onClick={() => dispatch<any>(login(loginForm))}>Giriş Yap</button>
    </>
  );
}

export default LoginPage;
