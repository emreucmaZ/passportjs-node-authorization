import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";

export function getUserPermissions(state: IRootState, setState: any) {
  axios
    .get(REQUEST_URL + "/getUserPermissions", {
      headers: { Authorization: `Bearer ${state.user.token}` },
    })
    .then((response) => {
      console.log(response);
      
      setState(response.data.permissions);
    }).catch(err=>{
      console.log(err);
      
    })
}
