import { useState } from "react";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onModalOpenHandler = () => setModalOpen(true);
  const onModalClosehandler = () => setModalOpen(false);

  return {
    modalOpen,
    setModalOpen,
    onModalOpenHandler,
    onModalClosehandler,
  };
};

export default useModal;
