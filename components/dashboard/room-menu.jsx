import { Icon } from "@iconify/react";
import { useIsLoading } from "@/zustand/state";
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

export const RoomMenu = () => {
    const { setIsLoading } = useIsLoading()

    const createRoom = () => {
        setIsLoading(true)
    }

    const menus = [
        {
            icon: "majesticons:video",
            label: "Create Room",
            modal: <CreateModal />
        },
        {
            icon: "majesticons:video-plus",
            label: "Join Room",
            modal: <JoinModal createRoom={createRoom} />
        }
    ]

    return (
        <>
            {
                menus.map((menu, index) => (
                    <Dialog key={index}>
                        <DialogTrigger
                            className="cursor-pointer group hover:bg-cPrimary hover:text-white transition flex items-center justify-center w-full h-full rounded-xl bg-cGraySecondary">
                            <div className="flex flex-col gap-y-2">
                                <div
                                    className="flex justify-center py-2 px-5 bg-cPrimary rounded-xl text-white transition group-hover:bg-white group-hover:text-cPrimary">
                                    <Icon icon={menu.icon} className="text-8xl" />
                                </div>
                                <h1 className="font-semibold text-center">{menu.label}</h1>
                            </div>
                        </DialogTrigger>

                        {menu.modal}
                    </Dialog>
                ))
            }
        </>
    )
}

const CreateModal = ({ createRoom }) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Room</DialogTitle>
                <DialogDescription>
                    You have 5 minutes free trial, after that you will cost 1 coin per minutes.
                    Continue?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit">Submit</Button>
            </DialogFooter>
        </DialogContent>
    )
}

const JoinModal = () => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Join Room</DialogTitle>
                <DialogDescription>
                    You have 5 minutes free trial, after that you will cost 1 coin per minutes.
                    Continue?
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    )
}
