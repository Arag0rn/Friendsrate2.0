import { useEffect, useRef } from "react";

interface AudioProps {
    stream: MediaStream | null;
    isMuted: boolean; 
}

export const Audio = ({ stream, isMuted }: AudioProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        
        if (audioElement) {
            audioElement.srcObject = stream;

   
            if (stream) {
                const audioTracks = stream.getAudioTracks();
                audioTracks.forEach(track => {
                    track.enabled = !isMuted; 
                });
            }
        }

        return () => {
            if (audioElement) {
                audioElement.srcObject = null;
            }
        };
    }, [stream, isMuted]); 

    return <audio ref={audioRef} autoPlay />;
};