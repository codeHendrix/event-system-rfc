import { styled, css } from '@mui/material/styles';

const gridItemStyles = css`
  display: flex;
  justify-content: stretch;
  position: relative;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const sidebarStyles = css`
  ${gridItemStyles}
  flex-direction: column;
  align-items: stretch;
  padding: var(--sidebar-padding);
`;

export const BottomGridItem = styled('div')`
  ${gridItemStyles}
  grid-row: 5;
  grid-column: 1 / -1;
`;

export const BottomRightGridItem = styled('div')`
  ${sidebarStyles}
  grid-row: 3 / -1;
  grid-column: 3;
  justify-content: flex-end;
`;

export const Grid = styled('div')`
  --sidebar-padding: ${({ theme }) => theme.spacing(3)};
  --sidebar-width: calc(
    var(--sidebar-padding) * 2 + ${({ theme }) => theme.spacing(43)}
  );
  display: grid;
  grid-template-rows: 1rem auto minmax(0, 1fr) auto;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr) var(
      --sidebar-width
    );
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const LeftGridItem = styled('div')`
  ${sidebarStyles}
  grid-row: 3 / -1;
  grid-column: 1 / 3;
  overflow-y: hidden;
  height: calc(100% - 52px);
`;

export const MapGridItem = styled('div')`
  ${gridItemStyles}
  pointer-events: auto;
  grid-row: 3;
  grid-column: 1 / -1;
  overflow: hidden;
`;

export const RightGridItem = styled('div')`
  ${sidebarStyles}
  grid-row: 3 / -1;
  grid-column: 3;
`;

export const TopBannerItem = styled('div')`
  ${gridItemStyles}
  grid-row: 1;
  grid-column: 1 / -1;
`;

export const TopGridItem = styled('div')`
  ${gridItemStyles}
  grid-row: 2;
  grid-column: 1 / -1;
`;
