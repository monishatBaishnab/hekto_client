import ProductEmpty from '@/components/empty/ProductEmpty';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAlert } from '@/hooks/useAlert';
import { clearCart, removeFromCart } from '@/redux/features/cart/cart.slice';
import { useCreateOrderMutation } from '@/redux/features/order/order.api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TCategory } from '@/types';
import {
  CircleCheck,
  CircleX,
  LoaderCircle,
  TicketPercent,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { AlertComponent, showAlert } = useAlert();
  const carts = useAppSelector((state) => state.cart.carts);
  const [creteOrder, { isLoading }] = useCreateOrderMutation();
  const [coupon, setCoupon] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleClearCart = async () => {
    if (!carts?.length) {
      toast.error('Your cart already empty.');
      return;
    }
    const result = await showAlert(
      'Are your sure.',
      "Your can'n retrieve cart data."
    );
    if (result) {
      dispatch(clearCart());
      toast.success('Your cart cleared.');
      navigate('/products');
    }
  };

  const handleCreateOrder = async () => {
    const orderData = carts?.map(({ product }) => ({
      id: product?.id,
      quantity: 1,
      price: product?.price,
    }));
    const result = await creteOrder({
      products: orderData,
      total_price: totalPrice,
    }).unwrap();
    if (result?.success) {
      dispatch(clearCart());
      window.location.href = result?.data?.payment_url;
    }
  };

  const handleCouponApply = () => {
    if (coupon === 'HEKTO24') {
      const price = carts?.reduce((price, cart) => {
        return price + Number(cart.product.price);
      }, 0);

      const discount = price * 0.1;
      setTotalPrice(price - discount);
    } else {
      toast.error('Enter valid coupon.');
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  useEffect(() => {
    const price = carts?.reduce((price, cart) => {
      return price + Number(1) * Number(cart.product.price);
    }, 0);
    setTotalPrice(price);
  }, [carts]);

  return (
    <div>
      {AlertComponent}
      <PageHeader title="Shopping Cart" />
      <div className="container grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          {carts?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-h-black">
                    Product
                  </TableHead>
                  <TableHead className="text-center font-bold text-h-black">
                    Price
                  </TableHead>
                  <TableHead className="text-center font-bold text-h-black">
                    Quantity
                  </TableHead>
                  <TableHead className="text-right font-bold text-h-black">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carts?.map(({ product }) => {
                  return (
                    <TableRow className="hover:bg-transparent" key={product.id}>
                      <TableCell>
                        <div className="relative inline-flex items-center gap-3">
                          <div className="size-16 overflow-hidden rounded-md bg-athens-gray-50 p-2">
                            <img
                              className="size-full object-contain"
                              src={product.images}
                              alt={product.name}
                            />
                            <div className="absolute -left-2 -top-2">
                              <button
                                onClick={() => handleRemoveFromCart(product.id)}
                                className="rounded-full bg-white p-1 text-athens-gray-700 transition-all hover:text-athens-gray-900"
                              >
                                <X className="size-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <h6 className="font-medium text-h-black">
                              {product.name.length > 20
                                ? product.name.slice(0, 20) + ' ...'
                                : product.name}
                            </h6>
                            <p className="text-sm text-athens-gray-600">
                              {(product.categories[0] as TCategory).name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-center">1</TableCell>
                      <TableCell className="text-right">
                        {product.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <ProductEmpty
              action={
                <Button onClick={() => navigate('/products')}>
                  Add to cart
                </Button>
              }
            />
          )}
        </div>

        <div className="col-span-1 space-y-5">
          {/* <div className="space-y-3">
            {carts?.map(({ product }) => (
              <div className="flex items-center justify-between border-b border-b-athens-gray-100 pb-3 last:border-b-0">
                <div className="relative inline-flex items-center gap-3">
                  <div className="size-16 overflow-hidden rounded-md bg-athens-gray-50 p-2">
                    <img
                      className="size-full object-contain"
                      src={product.images}
                      alt={product.name}
                    />
                    <div className="absolute -left-2 -top-2">
                      <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="rounded-full bg-white p-1 text-athens-gray-700 transition-all hover:text-athens-gray-900"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-h-black">
                      {product.name.length > 20
                        ? product.name.slice(0, 20)+" ..."
                        : product.name}
                    </h6>
                    <p className="text-sm text-athens-gray-600">
                      {(product.categories[0] as TCategory).name}
                    </p>
                  </div>
                </div>
                <h6 className="text-base font-bold text-athens-gray-800">
                  $ {product.price}
                </h6>
              </div>
            ))}
          </div> */}
          <h6 className="text-center text-sm font-bold text-h-black">
            Cart Totals
          </h6>
          <div className="w-full space-y-5 bg-athens-gray-50 p-5">
            <div className="flex items-center justify-between border-b-2 border-b-athens-gray-200 pb-2">
              <h4 className="text-sm font-bold text-h-black">Cart Totals</h4>
              <span className="text-sm font-bold text-athens-gray-600">
                $ {totalPrice}
              </span>
            </div>
            <div className="flex items-center justify-between border-b-2 border-b-athens-gray-200 pb-2">
              <h4 className="text-sm font-bold text-h-black">Totals</h4>
              <span className="text-sm font-bold text-athens-gray-600">
                $ {totalPrice}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheck className="size-3 text-rose-600" />
              <span className="text-sm text-athens-gray-700">
                Shipping & taxes calculated at checkout
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TicketPercent className="size-3 text-rose-600" />
              <span className="text-sm text-athens-gray-700">
                User Coupon{' '}
                <span className="font-medium text-rose-600">HEKTO24</span> for
                10% Discount.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Input
                onChange={(e) => setCoupon(e.target.value)}
                className="h-10 rounded-none focus:outline-none focus:!ring-0"
              />
              <Button
                onClick={handleCouponApply}
                variant="light"
                className="w-full rounded-none"
                size="lg"
              >
                Apply Coupon
              </Button>
            </div>
            <Button
              onClick={handleCreateOrder}
              disabled={!carts?.length}
              variant="rose"
              className="w-full rounded-none"
              size="lg"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <CircleCheck />
                  Proceed To Checkout
                </>
              )}
            </Button>
            <Button
              disabled={!carts?.length}
              onClick={handleClearCart}
              variant="light"
              className="w-full rounded-none"
              size="lg"
            >
              <CircleX /> Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
