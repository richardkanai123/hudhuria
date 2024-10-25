import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import CloudinaryImageComponent from "@/lib/CloudinaryAdvancedImage"
import PlaceholderImage from "@/components/Events/PlaceholderImage"
import { LoaderPinwheelIcon } from "lucide-react"

interface CustomCloudImageUploaderProps {
    eventFormData: FormData
    onImageUpload: (imageData: { publicId: string, url: string }) => void
}

const CustomCloudImageUploader = ({ eventFormData, onImageUpload }: CustomCloudImageUploaderProps) => {
    const [targetImage, setTargetImage] = useState<File | null>(null)
    const [imagePublicId, setImagePublicId] = useState<string | null>(null)
    const [isPendingUpload, setIsPendingUpload] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)


    const uploadForm = useRef<HTMLDivElement>(null)


    const UploadImage = async () => {

        if (!eventFormData) {
            setError('No event form data')
            return false
        }
        if (!targetImage) {
            setError('No image selected')
            return false
        }

        try {
            setError(null)
            const formData = new FormData()
            formData.append("file", targetImage)
            formData.append("upload_preset", import.meta.env.VITE_CLOUD_UPLOAD_PRESET)
            formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME)
            formData.append("api_key", import.meta.env.VITE_CLOUD_API_KEY)
            formData.append("api_secret", import.meta.env.VITE_CLOUD_API_SECRET)
            formData.append("timestamp", Date.now().toString())
            setIsPendingUpload(true)
            const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_API_KEY}/image/upload`, {
                method: "POST",
                body: formData
            })
            const data = await response.json()

            if (data.error) {
                setError(data.error.message)
                setIsPendingUpload(false)
                return false
            }

            setImagePublicId(data.public_id)
            setTargetImage(null)
            setError(null)
            console.log(data, eventFormData.get('cloud_name'))
            setIsPendingUpload(false)

            // After successful upload, call the callback with image data
            if (data.public_id && data.url) {
                onImageUpload({
                    publicId: data.public_id,
                    url: data.url
                })
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unknown error occurred')
            }
            setIsPendingUpload(false)
        }
    }

    return (
        <div className="w-full mx-auto px-4 py-2 h-fit md:max-w-screen-sm border border-gray-300 rounded-md my-2">
            <h1 className="text-lg font-semibold text-sky-800 my-1 ">Upload Bannner</h1>
            <div className="w-full" ref={uploadForm}>
                <input className="p-2" type="file" onChange={(e) => {
                    // reset errors and other states
                    setError(null)
                    setImagePublicId(null)

                    setIsPendingUpload(false)
                    setTargetImage(null)
                    // set target image
                    if (e.target.files) {
                        setTargetImage(e.target.files[0])
                    }

                    // todo: Delete the previous image using its image id

                }} />
                <div className="w-full flex gap-2 items-center justify-center my-2">
                    {
                        targetImage && <Button className='flex align-middle items-center ' variant='default' type="button" onClick={UploadImage} disabled={isPendingUpload}>
                            {isPendingUpload && <LoaderPinwheelIcon className='mr-2 h-4 w-4 animate-spin' />}
                            <span> {isPendingUpload ? "Uploading..." : "Upload"}</span>
                        </Button>
                    }
                </div>
                {/* error message */}
                <div className="w-full p-2 min-h-fit"> {error && <p className="text-red-500 my-2 text-wrap text-sm">{error}</p>}</div>

                <div className="w-full ">

                    {/* image preview */}
                    {(targetImage && !isPendingUpload) && <img src={URL.createObjectURL(targetImage)} alt="Preview" />}
                    {isPendingUpload && <PlaceholderImage />}
                    {(imagePublicId && !targetImage) && <CloudinaryImageComponent publicId={imagePublicId} />}
                </div>
            </div>
        </div>
    )
}
export default CustomCloudImageUploader