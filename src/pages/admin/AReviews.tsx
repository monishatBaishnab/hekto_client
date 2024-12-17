import AdminTitle from '@/components/dashboard/admin/AdminTitle';
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

const actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const AReviews = () => {
  const [page, setPage] = useState(1);
  const {
    data: reviews,
    isLoading,
    isFetching,
  } = useFetchAllReviewQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
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
      <AdminTitle title="User Reviews" />
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-center">User Name</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex w-full items-center justify-center">
                        <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
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
              : reviews?.data?.map((review: TReview) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.product.name}</TableCell>
                    <TableCell className="text-center">
                      {review.user.name}
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
                ))}
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

export default AReviews;
