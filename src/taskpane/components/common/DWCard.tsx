import React from "react";
import { DefaultButton } from "@fluentui/react";
import { Icon } from "@fluentui/react/lib/Icon";

export interface DWCardProps {
  word;
  value;
}
export interface CardState {
  isExpanded: boolean;
}

const buttonValues: { [key: string]: string } = { expanded: "see less", minimized: "see more" };
export default class DWCard extends React.Component<DWCardProps, CardState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isExpanded: false,
    };
  }
  expandDefinition = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };
  capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const { word, value } = this.props;
    const { isExpanded } = this.state;

    let displayed_definition: string = value;
    let button_text: string = buttonValues["expanded"];
    if (value.length > 120) {
      if (!isExpanded) {
        displayed_definition = `${value.substring(0, 120)} . . .`;
        button_text = buttonValues["minimized"];
      }
    }

    return (
      <div className="dw-card-wrapper ">
        <div className="dw-card ms-depth-4">
          <h3>{word}</h3>
          <p className="dw-card-definition"> {this.capitalizeFirstLetter(displayed_definition)}</p>
          <div className="dw-card-button-container">
            {value.length > 120 ? (
              <DefaultButton className="dw-card-button" text={button_text} onClick={this.expandDefinition}>
                {" "}
                {isExpanded ? <Icon iconName="CaretUpSolid8" /> : <Icon iconName="CaretDownSolid8" />}
              </DefaultButton>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
