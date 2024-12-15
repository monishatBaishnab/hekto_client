import PageHeader from '@/components/PageHeader';
import PasswordResetForm from '@/components/dashboard/PasswordResetForm';

const PasswordRecovery = () => {
  return (
    <div>
      <PageHeader title="My Account" />

      <div className="container flex items-center justify-center">
        <div className="min-w-96 space-y-6 border border-athens-gray-100 p-7">
          <div className="space-y-1.5">
            <h4 className="text-center text-xl font-bold text-h-black">
              Recover Password
            </h4>
            <p className="text-center text-athens-gray-600">
              Please provide account detail bellow.
            </p>
          </div>
          {/* <HForm onSubmit={handleSubmit}>
            <div className="space-y-4">
              <HInput placeholder="Email Address" name="email" />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Forgot'
                )}
              </Button>
            </div>
          </HForm> */}
          <PasswordResetForm navigatePath='/' />
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
