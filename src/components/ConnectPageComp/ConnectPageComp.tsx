import { ConnectionIcon, EndOfCallIcon, MuteIcon } from "../Logo";
import { useContext, useEffect, useState } from "react";
import { OpositUser, RoomContext } from "../Context/RoomContext";
import { Audio } from "../ChatRoomComp/Audio";
import { useSelector } from "react-redux";
import { usersNames } from "../../redux/Users/selectors";
import { ConnectionRing } from "./ConnectionRing";
import { useAuth } from "../../redux/Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const ConnectPageComp = () => {
    const [isConnected, setIsConnected] = useState(false);
    const { ws, me, peers, stream, clearPeers } = useContext(RoomContext);
    const usersInRoom = useSelector(usersNames);
    const { user } = useAuth();
    const [isMuted, setIsMuted] = useState(false);
    const navigate = useNavigate(); 

    const opositUser: OpositUser | null = Array.isArray(usersInRoom) 
        ? usersInRoom.find((u: OpositUser) => u.userName !== user?.username) || null 
        : null;

    useEffect(() => {
        if (Object.values(peers).length > 1) {
            setIsConnected(true);
        }
    }, [peers]);

    const onMuteChange = () => {
        setIsMuted(prev => !prev); 
    };

    const handleEndCall = () => {
        ws.emit("end-call");
        clearPeers();
        if (user) {
          navigate('/mainpage');
        } else {
          navigate('/');
        }
    };

    return (
        <>
            {isConnected ? (
                <>
                    {Object.values(peers).map((peer: any) => (
                        peer.id !== me?.id && <Audio key={peer.id} stream={peer.stream} isMuted={isMuted} />
                    ))}
                    <div className=''>
                        <button onClick={onMuteChange} style={{ background: "transparent", border: 'none' }}>
                            {isMuted ? <MuteIcon width={33} height={35}/> : <ConnectionIcon width={33} height={35}/>}
                        </button>
                        <button onClick={handleEndCall} style={{ background: "transparent", border: 'none', zIndex: '1000' }}>
                            <EndOfCallIcon width={44} height={44}/>
                        </button>
                    </div>
                </>
            ) : (
                <ConnectionRing/>
            )}
        </>
    );
};