import {
    createContext,
    useCallback,
    useEffect,
    useReducer,
    useState,
  } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import socketIOClient from "socket.io-client";
  import { addPeerAction, clearPeersAction } from "./PeerAction";
  import Peer from "peerjs";
  import { v4 as uuidV4 } from "uuid";
  import { peersReducer } from "./peersReducer";
  import { useAuth } from "../../redux/Hooks/useAuth";
  import { setUserNames } from "../../redux/Users/slice";
  import { usersNames } from "../../redux/Users/selectors";
  import { useNavigate } from 'react-router-dom'; 
  
  const server = "https://api.friendsrate.org";

  export interface OpositUser{
    userName: string,
    avatarURL: string,
    rate: number,
    ratingCount: number
}
  
  export const RoomContext = createContext<{
    ws: any;
    me: Peer | null;
    stream: MediaStream | undefined;
    peers: any;
    rateModalOpen: boolean;
    openRateModal: () => void;
    closeRateModal: () => void;
    clearPeers: () => void;
  } | null>(null); 
  
  const ws = socketIOClient(server);
  
  export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const [me, setMe] = useState<Peer | null>(null);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [rateModalOpen, setRateModalOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream>();
    const { user } = useAuth();
    const usersInRoom = useSelector(usersNames);
    const navigate = useNavigate(); 
  
    const opositUser: OpositUser | null = Array.isArray(usersInRoom)
      ? usersInRoom.find((u: OpositUser) => u.userName !== user?.username) || null
      : null;
    
    const reduxDispatch = useDispatch();
  
    const handleUserList = useCallback(
      ({ users, names, roomId }: { users: string[]; names: {}; roomId: string; }) => {
        navigate(`/chatRoom/${roomId}`); 
        users.forEach((peerId) => {
          if (stream && me) {
            const call = me.call(peerId, stream);
            call?.on("stream", (userVideoStream: MediaStream) => {
              dispatch(addPeerAction(peerId, userVideoStream));
            });
          }
        });
  
        reduxDispatch(setUserNames(names));
      },
      [reduxDispatch, stream, me, navigate] 
    );
  
    const clearPeers = useCallback(() => {
      dispatch(clearPeersAction());
      if (user !== null && opositUser?.userName && !opositUser.userName.startsWith("Unregistered User")) {
        setRateModalOpen(true);
      } else {
        if (user) {
          navigate("/main"); 
        } else {
          navigate("/"); 
        }
      }
    }, [opositUser?.userName, user, navigate]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const meId = uuidV4();
        const peer = new Peer(meId, {
          config: {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
          },
        });
        setMe(peer);
        try {
          navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            setStream(stream);
          });
        } catch (err) {
          console.error({ err });
        }
      }
    }, []);
  
    useEffect(() => {
      ws.on("get-user", handleUserList);
      ws.on("user-disconnected", clearPeers);
    }, [handleUserList, clearPeers]);
  
    useEffect(() => {
      if (!stream || !me) return; 
  
      ws.on("user-joined", ({ peerId, names }) => {
        reduxDispatch(setUserNames(names));
        console.log(`${peerId} was connected`);
        const call = me.call(peerId, stream);
        call.on("stream", (userVideoStream: MediaStream) => {
          dispatch(addPeerAction(peerId, userVideoStream));
        });
      });
  
      me.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          dispatch(addPeerAction(call.peer, userVideoStream));
        });
      });
      
      return () => {
        ws.off("user-joined");
        ws.off("get-user");
        ws.off("user-disconnected");
      };
    }, [stream, me, handleUserList, clearPeers, reduxDispatch]);
  
    useEffect(() => {
      const handlePopState = () => {
        ws.emit("end-call");
      };
  
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        ws.emit("end-call");
        event.returnValue = "";
      };
  
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);
  
    const openRateModal = () => setRateModalOpen(true);
    const closeRateModal = () => setRateModalOpen(false);
  
    return (
      <RoomContext.Provider
        value={{
          ws,
          me,
          stream,
          peers,
          rateModalOpen,
          openRateModal,
          closeRateModal,
          clearPeers,
        }}
      >
        {children}
      </RoomContext.Provider>
    );
  };