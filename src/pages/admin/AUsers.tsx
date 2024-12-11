import AdminTitle from '@/components/dashboard/admin/AdminTitle';
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
import { ShieldCheck, Trash2 } from 'lucide-react';
import TableAction from '@/components/dashboard/admin/TableAction';
import { TUser } from '@/types/user.types';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import { toast } from 'sonner';

const actions = [
  {
    key: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const AUsers = () => {
  const [page, setPage] = useState(1);
  const {
    data: users,
    isLoading,
    isFetching,
  } = useFetchAllUserQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
  ]);
  const [updateStatus] = useUpdateUserStatusMutation();

  const handleAction = async (key: string, user: TUser) => {
    if (key === 'delete') {
      const updatedData = await updateStatus({
        payload: { isDeleted: true },
        id: user.id,
      });

      if (updatedData?.data?.success) {
        toast.success('User Deleted.');
      }
    } else if (key === 'admin') {
      if (user.role === 'ADMIN') {
        toast.error('This user role already admin.');
        return;
      }
      const updatedData = await updateStatus({
        payload: { role: 'ADMIN' },
        id: user.id,
      });

      if (updatedData?.data?.success) {
        toast.success('User Role Updated.');
      }
    }
  };
  return (
    <div className="space-y-7">
      <AdminTitle title="Users" />
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching
              ? null
              : users?.data?.map((user: TUser) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">{user?.role}</TableCell>
                    <TableCell className="text-center">{user.status}</TableCell>
                    <TableCell className="text-right">
                      <TableAction<TUser>
                        onClick={handleAction}
                        item={user}
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
          Number(users?.meta?.total) / Number(users?.meta?.limit)
        )}
      />
    </div>
  );
};

export default AUsers;
