import { useTranslation } from "react-i18next";

export const winnings = [
  { name: "ank", factor: 9, digits: 1 },
  { name: "jodi", factor: 95, digits: 2 },
  { name: "single-panna", factor: 150, digits: 3 },
  { name: "double-panna", factor: 300, digits: 3 },
  { name: "triple-panna", factor: 600, digits: 3 },
  { name: "half-sangam", factor: 5000, digits: 4 },
  { name: "full-sangam", factor: 10000, digits: 6 },
];

export default function GameDescription({ type }) {
  const { t } = useTranslation();
  const game = winnings.find((el) => el.name === type);
  return (
    <>
      <p
        className={`mb-2 text-xs font-bold text-center`}
        style={{ color: "var(--adm-color-weak)" }}
      >
        {t("guess")} {game.digits} {t("digits")} {t("and")}&nbsp;{t("win")}{" "}
        {game.factor}X {t("yourbet")}
      </p>
      <p
        className={`mb-2 text-xs text-center`}
        style={{ color: "var(--adm-color-weak)" }}
      >
        {t("play")} &#x20B9; 100 {t("and")} {t("win")} &#x20B9;{" "}
        {game.factor * 100}
      </p>
    </>
  );
}
