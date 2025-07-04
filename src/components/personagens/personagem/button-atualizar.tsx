import { FaBookmark, FaRegBookmark } from "react-icons/fa";

type ButtonAtualizarProps = {
  handleSetAtualizar: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void>;
  isAtualizar: boolean | undefined;
};

export default function ButtonAtualizar({
  handleSetAtualizar,
  isAtualizar,
}: ButtonAtualizarProps) {
  return (
    <button
      onClick={handleSetAtualizar}
      className="rounded-sm size-8 sm:size-9 cursor-pointer hover:scale-110 transition-all duration-200 p-2"
    >
      {isAtualizar ? (
        <span className="flex justify-center items-center text-lg text-yellow-600">
          <FaBookmark />
        </span>
      ) : (
        <span className="flex justify-center items-center text-lg text-sky-900">
          <FaRegBookmark />
        </span>
      )}
    </button>
  );
}
