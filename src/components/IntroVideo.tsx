
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface IntroVideoProps {
    onComplete: () => void;
    onTransitionStart: () => void;
    fadeOut: boolean;
}

const IntroVideo = ({ onComplete, onTransitionStart, fadeOut }: IntroVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const transitionTriggered = useRef(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1;
        }
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current && !transitionTriggered.current) {
            const remaining = videoRef.current.duration - videoRef.current.currentTime;
            if (remaining <= 3) {
                transitionTriggered.current = true;
                onTransitionStart();
            }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
        >
            <video
                ref={videoRef}
                src="/donat.mp4"
                className="h-full w-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={onComplete}
                onTimeUpdate={handleTimeUpdate}
            />
        </motion.div>
    );
};

export default IntroVideo;
