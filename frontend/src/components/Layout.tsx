import { AppProps } from 'next/app'
import React from 'react'

function Layout({Page}:any) {
  return (
    <>
        {Page}
    </>
  )
}

export default Layout