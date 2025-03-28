// cspell:word istouched
import type { Scales } from "components/inputs/input/types";
import type { Scales as TextScales } from "components/text/types";
import type { ReactElement } from "react";
import type { LayoutProps, ResponsiveValue, SpaceProps } from "styled-system";

export const variants = {
  FANTOM: "fantom",
} as const;

type Variant = (typeof variants)[keyof typeof variants];

export interface InputGroupProps extends SpaceProps, LayoutProps {
  scale?: Scales;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  children: JSX.Element;
  error?: string;
  label?: string;
  touched?: boolean;
  disabled?: boolean;
  isShowError?: boolean;
  variant?: Variant;
  forId?: string;
  textScale?: ResponsiveValue<TextScales>;
  className?: string;
  inputWrapperStyles?: React.CSSProperties;
}

export interface StyledInputGroupProps extends LayoutProps {
  scale: Scales;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
}

export type InputIconProps = { scale: Scales; isEndIcon?: boolean };

export type InputInnerProps = { variant?: Variant };
