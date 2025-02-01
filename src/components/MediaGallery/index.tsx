import { useState } from 'react';
import { Venues } from '../../types/Venues';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
// import 'swiper/css/effect-coverflow';

// Takes out the coverflow setting for better performance
const coverflowSettings = {
  rotate: 50,
  stretch: 0,
  depth: 100,
  modifier: 1,
  slideShadows: false,
};
// **Thumbnail-komponent** (ekstrahert fra hovedkomponenten)
const ThumbnailGallery = ({
  images,
  setMainImage,
}: {
  images: Venues['media'];
  setMainImage: (url: string) => void;
}) => {
  return (
    <div className="h-full flex flex-col">
      <div
        className={`grid gap-1 h-full ${images.length === 2 ? 'grid-rows-2' : 'grid-rows-2 md:grid-rows-auto md:grid-cols-2'}`}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt || `Thumbnail ${index + 1}`}
            className={`rounded-lg object-cover w-full h-full cursor-pointer ${images.length % 2 !== 0 && index === images.length - 1 ? 'col-span-2' : ''}`}
            onClick={() => setMainImage(image.url)}
          />
        ))}
      </div>
    </div>
  );
};

type MediaGalleryProps = {
  images: Venues['media'];
};

function MediaGallery({ images }: MediaGalleryProps) {
  const [mainImage, setMainImage] = useState(
    images.length > 0 ? images[0].url : 'https://via.placeholder.com/600'
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = images.length;
  const thumbnailImages = images.slice(1); // Gets all images except the first one
  const thumbnailCount = thumbnailImages.length;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Mobile interface: Uses Slider for Carousel */}
      <div className="block md:hidden slider-container relative">
        {images.length === 1 ? (
          // **Shows only one img if there is only one**
          <img
            src={images[0].url}
            alt={images[0].alt || 'Stedets bilde'}
            className="rounded-lg object-cover w-full h-[500px]"
            aria-label="Bildevisning (kun ett bilde)"
          />
        ) : (
          // **Shows Carousel if there is more than one img**
          <Swiper
            slidesPerView={1.3}
            centeredSlides={true}
            spaceBetween={1}
            slidesPerGroup={1}
            touchRatio={0.5}
            loop={true}
            effect="coverflow"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[EffectCoverflow]}
            coverflowEffect={coverflowSettings}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={image.alt || `Slide ${index + 1}`}
                  className="rounded-lg object-cover w-full h-[500px]"
                  aria-label={`Bilde ${index + 1} av ${totalSlides}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Slide indicator */}
        {images.length > 1 && (
          <div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg opacity-80 z-10"
            aria-live="polite"
          >
            {activeIndex + 1} / {totalSlides}
          </div>
        )}
      </div>

      {/* Desktop: Uses Grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 h-full">
        {/* **Main image** */}
        <div
          className={`h-full ${thumbnailCount > 0 ? 'md:col-span-2' : 'col-span-3'}`}
        >
          <img
            src={mainImage}
            alt="Main image of the venue"
            className="rounded-lg object-cover w-full h-full"
            aria-label="Main image of the venue"
          />
        </div>

        {/* **Thumbnails (Only if there are more than one img)** */}
        {thumbnailCount > 0 && (
          <ThumbnailGallery
            images={thumbnailImages}
            setMainImage={setMainImage}
          />
        )}
      </div>
    </div>
  );
}

export default MediaGallery;
