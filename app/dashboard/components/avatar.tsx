"use client"

import {useState,  useEffect} from "react";
import {createClient} from "@supabase/supabase-js";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";





const Avatar = ({uid, url, size, onUpload}: { uid: string, url: string, size: number, onUpload: () => void }) => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        async function downloadImage(path:string) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path)
                if (error) {

                }

                const url = URL.createObjectURL(data)
                setAvatarUrl(url)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }

        if (url) downloadImage(url)
    }, [url, supabase])

    const uploadAvatar = async () => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = selectedFile;
            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}-${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
        } catch (error) {
            alert('Error uploading avatar!')
        } finally {
            setUploading(false)
        }
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
    )
}