import { FC } from 'react';
import { useRouter } from 'next/router';

interface ErrorProps {
  statusCode?: number;
  message?: string;
}

const Error: FC<ErrorProps> = ({ statusCode, message }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">
          {statusCode || 'An error occurred'}
        </h1>
        <p className="mt-4 text-xl">{message || 'Something went wrong.'}</p>
        <button
          onClick={goBack}
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
