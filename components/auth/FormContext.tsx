
import FiledForm from "@/types/filedForm";
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
        <div key={field.id} className="flex flex-col gap-1">
          <label
                htmlFor={field.id}
                className={`text-xs  ${
                  errors[field.name as Path<S>] ? "text-red-500" : "text-gray-500"
                }`}
                >
                {field.label}
              </label>
          <input
            disabled={isPending}
            id={field.id}
            type={field.type}
            {...register(field.name as Path<S>)}
            className="text-sm  py-3  px-3 rounded-lg border-2 border-gray-300 "
          />
          <ErrorInput message={errors[field.name as Path<S>]?.message as string} />
        </div>
      ))}
      <div className="text-center">
        <button
          type="submit"
          disabled={isPending}
          className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold disabled:bg-sky-200"
        >
          {textButton}
        </button>
      </div>
    </>
  );
}
