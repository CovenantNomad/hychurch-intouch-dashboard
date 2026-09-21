export const resizeProfileImage = (
  file: File,
  maxWidth = 300,
  maxHeight = 400,
  quality = 0.8,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      try {
        const scale = Math.min(
          maxWidth / image.width,
          maxHeight / image.height,
          1, // 작은 사진은 확대하지 않음
        );

        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("이미지를 처리할 수 없습니다.");
        }

        // PNG 투명 배경이 JPEG에서 검게 변하는 것 방지
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);

        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);

            if (!blob) {
              reject(new Error("이미지 변환에 실패했습니다."));
              return;
            }

            resolve(
              new File([blob], "profile.jpg", {
                type: "image/jpeg",
              }),
            );
          },
          "image/jpeg",
          quality,
        );
      } catch (error) {
        URL.revokeObjectURL(objectUrl);
        reject(error);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      reject(new Error("이미지를 불러올 수 없습니다."));
    };

    image.src = objectUrl;
  });
};
