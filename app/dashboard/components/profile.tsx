"use client";
import { useState, useCallback, useEffect} from "react";
import {readProfileById} from "@/app/dashboard/actions";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from 'next/image'


import {toast} from "@/components/ui/use-toast";



export default function Profile({session}) {

    const [loading,setLoading] = useState(true)
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [city, setCity] = useState("")
    const [avatar_url, setAvatarUrl] = useState("")
    const [updating,setUpdating] = useState(false)
    const user = session?.user

    const getProfile = useCallback( async () => {
        try {
            setLoading(true)

            const data = await readProfileById(user?.id)


            if (data) {
                setFullname(data.full_name)
                setUsername(data.username)
                setCity(data.city)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        getProfile();
    }, [user, getProfile])


    

    function editing() {
        setUpdating(true);
    }

    return(
        <div className={'grid grid-cols-3'}>
            <div className={'col-span-1'}>
                <Image className="object-cover w-16 h-16 rounded-full ring ring-gray-300 dark:ring-gray-600" src={avatar_url} alt="avatar" />
            </div>
            <div className={'col-span-2 items-center'}>
                <div className={'gap-2'}>
                    <label className={'p-2'}>Name</label>
                    <div className={'flex group'}>
                        <input value={fullname} readOnly={!updating} className={'border-2 rounded-xl p-2' } />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6 invisible transition duration-1000 group-hover:visible">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                    </div>
                </div>
                <div className={'gap-2'}>
                    <label className={'p-2'}>username</label>
                    <div className={'flex group'}>
                        <input value={username} readOnly={!updating} className={'border-2 rounded-xl p-2' } />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6 invisible transition duration-1000 group-hover:visible">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                    </div>
                </div>
                <div className={'gap-2'}>
                    <label className={'p-2'}>City</label>
                    <div className={'flex group'}>
                        <input value={city} readOnly={false} className={'border-2 rounded-xl p-2' } />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6 invisible transition duration-1000 group-hover:visible">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    )
}

