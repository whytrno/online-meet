import { Icon } from "@iconify/react";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
    const sidebarItems = [
        {
            icon: "majesticons:home",
            href: "/",
        },
        {
            icon: "majesticons:video",
            href: "/rooms"
        },
        {
            icon: "majesticons:calendar",
            href: "/"
        },
        {
            icon: "majesticons:bell",
            href: "/"
        },
        {
            icon: "majesticons:settings-cog",
            href: "/"
        }
    ]
    return (
        <>
            <div className="flex flex-col justify-between items-center h-full text-cGrayPrimary w-full">
                <Icon icon="raphael:github" className="text-5xl text-cBlack" />

                <div className="flex flex-col justify-between gap-y-2 w-full">
                    {
                        sidebarItems.map((item, index) => (
                            <div key={index}
                                className="flex justify-center py-4 relative cursor-pointer w-full group h-full">
                                <Icon icon={item.icon} className="text-2xl group-hover:text-cPrimary" />
                            </div>
                        ))
                    }
                </div>

                <div>
                    <div
                        className="flex justify-center py-4 relative cursor-pointer w-full group h-full">
                        {/*<Icon icon="majesticons:logout" className="text-2xl group-hover:text-cPrimary"/>*/}
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;