import { Icon } from "@iconify/react";

export const Loading = () => {
    return (
        <div
            className="h-full w-full flex justify-center items-center absolute top-0 left-0 z-50 backdrop-blur-sm">
            <Icon icon="line-md:loading-loop" className="text-4xl group-hover:text-cPrimary" />
        </div>
    )
}
