import { Venues } from '../../types/Venues';
/**
 * VenuePrice component
 * @param product - Venue object
 * @returns Venue price
 * @example
 * ```tsx
 * <VenuePrice product={product} />
 * ```
 * 
 */
export const VenuePrice = ({ product }: { product: Venues }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-text-primary font-body text-body-small-mobile md:text-body-small-desktop">
        {product.price.toFixed(0)} NOK/night
      </span>
    </div>
  );
};
