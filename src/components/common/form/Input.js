import { FormControl, Input, FormLabel, FormHelperText, FormErrorMessage } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

const FormInput = ({
  name,
  label,
  control,
  placeholder,
  type = 'text',
  defaultValue = '',
  helperText,
  isRequired,
  isInvalid,
  _input,
  ...props
}) => {
  const { field, formState } = useController({ name, control, defaultValue });
  const error = formState?.errors?.[name]?.message;

  return (
    <FormControl pb={2} isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        onBlur={field.onBlur}
        placeholder={placeholder}
        onChange={val => field.onChange(val)}
        value={field.value}
        {..._input}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;