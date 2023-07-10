"use client";

import { User, UserInformationState } from '@/interfaces/User';
import { REQUEST_URL } from '@/variables';
import axios from 'axios';
import React, { useState, useEffect, FormEvent } from 'react'



function Login() {
    const [users, setUsers] = useState<User[]>();
    const [userInformation, setUserInformation] = useState<UserInformationState>({
        username: '',
        password: ''
    })

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        axios.post(REQUEST_URL + '/login', userInformation).then((response) => {
            console.log(response.data.token);
            axios.get(REQUEST_URL + '/authorize', { headers: { 'Authorization': `Bearer ${response.data.token}` } }).then((res) => {
                alert(res.data.message)
            }).catch(err => {
                console.log(err);
            })
        })
    };

    return (
        <>
            <div className="w-full flex justify-center items-center h-full flex-col" style={{ minHeight: " 100vh " }}>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Username
                        </label>
                        <input onChange={(e: FormEvent<HTMLInputElement>) => {
                            setUserInformation({ ...userInformation, username: e.currentTarget.value })
                        }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input onChange={(e: FormEvent<HTMLInputElement>) => {
                            setUserInformation({ ...userInformation, password: e.currentTarget.value })
                        }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
            <div>
                {users?.map(user => {
                    return <div>{user.username}</div>
                })}
            </div>
        </>
    )
}

export default Login