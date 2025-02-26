import { Venues } from '../../types/Venues';

export const VenuePrice = ({ product }: { product: Venues }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-text-primary font-body text-body-small-mobile md:text-body-small-desktop">
        {product.price.toFixed(0)} NOK/night
      </span>
    </div>
  );
};
