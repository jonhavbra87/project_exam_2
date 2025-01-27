import { useState } from 'react';
import { Venues } from '../../types/Venues';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
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
        <Swiper spaceBetween={10} slidesPerView={1} loop={true}>
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
