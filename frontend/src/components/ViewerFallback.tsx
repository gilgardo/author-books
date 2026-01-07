import type { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

interface CustomError extends Error {
  type?: string;
}

const ViewerFallback = ({ error }: FallbackProps) => {
  const navigate = useNavigate();
  const customError = error as CustomError;

  const onClick =
    customError.type === "id" ? () => navigate(-1) : window.location.reload;
  return (
    <div className="p-6 bg-red-100 text-red-800 rounded-xl max-w-md mx-auto mt-10 shadow-md">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm mb-4">{error.message}</p>
      <button
        onClick={onClick}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
        Try Again
      </button>
    </div>
  );
};

export default ViewerFallback;
