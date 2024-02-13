
import {FiledForm} from "@/types";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import ErrorInput from "@/components/ErrorInput";

interface FormContextProps<S extends FieldValues> {
  register: UseFormRegister<S>;
  errors: FieldErrors<S>;
  fields: FiledForm[];
  textButton: String;
  isPending: boolean;
}

export default function FormContext<S extends FieldValues>({
  register,
  errors,
  fields,
  textButton,
  isPending,
}: FormContextProps<S>) {
  return (
    <>
      {fields.map((field) => (
        <div key={field.id} className="form-group">
          
          <input
            disabled={isPending}
            id={field.id}
            type={field.type}
            placeholder=" "
            {...register(field.name as Path<S>)}
           
          />
          <label
                htmlFor={field.id}
                className={`${
                  errors[field.name as Path<S>] ? "text-red-500" : "text-gray-500"
                }`}
                >
                {field.label}
              </label>
          <ErrorInput message={errors[field.name as Path<S>]?.message as string} />
        </div>
      ))}
      <div className="text-center">
        <button
          type="submit"
          disabled={isPending}
          className="bg-color hover:bg-gradient-to-br hover:from-teal-400 hover:to-blue-600 px-10 py-2 rounded-lg text-white font-semibold disabled:bg-sky-200"
        >
          {textButton}
        </button>
      </div>
    </>
  );
}
