"use client"

import { Icon } from "@iconify/react";
import ControllItem from "@/components/rooms/controll-item";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const Controll = () => {
    const router = useRouter()
    const {
        localWebcamOn,
        localMicOn,
        localScreenShareOn,
        leave,
        end,
        toggleMic,
        toggleWebcam,
        enableScreenShare,
        disableScreenShare,
        toggleScreenShare
    } = useMeeting();

    const handleEnableScreenShare = () => {
        // Enabling screen share
        enableScreenShare();
    };

    const handleDisableScreenShare = () => {
        // Disabling screen share
        disableScreenShare();
    };

    const handleToggleScreenShare = () => {
        // Toggling screen share
        toggleScreenShare();
    };

    const handleLeaveMeeting = () => {
        leave();
        window.location.href = "/dashboard";
    }

    const handleEndMeeting = () => {
        end();
        window.location.href = "/dashboard";
    };

    return (
        <div className="rounded-xl bg-cGraySecondary w-full flex justify-between p-3 items-center">
            <Dialog>
                <DialogTrigger
                    className="py-2 px-5 bg-cBgIcon rounded-lg transition group hover:bg-cPrimary cursor-pointer">
                    <Icon icon="eva:arrow-ios-back-fill" className="text-2xl text-cPrimary group-hover:text-white" />
                </DialogTrigger>

                {<ExitModal type="leave" handle={handleLeaveMeeting} />}
            </Dialog>
            <div className="flex gap-8">
                <ControllItem onClick={() => toggleMic()} icon="majesticons:microphone" disabled={!localMicOn} />
                <ControllItem onClick={() => toggleWebcam()} icon="majesticons:video" disabled={!localWebcamOn} />

                <Dialog>
                    <DialogTrigger>
                        <ControllItem icon="icon-park-solid:phone-telephone" big={true} />
                    </DialogTrigger>

                    {<ExitModal type="exit" handle={handleEndMeeting} />}
                </Dialog>

                <ControllItem onClick={() => handleToggleScreenShare()} icon="fluent:cast-20-filled"
                    disabled={localScreenShareOn} />
                <ControllItem icon="majesticons:chat-2-text" />
            </div>
            <div className="border border-red-700 rounded-xl flex gap-3 items-center px-2 h-full">
                <Icon icon="prime:circle-fill" className="text-red-700" />
                <p>05:30:00</p>
            </div>
        </div>
    )
}

const ExitModal = ({ type, handle }) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Exit Modal</DialogTitle>
                <DialogDescription>
                    Are You sure to {type} room?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => handle()} className="capitalize bg-cPrimary hover:bg-cPrimary/80">{type}</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default Controll