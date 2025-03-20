import { ToastManager } from "../managers/ToastManager";
import { ToasterComponentProps } from "../types";
import { Toast } from "./Toast";

/**
 * A React component that renders toast notifications in your application.
 * This component should be placed at the root level of your app.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} [props.customColors] - Custom colors for different toast types
 * @param {Object} [props.customColors.success] - Colors for success toast
 * @param {string} [props.customColors.success.background] - Background color for success toast
 * @param {string} [props.customColors.success.text] - Text color for success toast
 * @param {Object} [props.customColors.error] - Colors for error toast
 * @param {string} [props.customColors.error.background] - Background color for error toast
 * @param {string} [props.customColors.error.text] - Text color for error toast
 * @param {Object} [props.customColors.info] - Colors for info toast
 * @param {string} [props.customColors.info.background] - Background color for info toast
 * @param {string} [props.customColors.info.text] - Text color for info toast
 * @param {Object} [props.customIcons] - Custom icons for different toast types
 * @param {ImageSourcePropType} [props.customIcons.success] - Custom icon for success toast
 * @param {ImageSourcePropType} [props.customIcons.error] - Custom icon for error toast
 * @param {ImageSourcePropType} [props.customIcons.info] - Custom icon for info toast
 * @param {number} [props.defaultAnimationDuration=400] - Duration of toast animations in milliseconds
 * @param {number} [props.defaultDuration=4000] - Duration before toast disappears in milliseconds
 *
 * @example
 * // Basic usage
 * function App() {
 *   return (
 *     <>
 *       <Toaster />
 *       <MainComponent />
 *     </>
 *   );
 * }
 *
 * @example
 * // With custom configuration
 * function App() {
 *   const customColors = {
 *     success: { background: '#E7F3EF', text: '#1D4B44' },
 *     error: { background: '#FDEDED', text: '#5F2120' },
 *     info: { background: '#EDF7FF', text: '#1A4971' }
 *   };
 *
 *   const customIcons = {
 *     success: require('./assets/success.png'),
 *     error: require('./assets/error.png'),
 *     info: require('./assets/info.png')
 *   };
 *
 *   return (
 *     <>
 *       <Toaster
 *         customColors={customColors}
 *         customIcons={customIcons}
 *         defaultDuration={3000}
 *         defaultAnimationDuration={300}
 *       />
 *       <MainComponent />
 *     </>
 *   );
 * }
 *
 * @returns {JSX.Element} A Toast component with the specified configuration
 */
export const Toaster = ({
  customColors,
  customIcons,
  defaultAnimationDuration,
  defaultDuration,
}: ToasterComponentProps) => {
  const props = {
    customColors,
    customIcons,
    defaultAnimationDuration,
    defaultDuration,
  };
  return (
    <Toast
      ref={(ref) => {
        if (ref) ToastManager.setToastRef(ref);
      }}
      {...props}
    />
  );
};
