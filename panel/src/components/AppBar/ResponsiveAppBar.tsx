import * as React from "react";
import { IPage } from "./interfaces";
import { getUserPermissions } from "@/helpers";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/interfaces/IRootState";
import { useRouter } from "next/router";

const pages: IPage[] = [
  { title: "Kullanıcılar", permission_name: "superadmin", url: "/users" },
  { title: "Roller", permission_name: "superadmin", url: "/roles" },
  { title: "Blog Yazıları", permission_name: "", url: "/blogs" },
  { title: "Resimler", permission_name: "", url: "/images" },
  { title: "Menüler", permission_name: "", url: "/menus" },
  { title: "Loglar", permission_name: "superadmin", url: "/logs" },
  {
    title: "Sosyal Bağlantılar",
    permission_name: "",
    url: "/socialConnections",
  },
];

function ResponsiveAppBar() {
  const state = useSelector((state: IRootState) => state);
  const [permissions, setPermissions] = React.useState<string[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    return () => {
      getUserPermissions(state, setPermissions);
    };
  }, []);

  return (
    <>
      <div className="navbar bg-blue-600 relative z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {pages.map((page) => {
              if (page.permission_name == "") {
                return (
                  <>
                    <li
                      onClick={() => {
                        router.push(page.url);
                      }}
                    >
                      <a>{page.title}</a>
                    </li>
                  </>
                );
              }
              if (permissions?.indexOf(page.permission_name) > -1) {
                return (
                  <li
                    onClick={() => {
                      router.push(page.url);
                    }}
                  >
                    <a>{page.title}</a>
                  </li>
                );
              }
            })}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl text-white">
            ÖB MTAL' Blog
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            {pages.map((page) => {
              if (page.permission_name == "") {
                return (
                  <>
                    <li
                      onClick={() => {
                        router.push(page.url);
                      }}
                    >
                      <a>{page.title}</a>
                    </li>
                  </>
                );
              }
              if (permissions?.indexOf(page.permission_name) > -1) {
                return (
                  <li
                    onClick={() => {
                      router.push(page.url);
                    }}
                  >
                    <a>{page.title}</a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="navbar-end text-white">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                onClick={() => {
                  router.push("/logout");
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-log-out"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user-circle"
                width="24"
                onClick={()=>{
                  router.push('/profile')
                }}
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
                <circle cx="12" cy="12" r="9" />{" "}
                <circle cx="12" cy="10" r="3" />{" "}
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />{" "}
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
export default ResponsiveAppBar;
