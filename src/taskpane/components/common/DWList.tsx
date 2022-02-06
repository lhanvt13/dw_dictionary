import React, { Component } from "react";
import DWCard from "./DWCard";

export interface DWListProps {
  doc_defs;
}
export default class DWList extends React.Component<DWListProps> {
  render() {
    const { doc_defs } = this.props;
    return (
      <div>
        {Object.entries(doc_defs).map(([key, value]) => {
          return (
            <div key={key}>
              <DWCard word={key} value={value} />
            </div>
          );
        })}
      </div>
    );
  }
}
