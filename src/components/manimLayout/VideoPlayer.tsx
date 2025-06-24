import { useEffect, useRef, useState } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import type { Scene } from "@/zodTypes/scene";
import { useSceneVideo } from "@/hooks/useMedia";

interface VideoPlayerProps {
  selectedScene?: Scene
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({selectedScene}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const {data: videoBlob} = useSceneVideo(selectedScene?.id);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
 
  useEffect(() => {
    if (!videoBlob || !videoRef.current) return;

    // Pause and reset video before loading new blob
    const videoElement = videoRef.current;
    videoElement.pause();
    videoElement.currentTime = 0;
    setIsPlaying(false);

    const url = URL.createObjectURL(videoBlob);
    setVideoUrl(url);
    
    return () => {
        URL.revokeObjectURL(url); // frees old URL, but blob is still cached
      };
    
  }, [videoBlob]);

  useEffect(() => {
      const video = videoRef.current;
      if (!video || !videoUrl) return;

      video.load(); // Load the new source

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // AbortError: play was interrupted, or autoplay is blocked
            console.warn("Video play failed:", error);
            setIsPlaying(false);
          });
      }
    }, [videoUrl]);


  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#18181b] via-[#15171a] to-[#1a222d] rounded-2xl shadow-xl border border-[#232323] flex flex-col items-center p-4">
      <div className="relative w-full h-full flex-1 rounded-xl overflow-hidden bg-black border border-[#232323]">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain bg-black rounded-xl"
          onClick={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        {/* Play/Pause Overlay Button */}
        <button
          onClick={handlePlayPause}
          className="absolute left-4 bottom-4 bg-cyan-500/90 hover:bg-cyan-400/90 text-white rounded-full p-2 shadow-lg transition"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        {/* Fullscreen Button */}
        <button
          onClick={handleFullscreen}
          className="absolute right-4 bottom-4 bg-[#232323]/80 hover:bg-cyan-500/80 text-white rounded-full p-2 shadow-lg transition"
          aria-label="Fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full flex justify-between items-center mt-3">
        <span className="text-xs text-cyan-300 font-mono">Preview</span>
        <span className="text-xs text-[#b3b3b3]">Click video to play/pause</span>
      </div>
    </div>
  );
};

export default VideoPlayer;