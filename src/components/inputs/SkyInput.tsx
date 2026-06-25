import { Controller, useFormContext } from 'react-hook-form';

type SkyInputProps = {
  name: string
  label: string
  type?: string
  rules?: object
}

const SkyInput = ({ name, label, type = 'text', rules }: SkyInputProps) => {

  const { control } = useFormContext(); 

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block' }}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <input {...field} type={type} />
            {error && <span style={{ color: 'red' }}>{error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default SkyInput;