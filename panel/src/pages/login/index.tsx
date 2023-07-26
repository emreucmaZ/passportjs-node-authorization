import { ILoginForm } from "@/interfaces/ILoginForm";
import { login, signup } from "@/redux/actions/user";
import { IRootState } from "@/redux/interfaces/IRootState";
import { AppDispatch } from "@/redux/store";
import React, { ChangeEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    username: "",
    password: "",
  });
  
  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            ÖB MTAL' Blog
          </h1>
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Kullanıcı Adı</span>
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginForm({
                    ...loginForm,
                    username: e.currentTarget.value,
                  });
                }}
                type="text"
                placeholder="Kullanıcı Adı"
                className="w-full input input-bordered input-primary"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Şifre</span>
              </label>
              <input
                type="password"
                placeholder="ogrenci123*"
                className="w-full input input-bordered input-primary"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginForm({
                    ...loginForm,
                    password: e.currentTarget.value,
                  });
                }}
              />
            </div>
            {/* <a
              href="#"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a> */}
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch<any>(login(loginForm));
                }}
                className="btn btn-primary"
                type="submit"
              >
                Giriş Yap
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch<any>(signup(loginForm));
                }}
                className="btn btn-primary ml-2"
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
