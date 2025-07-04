import { motion } from "framer-motion";
import { MdError } from "react-icons/md";

interface IError {
  message: string;
}

const Error = ({ message }: IError) => {
  return (
    <div className="py-16 p-2 sm:p-16 text-white flex flex-col items-center rounded-md text-center">
      <div className="bg-azul-950 p-4 sm:p-12">
        <div className="bg-azul-800 rounded-sm w-fit mx-auto mb-4 p-2">
          <MdError className="text-orange-500  text-4xl" />
        </div>
        <span className="text-slate-400">{message}</span>
      </div>
    </div>
  );
};

export default Error;
