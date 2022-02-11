import * as React from "react";
import DWList from "../common/DWList";
import { Pivot, PivotItem } from "@fluentui/react";
import { IImageProps, Image, ImageFit } from "@fluentui/react/lib/Image";
export interface HeroListItem {
  icon: string;
  primaryText: string;
}

export interface HeroListProps {
  curr_para_defs;
  doc_defs;
}

const imageStyles: Partial<IImageProps> = {
  imageFit: ImageFit.contain,
  width: 200,
  height: 200,
  styles: () => ({ root: { filter: "grayscale(100%)" } }),
};
const pivotStyles = { root: { display: "flex", justifyContent: "center", marginBottom: "6px" } };
export default class Dictionary extends React.Component<HeroListProps> {
  renderPivotPane = (items_list, num_items) => {
    if (num_items <= 0) {
      return (
        <>
          <Image
            {...imageStyles}
            src={
              "https://uploads-ssl.webflow.com/61c9ec1055dce2405b8f19c6/61ca10aad0f01718b350f88b_DraftWise-logo-H.svg"
            }
            alt="DraftWise Logo."
          />
          <DWList doc_defs={items_list} />
        </>
      );
    } else {
      return (
        <>
          <DWList doc_defs={items_list} />
        </>
      );
    }
  };
  render() {
    const { children, curr_para_defs, doc_defs } = this.props;

    let num_curr_doc_defs: number = Object.keys(curr_para_defs).length;
    let num_doc_defs: number = Object.keys(doc_defs).length;
    return (
      <main className="ms-welcome__main">
        <Pivot aria-label="pivot-panes" linkSize="large" linkFormat="tabs" {...pivotStyles}>
          <PivotItem headerText="Current" itemCount={num_curr_doc_defs} className="pivot-items">
            {this.renderPivotPane(curr_para_defs, num_curr_doc_defs)}
          </PivotItem>
          <PivotItem headerText="Whole Document" itemCount={num_doc_defs} className="pivot-items">
            {this.renderPivotPane(doc_defs, num_doc_defs)}
          </PivotItem>
        </Pivot>
        {children}
      </main>
    );
  }
}
