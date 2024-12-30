import {
  BookmarkMinus,
  BookmarkPlus,
  Plus,
  Trash2,
  Zap,
  ZapOff,
} from 'lucide-react';
import {
  useDeleteProductMutation,
  useUpdateStatusMutation,
} from '@/redux/features/products/products.api';
import { TProduct } from '@/types/products.types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import PTable from '@/components/tables/PTable';

const actions = [
  {
    key: 'flash',
    label: 'Flash',
    icon: Zap,
  },
  {
    key: 'feature',
    label: 'Feature',
    icon: BookmarkPlus,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const flash_actions = [
  {
    key: 'remove-flash',
    label: 'Remove',
    icon: ZapOff,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const featured_actions = [
  {
    key: 'remove-feature',
    label: 'Remove',
    icon: BookmarkMinus,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const DAdminProducts = () => {
  const { AlertComponent, showAlert } = useAlert();

  const [deleteProduct] = useDeleteProductMutation();
  const [updateStatus] = useUpdateStatusMutation();

  const handleAction = async (key: string, product: TProduct) => {
    if (key === 'delete') {
      const isConfirmed = await showAlert(
        'Are you sure.',
        'You have not access this after delete.'
      );
      if (isConfirmed) {
        const deletedData = await deleteProduct(product.id);
        if (deletedData?.data?.success) {
          toast.success('Product Deleted.');
        }
      }
      return;
    } else if (key === 'flash') {
      const updatedData = await updateStatus({
        id: product.id,
        data: { flash_sale: true },
      });
      if (updatedData?.data?.success) {
        toast.success('Product added on flash sale.');
      }
      return;
    } else if (key === 'feature') {
      const updatedData = await updateStatus({
        id: product.id,
        data: { featured: true },
      });
      if (updatedData?.data?.success) {
        toast.success('Product added on feature.');
      }
      return;
    } else if (key === 'remove-feature') {
      const updatedData = await updateStatus({
        id: product.id,
        data: { featured: false },
      });
      if (updatedData?.data?.success) {
        toast.success('Product removed from feature.');
      }
      return;
    } else if (key === 'remove-flash') {
      const updatedData = await updateStatus({
        id: product.id,
        data: { flash_sale: false },
      });
      if (updatedData?.data?.success) {
        toast.success('Product remove from flash sale.');
      }
      return;
    }
  };

  return (
    <div className="space-y-7">
      {AlertComponent}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-h-black">
          Featured Products
        </h2>

        <Button
          disabled
          variant="rose"
          className="bg-red-500 hover:bg-red-400 active:bg-red-500"
        >
          Create new <Plus />
        </Button>
      </div>
      <PTable
        actions={featured_actions}
        handleAction={handleAction}
        queries={[{ name: 'featured', value: 'true' }]}
      />

      <h2 className="text-2xl font-semibold text-h-black">Flash Products</h2>
      <PTable
        actions={flash_actions}
        handleAction={handleAction}
        queries={[{ name: 'flash_sale', value: 'true' }]}
      />

      <h2 className="text-2xl font-semibold text-h-black">All Products</h2>
      <PTable
        actions={actions}
        handleAction={handleAction}
        queries={[
          { name: 'flash_sale', value: 'false' },
          { name: 'featured', value: 'false' },
        ]}
      />
    </div>
  );
};

export default DAdminProducts;
