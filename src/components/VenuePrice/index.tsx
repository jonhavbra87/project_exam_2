import { Venues } from '../../types/Venues';

export const VenuePrice = ({ product }: { product: Venues }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-primary">
        {product.price.toFixed(2)} NOK / night
      </span>
    </div>
  );
};
