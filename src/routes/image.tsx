import { createFileRoute } from '@tanstack/react-router'
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { myCld } from '@/lib/cloudinary';
import CustomCloudImageUpload from '@/lib/Cloudinary-Image-Upload';
export const Route = createFileRoute('/image')({
  component: cloudImageComponent

})

function cloudImageComponent() {

  const Myimage = myCld.image('ugr0iq0bgl77sxxzgdah').resize(fill().width(200).height(200)).format('auto').quality('auto');

  const formData = new FormData()
  formData.append("upload_preset", import.meta.env.VITE_CLOUD_UPLOAD_PRESET)
  formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME)
  formData.append("api_key", import.meta.env.VITE_CLOUD_API_KEY)


  return (
    <div className='min-h-screen w-full p-2'>
      <h1>Cloud Image trial</h1>

      <AdvancedImage cldImg={Myimage} />


      <CustomCloudImageUpload eventFormData={formData} />

    </div>
  )
}
