import { useEffect, useRef } from "react";

interface AudioProps {
  stream: MediaStream | null;
}

export const Audio = ({ stream }: AudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.srcObject = stream;


      if (stream) {
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length > 0) {
          audioTracks.forEach(track => {
            track.enabled = true;
          });
        }
      }
    }

    return () => {
      if (audioElement) {
        audioElement.srcObject = null;
      }
    };
  }, [stream]);

  return <audio ref={audioRef} autoPlay />;
};