import {Icon} from "@iconify/react";

export const ParticipantVideoOff = () => {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl">
            <div
                className="w-full h-full relative bg-[#BCBCD3]/[40%] rounded-xl backdrop-blur-2xl z-10 flex items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-white">
                    <Icon icon="mdi:user" className="h-10 w-10 text-cPrimary"/>
                </div>
            </div>
            <div
                className="h-1/2 w-1/2 -top-20 -left-28 absolute bg-customPrimary rounded-full">
            </div>
            <div
                className="h-1/2 w-1/3 top-1/3 -left-20 absolute bg-customPrimary rounded-full">
            </div>
            <div
                className="h-1/2 w-1/3 -bottom-10 -left-10 absolute bg-customPrimary rounded-full">
            </div>
            <div
                className="h-1/2 w-1/2 -top-5 -right-10 absolute bg-[#B380DB] rounded-full">
            </div>
        </div>
    )
}
