import AdminTitle from '@/components/dashboard/admin/AdminTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LoaderCircle } from 'lucide-react';
import HPagination from '@/components/HPagination';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import HForm from '@/components/form/HForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import HInput from '@/components/form/HInput';
import HFile from '@/components/form/HFile';
import {
  useCreateCategoryMutation,
  useFetchAllCategoriesQuery,
} from '@/redux/features/categories/categories.api';
import { TCategory } from '@/types';
import moment from 'moment';

const ACategories = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const { data: categories, isLoading } = useFetchAllCategoriesQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '10' },
  ]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (data?.logo) {
      formData.append('file', data.logo);
    }
    formData.append(
      'data',
      JSON.stringify({
        name: data?.name,
        description: data?.description,
      })
    );

    const result = await createCategory(formData).unwrap();

    if (result?.success) {
      setOpen(false);
      toast.success('Category Created.');
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <AdminTitle title="Categories" />
        <Button
          onClick={() => setOpen(true)}
          variant="dark"
          className="rounded-md"
        >
          Create
        </Button>
      </div>
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead className="text-center">Total Product</TableHead>
              <TableHead className="text-center">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? null
              : categories?.data?.map((category: TCategory) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell className="text-center">
                        {category?.categoryProduct?._count
                          ? category?.categoryProduct?._count
                          : 0}
                      </TableCell>
                      <TableCell className="text-center">
                        {moment(category?.createdAt).format('DD MMM, YYYY')}
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
          Number(categories?.meta?.total) / Number(categories?.meta?.limit)
        )}
      />

      <Dialog open={open}>
        <DialogContent className="max-w-screen-sm">
          <DialogHeader>
            <DialogTitle className="mb-5 border-b border-b-athens-gray-100 pb-5">
              Create Category
            </DialogTitle>
            <DialogDescription>
              <HForm onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <div className="space-y-5">
                      <HInput placeholder="Category Name" name="name" />
                      <HInput
                        placeholder="Category Short Description"
                        name="description"
                      />
                      <HFile name="logo" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="bg-slate-200 text-slate-600 hover:bg-slate-200/80 active:bg-slate-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-red-500 hover:bg-red-400 active:bg-red-500"
                    >
                      {creating ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        'Continue'
                      )}
                    </Button>
                  </div>
                </div>
              </HForm>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ACategories;
