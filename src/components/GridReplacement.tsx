import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface GridContainerProps extends BoxProps {
  container?: boolean;
  spacing?: number;
  children: React.ReactNode;
}

interface GridItemProps extends BoxProps {
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: React.ReactNode;
}

export const GridContainer: React.FC<GridContainerProps> = ({ 
  spacing = 0, 
  children, 
  sx,
  ...props 
}) => {
  const gap = spacing * 8; // MUI spacing unit is 8px
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: `-${gap / 2}px`,
        width: `calc(100% + ${gap}px)`,
        ...sx
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            spacing: gap / 2,
          });
        }
        return child;
      })}
    </Box>
  );
};

export const GridItem: React.FC<GridItemProps & { spacing?: number }> = ({ 
  xs = 12, 
  sm, 
  md, 
  lg, 
  xl,
  spacing = 0,
  children,
  sx,
  ...props 
}) => {
  const getWidth = (size?: number) => size ? `${(size / 12) * 100}%` : undefined;
  
  return (
    <Box
      sx={{
        padding: `${spacing}px`,
        width: getWidth(xs),
        '@media (min-width: 600px)': sm ? {
          width: getWidth(sm),
        } : {},
        '@media (min-width: 900px)': md ? {
          width: getWidth(md),
        } : {},
        '@media (min-width: 1200px)': lg ? {
          width: getWidth(lg),
        } : {},
        '@media (min-width: 1536px)': xl ? {
          width: getWidth(xl),
        } : {},
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};