import { ReactNode } from 'react';
import { Grid, TopGridItem, MapContainer } from './styles';

export type LayoutProps = {
  top?: ReactNode; // Content for the app bar
  map?: ReactNode; // Map or central content
};

export function Layout({ top, map }: LayoutProps) {
  return (
    <Grid>
      <TopGridItem>{top}</TopGridItem>

      <MapContainer>{map}</MapContainer>
    </Grid>
  );
}
