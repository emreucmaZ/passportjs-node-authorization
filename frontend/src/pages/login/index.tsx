import { ILoginForm } from "@/interfaces/ILoginForm";
import { login } from "@/redux/actions/user";
import React, { ChangeEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    username: "",
    password: "",
  });
  const state = useSelector((state) => state);
  console.log(state);

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
      <button onClick={() => dispatch(login(loginForm))}>Konsola log et</button>
    </>
  );
}

export default LoginPage;
