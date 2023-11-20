"use client";
import {useState, useCallback, useEffect, ChangeEvent} from "react";
import getUser, {readProfileById} from "@/app/dashboard/actions";
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'


import {toast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";



export default function Profile({session}: {session:any}) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const [loading,setLoading] = useState(true)
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [city, setCity] = useState("")
    const [avatar_url, setAvatarUrl] = useState("")
    const [updating,setUpdating] = useState(false)

    const getProfile = useCallback( async () => {
        try {
            setLoading(true)

            const data = await readProfileById()


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
    }, [])

    useEffect( () => {
        getProfile();
    }, [getProfile])


    const onUpload = (url:string) => {
        setAvatarUrl(url);
    }

    const uploadAvatar = async () => {
        const  user = await getUser()
        try {



            const file = selectedFile;
            const fileExt = file.name.split('.').pop()
            const filePath = `${user?.id}-${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)


            onUpload(filePath)
        } catch (error) {
            alert('Error uploading avatar!')
        }
    }

    function editing() {
        setUpdating(true);
    }

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Update the selected file when the input changes
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else if (!event.target.files || event.target.files.length === 0) {
            toast({
                variant: "destructive",
                title: "You must select an image to upload.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						You must select an image to upload.
					</code>
				</pre>
                ),
            });
        }
    };

    return(
        <div className={'grid grid-cols-3'}>
            <div className={'col-span-1 group flex flex-col gap-6'}>
                <Image className="object-cover rounded-full ring ring-gray-300 dark:ring-gray-600" src={avatar_url} alt="avatar" height={160} width={160} />
                <form className="flex items-center space-x-6 invisible transition duration-1000 group-hover:visible">
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                        {selectedFile && (
                            <Button type="submit" onClick={uploadAvatar}>
                                Submit
                            </Button>
                        )}
                    </label>
                </form>
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

