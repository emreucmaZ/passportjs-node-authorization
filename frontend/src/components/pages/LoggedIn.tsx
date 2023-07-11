import { logOut } from '@/redux/actions/user';
import React from 'react'
import { useDispatch } from 'react-redux'

function LoggedIn({router}:any) {

    const dispatch = useDispatch();

  return (
    <>

    <div>Zaten Giriş Yapıldı</div>
    <button onClick={()=>{
        dispatch<any>(logOut())
    }}>Çıkış Yap</button>
    <button onClick={()=>{
       router.push('/')
    }}>Ana Sayfaya Dön</button>
    
    </>
  )
}

export default LoggedIn