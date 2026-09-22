import {ChangeEvent, DragEvent, useEffect, useRef, useState} from "react";
import {resizeProfileImage} from "../../../../../utils/imageUtils";

type Props = {
  value: File | null;
  existingImageUrl?: string | null;
  onChange: (file: File | null) => void;
  onDeleteExisting?: () => void;
};

const NewFamilyImageInput = ({
  value,
  existingImageUrl,
  onChange,
  onDeleteExisting,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    existingImageUrl ?? null,
  );

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    try {
      setIsProcessing(true);

      const resizedFile = await resizeProfileImage(file);

      onChange(resizedFile);
    } catch (error) {
      console.error("@NewFamilyImageInput:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // 파일 선택
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    handleFile(file);
  };

  // Drag & Drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    handleFile(file);
  };

  // Cmd/Ctrl + V
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;

      if (!items) return;

      const imageItem = Array.from(items).find((item) =>
        item.type.startsWith("image/"),
      );

      if (!imageItem) return;

      const file = imageItem.getAsFile();

      if (!file) return;

      handleFile(file);
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  // Preview
  useEffect(() => {
    // 새로 선택한 파일이 있으면 그 파일을 우선 표시
    if (value) {
      const objectUrl = URL.createObjectURL(value);

      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    // 새 파일이 없으면 기존 Storage 이미지 표시
    setPreviewUrl(existingImageUrl ?? null);
  }, [value, existingImageUrl]);

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);

    if (value) {
      // 새로 선택한 사진이 있는 경우
      // 새 사진만 취소
      onChange(null);
      return;
    }

    if (existingImageUrl) {
      // 기존 프로필 사진이 있는 경우
      // 기존 사진 삭제 예약
      onDeleteExisting?.();
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">새가족 사진</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative flex h-72 w-[260px] cursor-pointer
    items-center justify-center overflow-hidden
    rounded-lg border-2 border-dashed transition
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }
        `}
      >
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="프로필 미리보기"
              className="max-h-[320px] w-auto rounded-lg object-contain"
            />
          </div>
        ) : (
          <div className="px-4 text-center">
            <div className="text-sm font-medium text-gray-600">
              사진을 추가해주세요
            </div>

            <div className="mt-2 text-xs leading-5 text-gray-400">
              클릭하여 사진 선택
              <br />
              또는 사진을 여기로 드래그
              <br />
              또는 Cmd/Ctrl + V
            </div>
          </div>
        )}

        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-50/90">
            <span className="text-sm font-medium text-blue-600">
              여기에 사진을 놓아주세요
            </span>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <span className="text-sm font-medium text-gray-600">
              사진 처리중...
            </span>
          </div>
        )}
      </div>

      {(value || existingImageUrl) && (
        <div className="mt-2 w-[260px] flex items-center justify-between">
          {/* <span className="text-xs text-gray-500">
            {Math.round(value.size / 1024)}KB
          </span> */}

          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-red-500 hover:text-red-600"
          >
            사진 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default NewFamilyImageInput;
