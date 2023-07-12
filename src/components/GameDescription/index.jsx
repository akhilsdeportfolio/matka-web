/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
const winnings = [
  { name: "ank", factor: 90, digits: 1 },
  { name: "jodi", factor: 950, digits: 2 },
  { name: "single-panna", factor: 1500, digits: 3 },
  { name: "double-panna", factor: 3000, digits: 3 },
  { name: "triple-panna", factor: 6000, digits: 3 },
  { name: "half-sangam", factor: 10000, digits: 3 },
  { name: "full-sangam", factor: 100000, digits: 6 },
];

export default function GameDescription({ type }) {
  const game = winnings.find((el) => el.name === type);
  return (
    <>
      <p
        className={`mb-2 text-xs font-bold text-center`}
        style={{ color: "var(--adm-color-weak)" }}
      >
        Choose {game.digits} Digit's and win {game.factor }X your bet
      </p>
      <p
        className={`mb-2 text-xs text-center`}
        style={{ color: "var(--adm-color-weak)" }}
      >
        play &#8377;100 and win &#8377;{game.factor * 10}
      </p>
    </>
  );
}
