"use client";

interface UploadProps {
  setUrl: () => void;
}

export default function Upload({ setUrl }: UploadProps) {
  return (
    <div>
      <div>
        <label htmlFor="uploadInput">upload file</label>
        <input id="uploadInput" type="file" />
      </div>
    </div>
  );
}
