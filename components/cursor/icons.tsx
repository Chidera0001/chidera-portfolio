export const SoccerBall = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/cursor/soccer-ball.svg" alt="" width={34} height={34} draggable={false} />
);

export const AmericanFootball = () => (
  <svg viewBox="0 0 40 40" width="34" height="34">
    <defs>
      <linearGradient id="pigskin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a5652c" />
        <stop offset="100%" stopColor="#6e3d15" />
      </linearGradient>
    </defs>
    <ellipse
      cx="20"
      cy="20"
      rx="16"
      ry="9.5"
      fill="url(#pigskin)"
      stroke="#26241f"
      strokeWidth="1.6"
      transform="rotate(-32 20 20)"
    />
    <g stroke="#f5f3ef" strokeWidth="1.4" strokeLinecap="round" transform="rotate(-32 20 20)">
      <line x1="20" y1="14" x2="20" y2="26" />
      <line x1="16.5" y1="16" x2="23.5" y2="16" />
      <line x1="16.5" y1="19.5" x2="23.5" y2="19.5" />
      <line x1="16.5" y1="23" x2="23.5" y2="23" />
    </g>
  </svg>
);

export const TableTennisPaddle = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/cursor/table-tennis.svg" alt="" width={34} height={34} draggable={false} />
);

export const ScrabbleTile = () => (
  <svg viewBox="0 0 40 40" width="34" height="34">
    <defs>
      <linearGradient id="tileFace" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#faf1d7" />
        <stop offset="100%" stopColor="#e8d8a8" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="32" height="32" rx="4" fill="url(#tileFace)" stroke="#26241f" strokeWidth="1.6" />
    <text
      x="14"
      y="26"
      fontFamily="Georgia, serif"
      fontSize="20"
      fontWeight="700"
      fill="#26241f"
    >
      D
    </text>
    <text
      x="27"
      y="32"
      fontFamily="Arial, sans-serif"
      fontSize="8"
      fontWeight="700"
      fill="#26241f"
    >
      2
    </text>
  </svg>
);

export const RubiksCube = () => {
  const colors = ["#c0392b", "#f1c40f", "#27ae60", "#2980b9", "#e67e22", "#ecf0f1"];
  const cells = [];
  let i = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={5 + col * 8.3}
          y={5 + row * 8.3}
          width="7.3"
          height="7.3"
          fill={colors[i % colors.length]}
          stroke="#171614"
          strokeWidth="0.9"
        />
      );
      i++;
    }
  }
  return (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <rect x="3" y="3" width="28.5" height="28.5" fill="#171614" rx="2.5" />
      {cells}
    </svg>
  );
};

export const ChessKing = () => (
  <svg viewBox="0 0 40 40" width="34" height="34">
    <defs>
      <linearGradient id="kingBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a3834" />
        <stop offset="100%" stopColor="#171614" />
      </linearGradient>
    </defs>
    <g fill="url(#kingBody)">
      <rect x="17.5" y="4" width="5" height="3.2" />
      <rect x="15.8" y="6.4" width="8.4" height="2.6" />
      <path d="M20 9 C22.5 9 24.3 11 24.3 13.2 C24.3 15 23.2 16.6 21.6 17.4 C25.2 19 28 22.6 28.6 27 C29 29.6 28.4 31.4 27.5 33 L12.5 33 C11.6 31.4 11 29.6 11.4 27 C12 22.6 14.8 19 18.4 17.4 C16.8 16.6 15.7 15 15.7 13.2 C15.7 11 17.5 9 20 9 Z" />
      <rect x="9.5" y="33" width="21" height="3.5" rx="1.2" />
    </g>
  </svg>
);

export const cursorIcons = [
  SoccerBall,
  AmericanFootball,
  TableTennisPaddle,
  ScrabbleTile,
  RubiksCube,
  ChessKing,
];
