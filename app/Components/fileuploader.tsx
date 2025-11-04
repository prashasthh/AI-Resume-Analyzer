import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '../libb/utils';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    onFileSelect?.(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxFiles: 1
  });

  return (
    <div {...getRootProps()} className={`px-6 py-8 rounded-lg bg-gray-800 border-2 border-dashed transition-all duration-300 text-center cursor-pointer ${
      isDragActive ? 'border-purple-400 bg-gray-700' : 'border-gray-600 hover:border-purple-400'
    }`}>
      <input {...getInputProps()} />
      
      {file ? (
        <div className="text-gray-200">
          <p className="font-semibold">📄 {file.name}</p>
          <p className="text-sm text-gray-400 mt-1">
            {formatSize(file.size)}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              onFileSelect?.(null);
            }}
            className="mt-3 px-4 py-1.5 text-sm rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <img src="/icons/cross.svg" alt="Remove" className="w-4 h-4" />
            Remove
          </button>
        </div>
      ) : (
        <div className="text-gray-400">
          {isDragActive ? (
            <p className="font-semibold">Drop the PDF file here ...</p>
          ) : (
            <>
              <p className="font-semibold">Drag 'n' drop a PDF file here, or click to select one</p>
              <p className="text-sm mt-1">PDF only (Max 10MB)</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;