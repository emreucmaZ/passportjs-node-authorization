import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserPermissions } from "@/helpers";
import { useRouter } from "next/router";
import { ISocialConnection } from "@/redux/interfaces/socialConnection";
import { IImage } from "../images/interfaces";
import SocialConnectionList from "./SocialConnectionList";

function Users() {
  const state = useSelector((state: IRootState) => state);
  const router = useRouter();
  const [socialConnections, setSocialConnections] = useState<ISocialConnection[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [refreshWhenDataChange, setRefreshWhenDataChange] = useState();

  useEffect(() => {
    function getSocialConnections() {
      axios
        .get(REQUEST_URL + "/socialConnections", {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((response) => {
          setSocialConnections(response.data.socialConnections);
        })
        .catch((err) => null);
    }
    function getImages(){
      axios
        .get(REQUEST_URL + "/images")
        .then((response) => {
          setImages(response.data.images);
        })
        .catch((err) => null);
      
    }
    
    return () => {
      getUserPermissions(state, setPermissions);
      getImages();
      getSocialConnections();
    };
  }, [refreshWhenDataChange]);

  return (
    <>
    <div className="mt-4"></div>
      <SocialConnectionList
        setRefreshWhenDataChange={setRefreshWhenDataChange}
        state={state}
        images={images}
        socialConnections={socialConnections}
        permissions={permissions}
        router={router}
      />
    </>
  );
}

export default Users;
