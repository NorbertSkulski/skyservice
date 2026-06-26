import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '../ui/input';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { useId } from 'react';

type SkyInputProps = {
  name: string
  label: string
  type?: string
  rules?: object
  className?: string,
  description?: string
}

const SkyInput = ({ name, label, type = 'text', rules, className = "", description }: SkyInputProps) => {

  const { control } = useFormContext();

  const uuid = useId();

  return (
    <div className={className} style={{ marginBottom: '1rem' }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          return (
            <Field className='h-20'>
              <FieldLabel htmlFor={uuid}>{label}</FieldLabel>
              <Input id={uuid} {...field} type={type} />
              {description &&
                <FieldDescription>
                  {description}
                </FieldDescription>
              }
              {error && <FieldError errors={[error]} />}
            </Field>
          )
        }}
      />
    </div>
  );
};

export default SkyInput;