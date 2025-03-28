import Svg from "components/svg/Svg";
import { css, type DefaultTheme } from "styled-components";

import { type ButtonProps, scales } from "./types";

interface ThemedProps extends ButtonProps {
  theme: DefaultTheme;
}

export const variantStyles = ({ theme, color, variant, isLoading }: ThemedProps) => {
  return {
    outline: css`
      background-color: ${({ theme }) => theme.colors.transparent};
      color: ${({ theme }) => (color ? theme.colors[color] : theme.colors.econiaBlue)};

      &:not([disabled]):hover {
        color: ${theme.colors.econiaBlue};
        ${Svg} {
          fill: ${theme.colors.econiaBlue};
        }
      }

      ${Svg} {
        fill: ${theme.colors.econiaBlue};
      }

      &:disabled {
        color: ${!isLoading && theme.colors.darkGray};
        cursor: not-allowed;

        ${Svg} {
          fill: ${!isLoading && theme.colors.darkGray};
        }
      }
    `,
  }[variant!];
};

export const scaleVariants = {
  [scales.SMALL]: {
    padding: "4px",
    minWidth: 74,
    fontSize: 20,
    lineHeight: "125%",
  },
  [scales.LARGE]: {
    padding: "4px",
    minWidth: 100,
    fontSize: 24,
    lineHeight: "125%",
  },
};
