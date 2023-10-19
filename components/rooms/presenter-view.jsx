import {useParticipant} from "@videosdk.live/react-sdk";
import {useEffect, useMemo, useRef} from "react";
import ReactPlayer from "react-player";

export const PresenterView = ({presenterId}) => {
    const {
        screenShareAudioStream,
        isLocal,
        screenShareStream,
        screenShareOn
    } = useParticipant(presenterId);

    const mediaStream = useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);
    const audioPlayer = useRef();

    useEffect(() => {
        if (
            !isLocal &&
            audioPlayer.current &&
            screenShareOn &&
            screenShareAudioStream
        ) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareAudioStream.track);

            audioPlayer.current.srcObject = mediaStream;
            audioPlayer.current.play().catch((err) => {
                if (
                    err.message ===
                    "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
                ) {
                    console.error("audio" + err.message);
                }
            });
        } else {
            audioPlayer.current.srcObject = null;
        }
    }, [screenShareAudioStream, screenShareOn, isLocal]);

    return (
        <>
            <ReactPlayer
                playIcon={<></>}
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={mediaStream}
                height={"100%"}
                width={"100%"}
                className="react-player relative h-full"
                onError={(err) => {
                    console.log(err, "participant video error");
                }}
            />
            <audio autoPlay playsInline controls={false} ref={audioPlayer}/>
        </>
    )
}
