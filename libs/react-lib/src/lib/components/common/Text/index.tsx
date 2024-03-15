import React from 'react';
import { Color } from '../../../state/types';
// @ts-ignore
export const LargeTitle: React.FC<unknown> = ({ children }): JSX.Element => (
  <h1 className="display-3 user-select-none">{children}</h1>
);
// @ts-ignore
export const Title: React.FC<unknown> = ({ children }): JSX.Element => (
  <h5 className="title-text user-select-none">{children}</h5>
);
// @ts-ignore
export const LeadText: React.FC<unknown> = ({ children }): JSX.Element => (
  <span className="title-text user-select-none">{children}</span>
);

interface Text {
  size?: number
  className?: string;
}
// @ts-ignore
export const Text: React.FC<Text> = ({ children, size = 1, className = '' }): JSX.Element => (
  <span className={`user-select-none ${className}`} style={{ fontSize: `${size}em` }}>{children}</span>
);
// @ts-ignore
export const BoldText: React.FC<Text> = ({ children, className, size = 1 }): JSX.Element => (// @ts-ignore
  <Text size={size} className={className}>
    <b>
      {children}
    </b>
  </Text>
);

interface ColorText extends Text {
  color?: Color;
}

export const ColorText: React.FC<ColorText> = ({// @ts-ignore
  children,
  color = 'success',
  className = '',
  size = 1,
}): JSX.Element => (// @ts-ignore
  <Text className={`text-${color} ${className}`} size={size}>
    {children}
  </Text>
);
// @ts-ignore
export const MiniText: React.FC<unknown> = ({ children }): JSX.Element => (
  <span className="mini-text user-select-none">{children}</span>
);
// @ts-ignore
export const MutedText: React.FC<unknown> = ({ children }): JSX.Element => (
  <span className="text-muted">{children}</span>
);
