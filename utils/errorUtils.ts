import toast from "react-hot-toast";

export const handleMutationError = (error: any, customMessage?: string) => {
  console.error(customMessage || "Error during mutation:", error);
  toast.error(
    customMessage || `에러가 발생하였습니다\n${error.message.split(":")[0]}`
  );
};
