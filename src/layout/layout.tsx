import { type ReactNode } from 'react';
import { Grid, MapGridItem, TopGridItem } from './styles';

export type LayoutProps = {
  className?: string;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  bottomRight?: ReactNode;
  top?: ReactNode;
  map?: ReactNode;
};

export function Layout({ top, map }: LayoutProps) {
  return (
    <Grid>
      <TopGridItem>{top}</TopGridItem>
      <MapGridItem>{map}</MapGridItem>
    </Grid>
  );
}
