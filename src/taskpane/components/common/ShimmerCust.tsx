import React from "react";

import { Shimmer, ThemeProvider, mergeStyles } from "@fluentui/react";

export interface CardState {}
// shimmer effects
const shimmerWrapper = mergeStyles({
  padding: 18,
  selectors: {
    "& > .ms-Shimmer-container": {
      margin: "10px 0",
    },
  },
});
export default class ShimmerCust extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider className={shimmerWrapper}>
        <Shimmer />
        <Shimmer width="75%" />
        <Shimmer width="50%" />
        <Shimmer width="60%" />
        <Shimmer width="66%" />
      </ThemeProvider>
    );
  }
}
