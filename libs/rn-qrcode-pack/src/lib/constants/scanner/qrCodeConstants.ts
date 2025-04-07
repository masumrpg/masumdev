// Default theme values
export const getThemeColors = (theme: "light" | "dark") => {
  if (theme === 'dark') {
    return {
      cornerColor: 'white',
      overlayBgColor: 'rgba(0, 0, 0, 0.7)',
      iconColor: 'white',
      controlBgColor: 'rgba(50, 50, 50, 0.8)',
      statusBgColor: 'rgba(50, 50, 50, 0.6)',
      statusTextColor: 'white',
    };
  }
  return {
    cornerColor: '#007AFF',
    overlayBgColor: 'rgba(0, 0, 0, 0.5)',
    iconColor: 'black',
    controlBgColor: 'white',
    statusBgColor: 'rgba(255, 255, 255, 0.4)',
    statusTextColor: 'white',
  };
};
