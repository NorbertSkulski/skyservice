import { Controller, useFormContext } from 'react-hook-form';

type SkyInputProps = {
  name: string
  label: string
  type?: string
  rules?: object
  className?:string
}

const SkyInput = ({ name, label, type = 'text', rules, className="" }: SkyInputProps) => {

  const { control } = useFormContext(); 

  return (
    <div className={className} style={{ marginBottom: '1rem' }}>
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