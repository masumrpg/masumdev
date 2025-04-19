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

/**
 * Floating Action Button (FAB) component for React Native
 *
 * @component
 * @example
 * // Single FAB
 * <Fab
 *   variant="single"
 *   icon={<YourIconComponent />} // Custom component for the icon
 *   onPress={() => console.log('FAB pressed')}
 *   theme="light" // or "dark"
 *   style={{ // Optional custom styles
 *     backgroundColor: '#007AFF'
 *   }}
 * />
 *
 * @example
 * // Extended FAB with label
 * <Fab
 *   variant="extended"
 *   items={[
 *     {
 *       icon: <YourIconComponent />,
 *       label: "Edit",
 *       onPress: () => console.log('Edit pressed')
 *     }
 *   ]}
 *   theme="light"
 * />
 *
 * @example
 * // Stacked FAB with multiple actions
 * <Fab
 *   variant="stacked"
 *   items={[
 *     {
 *       icon: <EditIcon />,
 *       onPress: () => console.log('Edit')
 *     },
 *     {
 *       icon: <DeleteIcon />,
 *       onPress: () => console.log('Delete')
 *     }
 *   ]}
 *   theme="light"
 *   style={{ backgroundColor: '#007AFF' }}
 * />
 *
 * @example
 * // Clustered FAB
 * <Fab
 *   variant="clustered"
 *   items={[
 *     {
 *       icon: <CameraIcon />,
 *       label: "Camera",
 *       onPress: () => console.log('Camera')
 *     },
 *     {
 *       icon: <GalleryIcon />,
 *       label: "Gallery",
 *       onPress: () => console.log('Gallery')
 *     }
 *   ]}
 *   theme="light"
 * />
 *
 * @example
 * // Doted FAB with indicators
 * <Fab
 *   variant="doted"
 *   items={[
 *     {
 *       icon: <HomeIcon />,
 *       onPress: () => console.log('Home')
 *     },
 *     {
 *       icon: <SettingsIcon />,
 *       onPress: () => console.log('Settings')
 *     }
 *   ]}
 *   theme="light"
 *   isOpen={isOpen}
 *   plusIcon={<CustomPlusIcon />} // Optional custom plus icon
 * />
 *
 * @param {FabProps} props - The props for the FAB component
 * @param {('single'|'extended'|'stacked'|'clustered'|'doted')} [props.variant='single'] - The variant of the FAB
 * @param {ReactNode} [props.icon] - Custom icon for single variant
 * @param {ReactNode} [props.plusIcon] - Custom plus icon for doted variant
 * @param {Array<{ icon: ReactNode, label?: string, onPress: () => void }>} [props.items] - Items for extended, stacked, clustered, and doted variants
 * @param {() => void} [props.onPress] - Callback function for single variant
 * @param {'light'|'dark'} [props.theme='light'] - Theme of the FAB
 * @param {ViewStyle} [props.style] - Custom styles for the FAB
 * @param {boolean} [props.isOpen] - Control open state for doted variant
 * @returns {JSX.Element} Rendered FAB component
 */
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