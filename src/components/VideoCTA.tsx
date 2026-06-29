import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";

const VideoCTA = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // slow motion
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/tnfly.mp4" 
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-20 h-20 bg-[#E8FF1A] hover:bg-[#d4eb14] cursor-pointer rounded-full flex items-center justify-center mb-12 mx-auto shadow-2xl text-white text-lg font-extrabold"
        >
          {isPlaying ? <Play size={20}/> : <Pause size={20}/>}
        </motion.button>

        {/* <h2 className="text-xl md:text-2xl font-black text-white uppercase leading-tight max-w-4xl mx-auto">
          Only The Brave Can Unravel Earth's Treasures
        </h2> */}
      </div>
    </section>
  );
};

export default VideoCTA;
