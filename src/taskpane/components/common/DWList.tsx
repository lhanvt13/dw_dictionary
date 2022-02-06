import React, { Component } from "react";
import DWCard from "./DWCard";

export interface DWListProps {
  doc_defs;
}
export default class DWList extends React.Component<DWListProps> {
  render() {
    const { doc_defs } = this.props;
    /**
     * ! TODO: Test
     *  (1) Test if this makes the right amout of cards
     *  (2) Test performance
     */
    return (
      <>
        {Object.entries(doc_defs).map(([word, definition]) => {
          return <DWCard key={word} word={word} value={definition} />;
        })}
      </>
    );
  }
}
