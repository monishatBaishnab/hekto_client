import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FilePenLine, FolderOpen, Plus, Trash2 } from 'lucide-react';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import moment from 'moment';
import TableAction from '@/components/dashboard/admin/TableAction';
import CouponForm from '@/components/dashboard/CouponForm';
import { TCoupon } from '@/types/coupon.types';
import {
  useCreateCouponsMutation,
  useDeleteCouponsMutation,
  useFetchAllCouponsQuery,
  useUpdateCouponsMutation,
} from '@/redux/features/coupon/coupon.api';
import useUser from '@/hooks/useUser';
import { toast } from 'sonner';
import { useAlert } from '@/hooks/useAlert';
const vendor_actions = [
  {
    key: 'edit',
    label: 'Edit',
    icon: FilePenLine,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const admin_actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const DCoupons = () => {
  const { shop, role } = useUser();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [coupon, setCoupon] = useState<TCoupon | undefined>();
  const { AlertComponent, showAlert } = useAlert();
  const [createCoupon, { isLoading: creating }] = useCreateCouponsMutation();
  const [updateCoupon, { isLoading: updating }] = useUpdateCouponsMutation();
  const [deleteCoupon] = useDeleteCouponsMutation();
  const { data: coupons, isLoading } = useFetchAllCouponsQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
    ...(role === 'VENDOR'
      ? [{ name: 'shop_id', value: shop?.id as string }]
      : []),
  ]);

  const actions = role === 'VENDOR' ? vendor_actions : admin_actions;

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const couponData = {
      shop_id: shop?.id,
      coupon: data.coupon,
      discount: data.discount,
      discount_by: data.discount_by,
      start_date: data?.start_date,
      end_date: data?.end_date,
    };

    if (!coupon) {
      const result = await createCoupon(couponData);
      if (result?.data?.success) {
        setOpen(false);
        toast.success('Coupon Created.');
      }
    } else if (coupon) {
      const result = await updateCoupon({ data: couponData, id: coupon.id });
      if (result?.data?.success) {
        setOpen(false);
        toast.success('Coupon Created.');
      }
    }
  };

  const handleAction = async (key: string, coupon: TCoupon) => {
    if (key === 'delete') {
      const isConfirmed = await showAlert(
        'Are you sure.',
        'You have not access this after delete.'
      );
      if (isConfirmed) {
        const deletedData = await deleteCoupon(coupon.id);
        if (deletedData?.data?.success) {
          toast.success('Product Deleted.');
        }
      }
    } else if (key === 'edit') {
      setOpen(true);
      setCoupon(coupon);
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-h-black">Coupons</h2>
        {AlertComponent}
        {role === 'VENDOR' ? (
          <Button
            onClick={() => {
              setCoupon(undefined);
              setOpen(true);
            }}
            variant="rose"
            className="bg-red-500 hover:bg-red-400 active:bg-red-500"
          >
            Create new <Plus />
          </Button>
        ) : (
          <Button
            disabled
            variant="rose"
            className="bg-red-500 hover:bg-red-400 active:bg-red-500"
          >
            Create new <Plus />
          </Button>
        )}
      </div>
      <div className="block">
        <Table>
          <TableHeader className="bg-athens-gray-100">
            <TableRow>
              <TableHead>Coupon</TableHead>
              <TableHead className="text-center">Discount</TableHead>
              <TableHead className="text-center">Discount By</TableHead>
              <TableHead className="text-center">Valid Till</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    {/* Skeleton for DTableImage */}
                    <div className="flex gap-2">
                      <div className="size-10 animate-pulse rounded-lg bg-athens-gray-300"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
                        <div className="h-3 w-32 animate-pulse rounded bg-athens-gray-300"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex w-full items-center justify-center">
                      <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex w-full items-center justify-center">
                      <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex w-full items-center justify-center">
                      <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex w-full items-center justify-end">
                      <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : !coupons?.data?.length ? (
              <TableRow>
                <TableCell colSpan={5} className="hover:bg-white">
                  <div className="flex flex-col items-center justify-center py-5 text-base font-medium text-athens-gray-700">
                    <FolderOpen className="size-10 stroke-athens-gray-500" />
                    <span>No data found</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              coupons?.data?.map((coupon: TCoupon) => {
                return (
                  <TableRow key={coupon.id}>
                    <TableCell>{coupon.coupon}</TableCell>
                    <TableCell className="text-center">
                      {coupon.discount}
                    </TableCell>
                    <TableCell className="text-center">
                      {coupon.discount_by}
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(coupon?.end_date).format('DD MMM, YYYY')}
                    </TableCell>
                    <TableCell className="text-right">
                      <TableAction<TCoupon>
                        onClick={handleAction}
                        item={coupon}
                        actions={actions}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {coupons?.data?.length ? (
        <HPagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(
            Number(coupons?.meta?.total) / Number(coupons?.meta?.limit)
          )}
        />
      ) : null}

      <CouponForm
        onSubmit={handleSubmit}
        open={open}
        setOpen={setOpen}
        title="Create Coupon"
        coupon={coupon}
        isLoading={creating || updating}
      />
    </div>
  );
};

export default DCoupons;
