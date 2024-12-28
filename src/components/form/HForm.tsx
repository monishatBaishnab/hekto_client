import { ReactNode, useEffect } from 'react';
import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: Resolver<FieldValues>;
};

type TPHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  reset?: boolean;
} & TFormConfig;

const HForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  reset = false,
}: TPHFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }
  if (resolver) {
    formConfig['resolver'] = resolver;
  }
  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    reset ? methods.reset() : null;
  };

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default HForm;
