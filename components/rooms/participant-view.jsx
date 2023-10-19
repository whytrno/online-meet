"use client"

import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";
import { ParticipantVideoOff } from "@/components/rooms/participant-video-off";

export const ParticipantView = ({ participant }) => {
    const micRef = useRef(null);
    const {
        webcamStream,
        micStream,
        webcamOn,
        micOn,
        isLocal,
        screenShareStream
    } = useParticipant(participant.id, {});

    // useEffect(() => {
    //     console.log(webcamOn, micOn)
    // }, [webcamOn, micOn]);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div className="grid-cols-1 h-full w-full bg-cPrimary rounded-xl relative">
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {
                webcamOn ? (
                    <div className="w-full h-full relative bg-customPrimary rounded-xl overflow-hidden">
                        <ReactPlayer
                            playsinline
                            pip={false}
                            light={false}
                            controls={false}
                            muted={true}
                            playing={true}
                            url={videoStream}
                            height={"100%"}
                            width={"100%"}
                            className="react-player relative h-full"
                            onError={(err) => {
                                console.log(err, "participant video error");
                            }}
                        />
                    </div>
                ) : (
                    <ParticipantVideoOff />
                )
            }
            <div className="bottom-10 left-10 absolute flex gap-5 z-[99]">
                {
                    !micOn && (
                        <div
                            className=" rounded-xl bg-white text-white w-min py-3 px-4 whitespace-nowrap">
                            <Icon icon="majesticons:microphone" className="text-2xl text-red-600" />
                        </div>
                    )
                }
                {
                    !webcamOn && (
                        <div
                            className=" rounded-xl bg-white text-white w-min py-3 px-4 whitespace-nowrap">
                            <Icon icon="majesticons:video" className="text-2xl text-red-600" />
                        </div>
                    )
                }
                {
                    screenShareStream && (
                        <div
                            className="rounded-xl bg-white text-white w-min py-3 px-4 whitespace-nowrap">
                            <Icon icon="fluent:cast-20-filled" className="text-2xl text-cPrimary" />
                        </div>
                    )
                }
            </div>
            <div
                className="bottom-10 right-10 rounded-xl bg-white text-cPrimary w-min absolute py-3 px-4 whitespace-nowrap">
                {participant.displayName}
            </div>
        </div>
    )
}
