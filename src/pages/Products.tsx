import PageHeader from '@/components/PageHeader';
import PContainer from '@/components/products/PContainer';

const Products = () => {
  return (
    <div>
      <PageHeader title="Products" />

      <div className="container">
        <PContainer fetchMode='pagination' sidebar />
      </div>
    </div>
  );
};

export default Products;
