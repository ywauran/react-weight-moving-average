const Modal = ({ setOpenModal, children, title }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full overflow-hidden main-modal h-100 animated fadeIn faster"
      style={{ background: "rgba(0,0,0,.7)" }}
    >
      <div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white border border-teal-500 rounded shadow-lg modal-container md:max-w-md">
        <div className="px-6 py-4 text-left modal-content">
          <div className="flex items-center justify-between pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <div
              className="z-50 cursor-pointer modal-close"
              onClick={() => setOpenModal(false)}
            >
              <svg
                className="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="my-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
