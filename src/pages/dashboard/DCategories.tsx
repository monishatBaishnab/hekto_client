import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LoaderCircle, Plus, Trash2 } from 'lucide-react';
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
import TableAction from '@/components/dashboard/admin/TableAction';
import DTableImage from '@/components/dashboard/DTableImage';
const actions = [
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];
const DCategories = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const { data: categories, isLoading } = useFetchAllCategoriesQuery([
    { name: 'page', value: String(page) },
    { name: 'limit', value: '6' },
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
        <h2 className="text-2xl font-semibold text-h-black">Categories</h2>
        <Button
          onClick={() => setOpen(true)}
          variant="rose"
          className="bg-red-500 hover:bg-red-400 active:bg-red-500"
        >
          Create new <Plus />
        </Button>
      </div>
      <div className="block">
        <Table>
          <TableHeader className="bg-athens-gray-100">
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead className="text-end">Created At</TableHead>
              <TableHead className="text-end">Updated At</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, rowIndex) => (
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
                      <div className="flex w-full items-center justify-end">
                        <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : categories?.data?.map((category: TCategory) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>
                        <DTableImage
                          image={category.image as string}
                          title={category.name}
                          helper={`Products: 
                              ${
                                category?.categoryProduct?._count
                                  ? category?.categoryProduct?._count
                                  : 0
                              }`}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {moment(category?.createdAt).format('DD MMM, YYYY')}
                      </TableCell>
                      <TableCell className="text-right">
                        {moment(category?.updatedAt).format('DD MMM, YYYY')}
                      </TableCell>
                      <TableCell className="text-right">
                        <TableAction<TCategory>
                          onClick={() => {}}
                          item={category}
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

export default DCategories;
