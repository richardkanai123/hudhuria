import { createFileRoute } from '@tanstack/react-router'
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { myCld } from '@/lib/cloudinary';
export const Route = createFileRoute('/image')({
  component: cloudImageComponent

})


function cloudImageComponent() {

  const Myimage = myCld.image('cld-sample-2').resize(fill().width(200).height(200));
  console.log(myCld)

  return (
    <div className='min-h-screen w-full p-2'>
      <h1>Cloud Image trial</h1>

      <AdvancedImage cldImg={Myimage} />



    </div>
  )
}

