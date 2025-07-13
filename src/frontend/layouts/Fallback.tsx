import type { FallbackProps } from "react-error-boundary";
import MainWraper from "./MainWraper";

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <MainWraper reset={resetErrorBoundary}>
      <div className="p-6 bg-red-100 text-red-800 rounded-xl max-w-md mx-auto mt-10 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
        <p className="text-sm mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
          Try Again
        </button>
      </div>
    </MainWraper>
  );
};

export default Fallback;
