import React from 'react'
import { useSelector } from 'react-redux'

function HomePage() {
  const state = useSelector(state=>state);
  console.log(state);
  
  return (
    <div>HomePage</div>
  )
}

export default HomePage