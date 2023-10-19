'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Icon } from "@iconify/react";

const LandingPage = () => {
    return (
        <>
            <div className='sm:hidden h-screen w-full bg-cPrimary flex justify-center items-center'>
                <h1 className='text-2xl font-semibold text-white'>Please open this bigger screen</h1>
            </div>
            <div className='px-40 py-10 text-cBlack space-y-10 hidden sm:flex flex-col h-screen justify-between'>
                <div className='flex justify-between'>
                    <div className="flex gap-2 items-center">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            height={35}
                            width={44}
                        />
                        <h1 className='font-semibold'>MITINGO MEET</h1>
                    </div>

                    <Link href='/dashboard' className='bg-cPrimary hover:bg-cPrimary/70 py-3 px-5 rounded-lg text-white'>Get Start</Link>
                </div>

                <div className='space-y-5'>
                    <div className="flex justify-between items-center gap-20">
                        <div className='space-y-3'>
                            <div className="flex gap-2 items-center">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    height={62}
                                    width={79}
                                />
                                <h1 className='text-2xl font-bold'>MITINGO MEET</h1>
                            </div>
                            <p>Mitinggo is an online meeting platform with unlimited capacity. used in learning, business interaction processes and so on.</p>
                        </div>
                        <div>
                            <Image
                                src="/hero.png"
                                alt="Hero"
                                height={344}
                                width={519}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div>
                            <Image
                                src="/landing1.png"
                                alt="Landing 1"
                                height={242}
                                width={449}
                            />
                        </div>

                        <div className='pt-5 bg-[#8871E6] rounded-xl'>
                            <div className='rounded-xl bg-[#E9E9FA] px-20 py-5 space-y-5'>
                                <h1 className='text-[#8482A8] text-xl font-bold text-center'>START MEETING EVERYONE</h1>
                                <div className="flex justify-center">
                                    <Link href='/dashboard' className='py-3 px-5 flex gap-3 bg-cPrimary hover:bg-cPrimary/70 rounded-lg text-white'>
                                        <Icon icon="majesticons:video" className='text-white text-2xl' />
                                        <p>New Meet</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='text-[#8871E6] text-md text-center'>Copyright © 2023 | Mitingo </p>
            </div >
        </>
    )
}

export default LandingPage