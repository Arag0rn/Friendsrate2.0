import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../redux/Hooks/useAuth";
import { RoomContext } from "../Context/RoomContext";

export const MainPageComp = () => {
  const { ws, me } = useContext(RoomContext);
  const { user } = useAuth();
  const [userData, setUserData] = useState(() => {
    return {
      userName: user?.username,
      avatarURL: user?.avatarURL,
      rate: user?.rate,
      ratingCount: user?.ratingCount
    };
  });

  console.log(user);
  


  useEffect(() => {
    if (user) {
      setUserData({
        userName: user.username,
        avatarURL: user.avatarURL,
        rate: user.rate,
        ratingCount: user.ratingCount
      });
    }
  }, [user]);

 
  const value = ""; 
  const selectedLanguage = "UA"; 
  const selectedGender = ""; 

  const connectToRoom = () => {
    if (ws && me) {
      ws.emit('create-room', { 
        peerId: me._id, 
        value, 
        selectedLanguage, 
        selectedGender, 
        userData, 
        userLanguage: user?.language, 
        userGender: user?.gender, 
        userAge: "20" 
      });
    } else {
      console.error("WebSocket or User undefined");
    }
  };

  return (
    <div className="container flex flex-col items-center h-screen">
      <Link onClick={connectToRoom} className="pointer" to="/connect">
        <Logo width={230} height={230} style={{ marginTop: "201px" }} />
      </Link>
      <span className="text-center font-bold text-[28.843px] leading-normal">Let’s talk</span>
    </div>
  );
};