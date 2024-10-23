"use client"

import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"



export default function ImageUpload({image}:{image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')
    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    // @ts-expect-error: si va a regresar el valor
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset="fk3hk0sw"
            options={
                {
                    maxFiles: 1
                }
            }
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imagen producto</label>
                        <div
                            onClick={() => open()}
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300
                        flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100">
                            <TbPhotoPlus size={50}></TbPhotoPlus>
                            <p className="text-lg font-semibold">Agregar imagen</p>

                            {imageUrl && (
                                <div className="obsolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Imagen de producto"
                                    >

                                    </Image>
                                </div>
                            )}
                        </div>
                    </div>

                    {image &&  !imageUrl && (
                        <div className="space-y-2">
                            <label>Imagen acutal</label>
                            <div className="relative w-64 h-64">
                                <Image
                                fill
                                src={getImagePath(image)}
                                alt="Imagen producto"
                                ></Image>
                            </div>
                        </div>
                    )}
                    <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
                </>
            )}
        </CldUploadWidget>
    )
}
