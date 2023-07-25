import { logOut } from '@/redux/actions/user';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Logout() {
    const dispatch = useDispatch();
    const router =useRouter();

    useEffect(() => {
      return () => {
        dispatch<any>(logOut())
        router.replace('/')
    }
    }, [])
    
  return (
    <div>Çıkış Yapılıyor</div>
  )
}

export default Logout