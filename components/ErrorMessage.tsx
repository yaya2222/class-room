import { MdErrorOutline } from "react-icons/md";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <div className="bg-red-100 py-4 px-2 flex items-center gap-2 text-red-600 font-semibold rounded-md">
      <MdErrorOutline  className="text-red-600 font-semibold h-8 w-8" />
      {message}
    </div>
  );
}
