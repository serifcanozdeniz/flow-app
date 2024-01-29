import { IoIosWarning } from "react-icons/io";

const ConfirmModal = ({ isOpen, text, confirm, close }) => {
  // modal açık mı değeri false ise modal'ı ekrana basma
  if (!isOpen) return null;

  // true ise ekrana bu kısım basılacak
  return (
    <div className="fixed w-full h-screen inset-0 grid place-items-center bg-black bg-opacity-50">
      <div className="flex flex-col gap-[24px] p-[30px] m-5 p-md-[60px] bg-white text-black rounded-lg">
        <h2 className="text-center font-bold text-2x1">{text}</h2>
        <p className="font-bold">
          Hesap kalıcı olarak silinecektir. Emin misiniz?
        </p>
        <div className="bg-red-100 border-l-8 border-red-700 p-3">
          <div className="flex gap-2 items-center">
            <IoIosWarning />
            <span className="font-bold">Uyarı</span>
          </div>
          <p>Hesap kalıcı olarak silinecektir.</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={close}
            className="px-[20px] py-[14px] bg-black text-white hover:bg-gray-700"
          >
            İptal
          </button>
          <button
            onClick={() => {
              confirm();
              close();
            }}
            className="px-[20px] py-[14px] text-black border border-black hover:bg-red-700 hover:text-white transition"
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
