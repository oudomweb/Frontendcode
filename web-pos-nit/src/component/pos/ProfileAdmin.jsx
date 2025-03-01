import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    frm: {
      name: "",
      category: "",
      email: "",
      phone: "",
      position: 0,
      dob: "",
    },
    crop: {
      img: "",
      blob: null,
      avatar: "/public/default.png",
    },
    vv: null,
    mdl_editpf: null,
    mdl_crop: null,
    mdl_editInfo: null,
    mdl_editPass: null,
    Pfavtar: null,
    selectedId: 1,
    userinfo: {
      id: 1,
      fname: "កាន",
      lname: "សុខមាន",
      email: "kansokmean006@gmail.com",
      phone: "0979638575",
      position: "Admin",
      dob: "2003-01-01",
    },
  });

  const onloadProfile = async () => {
    try {
      const res = await axios.get("/api/students/index.php");
      console.log("Profile Photo:", res.data.data[0].photo);
      setProfile((prevProfile) => ({
        ...prevProfile,
        Pfavtar: res.data.data[0].photo,
      }));
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };


  useEffect(() => {
    onloadProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, onloadProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};


export const useProfile = () => {
  return useContext(ProfileContext);
};
