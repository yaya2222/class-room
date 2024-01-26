interface ErrorInputProps {
  message?: string;
}

export default function ErrorInput({ message }: ErrorInputProps) {
  if (!message) return null;

  return <div className="text-xs text-red-500">{message}</div>;
}
