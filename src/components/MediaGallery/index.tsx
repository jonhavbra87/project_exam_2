import { useState } from 'react';
import { Venues } from '../../types/Venues';
import { Swiper, SwiperSlide } from 'swiper/react';
//import 'swiper/css';
import 'swiper/swiper-bundle.css';

//import 'swiper/components/effect-fade/effect-fade.min.css';
//import { EffectFade } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';

//import "swiper/css/navigation";
//import "swiper/css/pagination";


type MediaGalleryProps = {
  images: Venues['media'];
};

function MediaGallery({ images }: MediaGalleryProps) {
  const [mainImage, setMainImage] = useState(
    images[0]?.url || 'https://via.placeholder.com/600'
  );

  const thumbnailImages = images.slice(1);
  const thumbnailCount = thumbnailImages.length;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Mobil: Bruk Swiper (karusell) */}
      <div className="block md:hidden slider-container">
        <Swiper
        slidesPerView={1.3}
        centeredSlides={true}
        spaceBetween={1}
        slidesPerGroup={1}
        touchRatio={0.5}
        loop={true}
        effect="coverflow"
        modules={[EffectCoverflow]}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                alt={image.alt || `Slide ${index}`}
                className="rounded-lg object-cover w-full h-[500px]"

              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Bruk Grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 h-full">
        {/* Hovedbilde */}
        <div className={`h-full ${thumbnailCount > 0 ? 'md:col-span-2' : 'col-span-3'}`}>
          <img
            src={mainImage}
            alt="Main Image"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Thumbnail Container */}
        {thumbnailCount > 0 && (
          <div className="h-full flex flex-col">
            <div
              className={`grid gap-1 h-full ${
                thumbnailCount === 2
                  ? 'grid-rows-2'
                  : 'grid-rows-2 md:grid-rows-auto md:grid-cols-2'
              }`}
            >
              {thumbnailImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.alt || `Thumbnail ${index}`}
                  className={`rounded-lg object-cover w-full h-full cursor-pointer 
                    ${thumbnailCount % 2 !== 0 && index === thumbnailCount - 1 ? 'col-span-2' : ''}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaGallery;
