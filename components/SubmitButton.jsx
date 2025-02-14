'use client';

import { useFormStatus } from "react-dom";

const SubmitButton = () =>
{
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full py-3 text-sm font-medium text-white bg-black dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;