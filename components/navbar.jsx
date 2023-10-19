import {useUser} from "@clerk/nextjs";

export const Navbar = () => {
    const {user} = useUser()

    return (
        <div className="flex justify-between items-center px-5 py-3 bg-cGraySecondary rounded-xl font-semibold">
            <h3>Hallo {user?.fullName}, ready to meeting?</h3>
        </div>
    )
}
