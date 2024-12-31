import ProductEmpty from '@/components/empty/ProductEmpty';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from '@/redux/features/cart/cart.slice';
import {
  useApplyCouponMutation,
  useFetchAllCouponsQuery,
} from '@/redux/features/coupon/coupon.api';
import { useCreateOrderMutation } from '@/redux/features/order/order.api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TCategory } from '@/types';
import { TCoupon } from '@/types/coupon.types';

import {
  CircleCheck,
  CircleX,
  DollarSign,
  FolderOpen,
  LoaderCircle,
  Minus,
  Percent,
  Plus,
  TicketPercent,
  X,
} from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { AlertComponent, showAlert } = useAlert();
  const carts = useAppSelector((state) => state.cart.carts);
  const [creteOrder, { isLoading }] = useCreateOrderMutation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [applyCoupon] = useApplyCouponMutation();
  const price = carts?.reduce((price, cart) => {
    return price + Number(cart.quantity) * Number(cart.product.price);
  }, 0);

  const shopId = carts?.[0]?.shopId;

  const { data: coupons } = useFetchAllCouponsQuery([
    { name: 'shop_id', value: shopId as string },
    { name: 'active', value: 'true' },
  ]);

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
    const orderData = carts?.map(({ product, quantity }) => ({
      id: product?.id,
      quantity,
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

  const handleCouponApply = async (coupon: TCoupon) => {
    const apply = await applyCoupon({ shop_id: shopId, id: coupon.id });
    const toastId = toast.loading('Applying Coupon', { id: coupon.id });

    if (apply.data?.success) {
      const discount =
        coupon.discount_by === 'AMOUNT'
          ? Number(coupon.discount)
          : (totalPrice / 100) * Number(coupon.discount);

      setTotalPrice(price - discount);

      toast.success('Coupon Applied', { id: toastId });
    } else if (apply?.error) {
      toast.error(
        (apply?.error as { data: { message: string } })?.data?.message,
        { id: toastId }
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  useEffect(() => {
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
                {!carts?.length ? (
                  <TableRow>
                    <TableCell colSpan={4} className="hover:bg-white">
                      <div className="flex flex-col items-center justify-center py-5 text-base font-medium text-athens-gray-700">
                        <FolderOpen className="size-10 stroke-athens-gray-500" />
                        <span>No data found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  carts?.map(({ product, quantity }) => {
                    return (
                      <TableRow
                        className="hover:bg-transparent"
                        key={product.id}
                      >
                        <TableCell>
                          <div className="relative inline-flex items-center gap-3">
                            <div className="size-16 overflow-hidden rounded-md bg-athens-gray-50 p-2">
                              <img
                                className="size-full object-contain"
                                src={product.images?.[0]}
                                alt={product.name}
                              />
                              <div className="absolute -left-2 -top-2">
                                <button
                                  onClick={() =>
                                    handleRemoveFromCart(product.id)
                                  }
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
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2">
                            <Button
                              className="rounded-md"
                              variant="light"
                              size="icon"
                              onClick={() => dispatch(decreaseQty(product.id))}
                            >
                              <Minus />
                            </Button>
                            <Input
                              disabled
                              value={quantity}
                              className="w-20 text-center text-h-black outline-none focus:!ring-0 disabled:cursor-auto disabled:!text-h-black"
                            />
                            <Button
                              className="rounded-md"
                              variant="light"
                              size="icon"
                              onClick={() => dispatch(increaseQty(product.id))}
                            >
                              <Plus />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {product.price}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
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
            </div>{' '}
            <Button
              onClick={handleCreateOrder}
              disabled={!carts?.length}
              variant="rose"
              className="w-full"
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
            <div className="grid grid-cols-2 gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full outline-none">
                  <Button variant="light" className="w-full" size="lg">
                    <TicketPercent className="mt-0.5 size-5 text-rose-600" />
                    Apply Coupon
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {coupons?.data?.map((coupon: TCoupon) => (
                    <DropdownMenuItem
                      key={coupon.id}
                      onClick={() => handleCouponApply(coupon)}
                      className="cursor-pointer"
                    >
                      <div className="flex w-full  items-center justify-between gap-5 p-1">
                        <div>
                          <h6 className="flex items-center gap-0.5 font-medium text-athens-gray-950">
                            {coupon.discount_by == 'AMOUNT' && (
                              <DollarSign className="size-4" />
                            )}
                            <span className="-mt-0.5 block">
                              {coupon.discount}
                            </span>
                            {coupon.discount_by == 'PERCENTAGE' && (
                              <Percent className="size-3.5" />
                            )}
                          </h6>
                          <h6 className="flex items-center gap-0.5 text-sm text-athens-gray-600">
                            {moment(coupon?.end_date).format('Do MMMM')}
                          </h6>
                        </div>
                        <div>
                          <h6 className="rounded-md border border-rose-100 bg-rose-50 px-2 py-1 text-xs text-rose-600">
                            {coupon.coupon}
                          </h6>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                disabled={!carts?.length}
                onClick={handleClearCart}
                variant="light"
                className="w-full"
                size="lg"
              >
                <CircleX /> Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
