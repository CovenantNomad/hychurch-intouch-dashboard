import { useState } from "react";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onModalOpenHandler = () => setModalOpen(true);
  const onModalClosehandleer = () => setModalOpen(false);

  return {
    modalOpen,
    setModalOpen,
    onModalOpenHandler,
    onModalClosehandleer,
  };
};

export default useModal;
