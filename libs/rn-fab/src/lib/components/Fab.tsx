import { View } from 'react-native';
import {
  FabProps,
  FabSingleProps,
} from '../types';
import FabClustered from './FabClustered';
import FabDoted from './FabDoted';
import FabExtended from './FabExtended';
import FabSingle from './FabSingle';
import FabStacked from './FabStacked';

const Fab = (props: FabProps) => {
  return (
    <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
      {(() => {
        switch (props.variant) {
          case 'clustered':
            return <FabClustered {...props} />;
          case 'doted':
            return <FabDoted {...props} />;
          case 'extended':
            return <FabExtended {...props} />;
          case 'single':
            return <FabSingle {...props} />;
          case 'stacked':
            return <FabStacked {...props} />;
          default:
            return <FabSingle {...(props as FabSingleProps)} />;
        }
      })()}
    </View>
  );
};

export { Fab };