import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import {
  useDeleteReviewMutation,
  useFetchAllReviewQuery,
} from '@/redux/features/review/review.api';
import { TReview } from '@/types/review.types';
import { toast } from 'sonner';
import DTableImage from '@/components/dashboard/DTableImage';

const actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const DReviews = () => {
  const [page, setPage] = useState(1);
  const {
    data: reviews,
    isLoading,
    isFetching,
  } = useFetchAllReviewQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
  ]);
  const [deleteReview] = useDeleteReviewMutation();

  const handleAction = async (key: string, review: TReview) => {
    if (key === 'delete') {
      const result = await deleteReview(review.id);
      if (result?.data?.success) {
        toast.success('Review Deleted.');
      }
    }
  };

  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-semibold text-h-black">User Reviews</h2>
      <div className="block">
        <Table>
          <TableHeader className="bg-athens-gray-100">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">User</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <div className="flex gap-2">
                        <div className="size-10 animate-pulse rounded-lg bg-athens-gray-300"></div>
                        <div className="space-y-1">
                          <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
                          <div className="h-3 w-32 animate-pulse rounded bg-athens-gray-300"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2">
                        <div className="size-10 animate-pulse rounded-lg bg-athens-gray-300"></div>
                        <div className="space-y-1">
                          <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
                          <div className="h-3 w-32 animate-pulse rounded bg-athens-gray-300"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex w-full items-center justify-center">
                        <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex w-full items-center justify-end">
                        <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : reviews?.data?.map((review: TReview) => {
                  return (
                    <TableRow key={review.id}>
                      <TableCell>
                        <DTableImage
                          image={review?.product.images as string}
                          title={review?.product.name}
                          helper={
                            review?.product?.productCategory?.[0]?.category
                              ?.name
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <DTableImage
                          image={review?.user.profilePhoto as string}
                          title={review?.user.name}
                          helper={review?.user?.email}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {review?.rating}
                      </TableCell>
                      <TableCell className="text-right">
                        <TableAction<TReview>
                          onClick={handleAction}
                          item={review}
                          actions={actions}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>
      <HPagination
        page={page}
        setPage={setPage}
        totalPage={Math.ceil(
          Number(reviews?.meta?.total) / Number(reviews?.meta?.limit)
        )}
      />
    </div>
  );
};

export default DReviews;
