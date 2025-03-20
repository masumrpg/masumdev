import { StyleSheet } from "react-native";
import { PADDING, CONTAINER_SIZE, ICON_SIZE } from "../constants";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: PADDING,
    height: CONTAINER_SIZE,
    borderRadius: CONTAINER_SIZE / 2,
    overflow: "hidden",
  },
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  textContainer: {
    overflow: "hidden",
    marginLeft: PADDING,
  },
  hiddenTextContainer: {
    position: "absolute",
    top: -1000,
    left: -1000,
    opacity: 0,
  },
});
