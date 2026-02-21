import { useMemo } from 'react';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';

export const useTheme = () => {
  const theme = useMemo(
    () => ({
      colors,
      typography,
      spacing,
    }),
    []
  );

  return theme;
};
