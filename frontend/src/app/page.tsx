"use client";

import { REQUEST_URL } from '@/variables';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import User from '@/interfaces/User';



function Page() {

  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    try {
      axios.get(REQUEST_URL + '/getUsers').then((res) => {
        setUsers(res.data)
      }).catch(error => {
        console.log(error);
      })
    } catch (err) {
      console.log(err);
    }

  });



  return (
    <>

    </>
  )
}

export default Page