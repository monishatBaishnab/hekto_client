import { FolderOpenDot, Image, Trash2 } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type TTFileProps = {
  name: string;
  label?: string;
  value?: File[]; // Update to accept an array of files
  onChange: (files: File[] | null) => void;
  disabled: boolean;
};

const File = ({ name, label, onChange, value, disabled }: TTFileProps) => {
  const [files, setFiles] = useState<File[]>(value ?? []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e?.target?.files || []);

    const validFiles = selectedFiles.filter((file) => {
      const isValidFileType = ['image/jpeg', 'image/png'].includes(file.type);
      const isValidFileSize = file.size <= 1024 * 1024; // 1 MB

      if (!isValidFileType || !isValidFileSize) {
        setErrorMessage(
          `Only JPG and PNG formats under 1 MB are allowed. Skipped: ${file.name}`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setErrorMessage(null); // Clear any previous error
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const deleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // Reset the input value to allow re-uploading the same files
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileName = (name: string) => {
    const fileNameParts = name.split('.');
    const extension = fileNameParts.pop();
    const fileName = fileNameParts.join('.');

    return fileName.length > 10
      ? `${fileName.slice(0, 10)}...${extension}`
      : `${fileName}.${extension}`;
  };

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base text-athens-gray-800" htmlFor={name}>
          {label}
        </label>
      )}
      {!disabled ? (
        <label
          className="flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all hover:bg-athens-gray-50/10"
          htmlFor={name}
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
            <FolderOpenDot className="size-5 text-athens-gray-500" />
          </div>
          <div>
            <h5 className="font-semibold text-athens-gray-600">
              Upload Your Files
            </h5>
            <small className="text-sm text-athens-gray-400">
              Click to browse JPG or PNG formats.
            </small>
          </div>
        </label>
      ) : null}
      <input
        ref={inputRef}
        className="hidden"
        id={name}
        name={name}
        type="file"
        multiple // Allow multiple file selection
        onChange={handleFileUpload}
      />

      {errorMessage && <p className="text-sm">{errorMessage}</p>}

      <div className="space-y-2">
        {files.map((file, index) => {
          return (
            <div
              key={index}
              className="relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
                <Image className="size-4 text-athens-gray-800" />
              </div>
              <div>
                <h6 className="!text-sm">
                  {formatFileName(file?.name || (file as unknown as string))}
                </h6>
                <p className="!text-xs !text-athens-gray-500">
                  {(Number(file.size ?? 0) / 1024 / 1024).toFixed(2)}MB
                </p>
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button onClick={() => deleteFile(index)}>
                  <Trash2 className="size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HMultiFile = ({
  name,
  label,
  disabled=false,
}: {
  name: string;
  label?: string;
  disabled?: boolean;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <File
          disabled={disabled}
          label={label}
          name={name}
          value={value as File[]}
          onChange={onChange}
        />
      )}
    />
  );
};

export default HMultiFile;
