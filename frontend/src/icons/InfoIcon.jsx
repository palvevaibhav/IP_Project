export default function InfoIcon({
  className = "w-5 h-5",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.09.67v4.08a.75.75 0 001.5 0v-4.08a2.25 2.25 0 00-3.27-2.01l-.041.02a.75.75 0 10.68 1.34z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75h.008v.008H12V6.75z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}