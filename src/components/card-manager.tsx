import { Information } from './information';
import { selectors, useStore } from '../event-bus/state';
import { SCATTERPLOT_LAYER_1, SCATTERPLOT_LAYER_2 } from '../constants';

const InformationLookup = {
  [SCATTERPLOT_LAYER_1]: Information,
  [SCATTERPLOT_LAYER_2]: Information,
} as const;

type InformationLookupKeys = keyof typeof InformationLookup;

// NOTE: could easily do a lookup here to get a custom card. for simplicity sake we just reference the same component.
export function CardManager() {
  const entity = useStore(selectors.selectedEntity);

  if (!entity) {
    return null;
  }

  return <Information id={entity.id} coordinates={entity.coordinates} />;

  // console.log(entity);

  // const Component = InformationLookup[entity.layer as InformationLookupKeys];

  // if (!Component) {
  //   return null;
  // }

  // return <Component id={entity.id} coordinates={entity.coordinates} />;
}
