import { logOut } from '@/redux/actions/user';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
      return () => {
        dispatch<any>(logOut())
    }
    }, [])
    
  return (
    <div>Çıkış Yapılıyor</div>
  )
}

export default Logout