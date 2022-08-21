import { Button, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormPasswordInput } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import { useAccount } from 'contexts/accounts';

const schema = yup.object().shape({
  password: yup.string().required('Required'),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      password: Mock.PASSWORD,
      confirmPassword: Mock.PASSWORD,
    }
  : undefined;

const LoginForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues,
  });
  const { unlockAccount } = useAccount();

  const onSubmit = data => {
    unlockAccount(data.password);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormPasswordInput label={t('form:your-password')} name="password" control={control} />
      <Button type="submit">{t('form:login')}</Button>
    </VStack>
  );
};

export default LoginForm;