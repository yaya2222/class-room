interface ErrorInputProps {
  message?: string;
}

export default function ErrorInput({ message }: ErrorInputProps) {

  return <div className="text-xs text-red-500 h-5">{message}</div>;
}
