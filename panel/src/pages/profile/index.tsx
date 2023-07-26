import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL, months } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const state = useSelector((state: IRootState) => state);
  const [userRoleName,setUserRoleName] = useState<string>("");

  const tarih = new Date(state.user.creationDate);
  const gun: number = tarih.getDate();
  const ay: string = months[tarih.getMonth()];
  const yil: number = tarih.getFullYear();

  useEffect(()=>{
    return () => {
      axios.get(REQUEST_URL+'/getUserRoleName',{
        headers:{
          'Authorization':'Bearer '+ state.user.token
        }
      }).then((response)=>{
        setUserRoleName(response.data.roleName)
      })
    }
  },[])

  return (
    <>
      <div className="stats stats-vertical lg:stats-horizontal shadow mt-5">
        <div className="stat">
          <div className="stat-title">Kullanıcı Adı</div>
          <div className="stat-value">{state.user.username}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Hesap Açılış Tarihi</div>
          <div className="stat-value">
            {gun} {ay} {yil}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Kullanıcı Yetkisi</div>
          <div className="stat-value">{userRoleName}</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
