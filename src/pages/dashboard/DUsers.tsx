import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useFetchAllUserQuery,
  useUpdateUserStatusMutation,
} from '@/redux/features/user/user.api';
import { FolderOpen, Trash2 } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import { TUser } from '@/types/user.types';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import { toast } from 'sonner';
import moment from 'moment';
import DTableImage from '@/components/dashboard/DTableImage';
import useUser from '@/hooks/useUser';

const actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const DUsers = () => {
  const { id } = useUser();
  const [page, setPage] = useState(1);
  const {
    data: users,
    isLoading,
    isFetching,
  } = useFetchAllUserQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
  ]);
  const [updateStatus] = useUpdateUserStatusMutation();

  const handleAction = async (key: string, user: TUser) => {
    if (user.id === id) return;
    if (key === 'delete') {
      const updatedData = await updateStatus({
        payload: { isDeleted: true },
        id: user.id,
      });

      if (updatedData?.data?.success) {
        toast.success('User Deleted.');
      }
    }
  };
  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-semibold text-h-black">Users</h2>
      <div className="block">
        <Table>
          <TableHeader className="bg-athens-gray-100">
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Created At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
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
            ) : !users?.data?.length ? (
              <TableRow>
                <TableCell colSpan={5} className="hover:bg-white">
                  <div className="flex flex-col items-center justify-center py-5 text-base font-medium text-athens-gray-700">
                    <FolderOpen className="size-10 stroke-athens-gray-500" />
                    <span>No data found</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users?.data?.map((user: TUser) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <DTableImage
                      image={user.profilePhoto as string}
                      title={user.name}
                      helper={user.email}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="rounded-md border border-athens-gray-100 bg-athens-gray-50/60 px-2 py-1">
                      {user?.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{user.status}</TableCell>
                  <TableCell className="text-center">
                    {moment(user?.updatedAt).format('DD MMM, YYYY')}
                  </TableCell>
                  <TableCell className="text-right">
                    <TableAction<TUser>
                      onClick={handleAction}
                      item={user}
                      actions={actions}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {users?.data?.length ? (
        <HPagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(
            Number(users?.meta?.total) / Number(users?.meta?.limit)
          )}
        />
      ) : null}
    </div>
  );
};

export default DUsers;
