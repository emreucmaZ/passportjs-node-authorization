import { findChildMenus } from '@/components/AppBar/helpers'
import { IMenu } from '@/interfaces';
import { REQUEST_URL } from '@/variables';
import axios from 'axios';
import React,{useState,useEffect} from 'react'

function index() {
  const [menus,setMenus] = useState<IMenu[]>([]);
  
  useEffect(() => {
    function getMenus(){
      axios.get(REQUEST_URL + '/menus').then(response=>setMenus(response.data.menus));
    }
  
    return () => {
      getMenus();
    }
  }, [])
  

  const rootMenus = findChildMenus("0",menus);
  
  return (
    <div>
      {
        rootMenus.map(menu=>{
          return <div>{menu.title}</div>
        })
      }
    </div>
  )
}

export default index