const VenueImage = ({ src, alt }: { src: string; alt: string }) => {
    return (
      <div className="w-full aspect-[4/3] bg-gray-200 rounded-t-ms overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mb-4 w-full object-cover h-full "
        />
      </div>
    );
  };
  
  export default VenueImage;