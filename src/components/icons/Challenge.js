function Challenge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={120}
      height={120}
      viewBox="8 8 48 52"
      fill="currentColor"
    >
      <path
        d="M16 8h32v10c0 10-8 20-16 20s-16-10-16-20V8z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M16 12h-8c0 10 6 18 12 18"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M48 12h8c0 10-6 18-12 18"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect
        x={28}
        y={38}
        width={8}
        height={10}
        stroke="currentColor"
        strokeWidth={2}
      />
      <rect x={20} y={48} width={24} height={6} />
      <rect x={16} y={54} width={32} height={6} />
    </svg>
  );
}

export default Challenge;
