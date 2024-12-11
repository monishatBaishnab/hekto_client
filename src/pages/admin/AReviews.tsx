import AdminTitle from '@/components/dashboard/admin/AdminTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Fullscreen, Trash2 } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import { useFetchAllReviewQuery } from '@/redux/features/review/review.api';
import { TReview } from '@/types/review.types';

const actions = [
  {
    key: 'comment',
    label: 'Comment',
    icon: Fullscreen,
  },
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
  console.log(reviews);
  const handleAction = (key: string, user: TReview) => {
    console.log(key);
    console.log(user);
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
              ? null
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
