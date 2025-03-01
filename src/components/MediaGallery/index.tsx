import { useState } from 'react';
import { Venues } from '../../types/Venues';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import PlaceholderImg from '../../assets/signup_collage.webp';
// Takes out the coverflow setting for better performance
const coverflowSettings = {
  rotate: 50,
  stretch: 0,
  depth: 100,
  modifier: 1,
  slideShadows: false,
};
/**
 * Internal thumbnail gallery component for displaying smaller venue images
 *
 * @component
 * @param {Object} props - Component props
 * @param {Venues['media']} props.images - Array of media objects from venue
 * @param {number} props.mainImageIndex - Index of the currently displayed main image
 * @param {Function} props.setMainImageIndex - Function to update the main image index
 * @returns {JSX.Element} - Rendered thumbnail gallery
 *
 * @description
 * Displays a responsive grid of thumbnail images that adapts its layout based on
 * the number of available thumbnails. Clicking a thumbnail updates the main image.
 */

const ThumbnailGallery = ({
  images,
  mainImageIndex,
  setMainImageIndex,
}: {
  images: Venues['media'];
  mainImageIndex: number;
  setMainImageIndex: (index: number) => void;
}) => {
  // Filtered thumbnails without the main image
  const thumbnails = images.filter((_, index) => index !== mainImageIndex);

  // deside how many thumbnails to show
  const maxThumbnails = Math.min(thumbnails.length, 5);

  return (
    <div className="h-full w-full">
      <div
        className={`grid gap-2 h-full ${
          maxThumbnails === 1
            ? 'grid-rows-1'
            : maxThumbnails === 2
              ? 'grid-rows-2'
              : maxThumbnails === 3
                ? 'grid-rows-3'
                : maxThumbnails === 4
                  ? 'grid-rows-2 grid-cols-2'
                  : 'grid-rows-3 grid-cols-2'
        }`}
      >
        {thumbnails.slice(0, maxThumbnails).map((image, index) => {
          // Find original index of image in the array
          const originalIndex = images.findIndex(
            (img) => img.url === image.url
          );

          // Deside if the image should take up full width
          const isLastImage = index === maxThumbnails - 1;
          const shouldTakeFullWidth =
            (maxThumbnails === 3 || maxThumbnails === 5) && isLastImage;

          // Deside which corners to round
          let cornerClasses = '';

          if (maxThumbnails === 1) {
            cornerClasses = 'rounded-tr-lg rounded-br-lg';
          } else if (maxThumbnails === 2) {
            cornerClasses = index === 0 ? 'rounded-tr-lg' : 'rounded-br-lg';
          } else if (maxThumbnails === 3) {
            cornerClasses =
              index === 0
                ? 'rounded-tr-lg'
                : index === 2
                  ? 'rounded-tr-lg rounded-br-lg'
                  : '';
          } else if (maxThumbnails === 4) {
            cornerClasses =
              index === 1
                ? 'rounded-tr-lg'
                : index === 3
                  ? 'rounded-br-lg'
                  : '';
          } else {
            // 5 thumbnails
            if (index === 1) cornerClasses = 'rounded-tr-lg';
            else if (index === 4) cornerClasses = 'rounded-tr-lg rounded-br-lg';
          }

          return (
            <div
              key={originalIndex}
              className={`h-full w-full overflow-hidden ${shouldTakeFullWidth ? 'col-span-2' : ''}`}
            >
              <img
                src={image.url}
                alt={image.alt || `Thumbnail ${originalIndex + 1}`}
                className={`object-cover w-full h-full cursor-pointer hover:opacity-90 transition-opacity ${cornerClasses} object-center`}
                onClick={() => setMainImageIndex(originalIndex)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Interface for MediaGallery props
 *
 * @typedef {Object} MediaGalleryProps
 * @property {Venues['media']} images - Array of media objects containing url and alt text
 */

type MediaGalleryProps = {
  images: Venues['media'];
};

/**
 * Responsive media gallery for displaying venue images
 *
 * @component
 * @param {MediaGalleryProps} props - Component props
 * @param {Venues['media']} props.images - Array of media objects from venue
 * @returns {JSX.Element} - Rendered media gallery component
 *
 * @description
 * A responsive image gallery that adapts to different screen sizes:
 * - On mobile: Shows a carousel with swipe functionality using Swiper
 * - On desktop: Shows a grid layout with main image and thumbnails
 *
 * Features:
 * - Handles empty or single-image cases gracefully
 * - Shows image count indicator on mobile carousel
 * - Allows clicking thumbnails to change main image on desktop
 * - Optimized layout based on number of available images
 * - Accessibility attributes for screen readers
 *
 * @example
 * // Basic usage with venue media
 * <MediaGallery images={venue.media} />
 *
 * @example
 * // Fallback behavior with empty array
 * <MediaGallery images={[]} /> // Will show a placeholder image
 */

function MediaGallery({ images }: MediaGalleryProps): JSX.Element {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = images.length;

  // Safty check for images
  const safeImages =
    images.length > 0
      ? images
      : [
          {
            url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Placeholder image',
          },
        ];
  const mainImage = safeImages[mainImageIndex] || safeImages[0];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Mobile interface: Uses Slider for Carousel */}
      <div className="block md:hidden slider-container relative">
        {safeImages.length === 1 ? (
          // Shows only one img if there is only one
          <img
            src={safeImages[0].url}
            alt={safeImages[0].alt || 'Venue image'}
            className="rounded-lg object-cover w-full h-[500px]"
            aria-label="Img carousel with one image"
            onError={(event) => { 
              const imgElement = event.target as HTMLImageElement;
              imgElement.onerror = null; 
              imgElement.src = PlaceholderImg; 
            }}
          />
        ) : (
          // Shows Carousel if there is more than one img
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
            {safeImages.map((image, index) => (
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
        {safeImages.length > 1 && (
          <div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg opacity-80 z-10"
            aria-live="polite"
          >
            {activeIndex + 1} / {totalSlides}
          </div>
        )}
      </div>

      {/* Desktop: Dynamic grid based on images */}
      <div
        className={`hidden md:grid gap-2 h-full ${
          safeImages.length === 1 ? 'grid-cols-1' : 'grid-cols-4'
        }`}
      >
        {/* One img takes all space*/}
        {safeImages.length === 1 ? (
          <div className="col-span-1 h-full">
            <img
              src={safeImages[0].url}
              alt={safeImages[0].alt || 'Venue image'}
              className="object-cover w-full rounded-lg object-center"
              aria-label="Venue image"
              onError={(event) => { 
                const imgElement = event.target as HTMLImageElement;
                imgElement.onerror = null; 
                imgElement.src = PlaceholderImg;
              }}
            />
          </div>
        ) : (
          <>
            {/* Multiple img: main img to the left */}
            <div className="col-span-3 h-full">
              <img
                src={mainImage.url}
                alt={mainImage.alt || 'Main image of the venue'}
                className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg object-center"
                aria-label="Main image of the venue"
                onError={(event) => { 
                  const imgElement = event.target as HTMLImageElement;
                  imgElement.onerror = null; 
                  imgElement.src = PlaceholderImg;
                }}
              />
            </div>

            {/*Thumbnails right*/}
            <div className="col-span-1 h-full">
              <ThumbnailGallery
                images={safeImages}
                mainImageIndex={mainImageIndex}
                setMainImageIndex={setMainImageIndex}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MediaGallery;
