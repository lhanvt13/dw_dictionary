import * as React from "react";
import DWList from "../common/DWList";
import { DefaultButton, IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from "@fluentui/react";
import { IImageProps, Image, ImageFit } from "@fluentui/react/lib/Image";
export interface HeroListItem {
  icon: string;
  primaryText: string;
}

export interface HeroListProps {
  curr_para_defs;
  doc_defs;
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 14, width: "100%" },
};
const imageStyles: Partial<IImageProps> = {
  imageFit: ImageFit.contain,
  width: 200,
  height: 200,
  // Show a border around the image (just for demonstration purposes)
  styles: () => ({ root: { filter: "grayscale(100%)" } }),
};
export default class Dictionary extends React.Component<HeroListProps> {
  render() {
    const { children, curr_para_defs, doc_defs } = this.props;

    let num_curr_doc_defs: number = Object.keys(curr_para_defs).length;
    let num_doc_defs: number = Object.keys(doc_defs).length;
    return (
      <main className="ms-welcome__main">
        <Pivot
          aria-label="pivot-panes"
          linkSize="large"
          linkFormat="tabs"
          styles={{ root: { display: "flex", justifyContent: "center", marginBottom: "6px" } }}
        >
          <PivotItem headerText="Current" itemCount={num_curr_doc_defs} className="pivot-items">
            {num_curr_doc_defs <= 0 ? (
              <Image
                {...imageStyles}
                src={
                  "https://uploads-ssl.webflow.com/61c9ec1055dce2405b8f19c6/61ca10aad0f01718b350f88b_DraftWise-logo-H.svg"
                }
                alt="DraftWise Logo."
              />
            ) : (
              <></>
            )}
            <DWList doc_defs={curr_para_defs} />
          </PivotItem>
          <PivotItem headerText="Whole Document" itemCount={num_doc_defs}>
            {/* {num_doc_defs <= 0 ? <Label styles={labelStyles}>None</Label> : <></>} */}
            {num_doc_defs <= 0 ? (
              <Image
                {...imageStyles}
                src={
                  "https://uploads-ssl.webflow.com/61c9ec1055dce2405b8f19c6/61ca10aad0f01718b350f88b_DraftWise-logo-H.svg"
                }
                alt='Example of the image fit value "centerCover" on an image smaller than the frame.'
              />
            ) : (
              <></>
            )}
            <DWList doc_defs={doc_defs} />
          </PivotItem>
        </Pivot>
        {children}
      </main>
    );
  }
}
