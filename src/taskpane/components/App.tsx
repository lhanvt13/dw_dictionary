import * as React from "react";
import Dictionary from "./main/Dictionary";
import Progress from "./Progress";
import { retrieveKeyDefinitions } from "../AppHelpers";
import ShimmerCust from "./common/ShimmerCust";
/* global Word, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
  current_paragraph: string;
}
export interface AppState {
  dictionairy: Definitions_Map;
  current_paragraph: string;
  is_loading: boolean;
}
export interface Definitions_Map {
  [key: string]: string;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dictionairy: {},
      current_paragraph: "",
      is_loading: true,
    };
  }

  initializeDictionary() {
    /**
     * * Find Definitions
     * (1) Get all paragraphs
     * (2) Find paragraphs with quotation starts
     * (3) Map them into k-v pairs
     */
    return Word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("text");

      await context.sync();
      const temp_dictionary = retrieveKeyDefinitions({ paragraphs, split_value_start: "“", split_value_end: "”" });
      this.setState({
        dictionairy: temp_dictionary,
      });
    }).catch(function (error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }
  componentDidMount() {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, () => {
      /**
       * ! TODO: find a way to only trigger if prev_paragraph !== current_selection
       * Possibilities:
       *    (1) Keep track of paragraph numbers in array - this might have performance issues because we'd have to check each time for if there is a new paragraph
       *    (2) Wrap current paragraph in a hidden content control, and keep track of whether I'm still within the "content control" each time this fires?
       *    (3) Keep track of range, and compare range each time? - this seems like an expensive operation...
       */
      return Word.run((context) => {
        let range = context.document.getSelection();
        range.paragraphs.load("items");
        return context
          .sync()
          .then(() => {
            // ! IF selected paragraph starts with quotation marks, check if add it to this.state.DefinitionItems
            // * [performance] if user clicks current paragraph again or makes no changes in the current paragraph (e.g., moving cursor around), no need to update the state
            if (this.state.current_paragraph !== range.paragraphs.items[0].text) {
              // this.setState({
              //   current_paragraph: range.paragraphs.items[0].text,
              //   is_loading: false,
              // });
              this.setState({
                current_paragraph: range.paragraphs.items[0].text,
                is_loading: true,
              });
            }
          })
          .catch((err) => {
            console.log("error occurred: ", err);
          });
      });
    });
    this.initializeDictionary();
  }

  render() {
    const { title, isOfficeInitialized } = this.props;
    const { current_paragraph, dictionairy, is_loading } = this.state;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/logo-filled.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }
    const curr_paragraph_definitions: Definitions_Map = {};

    // Check whether current paragraph contains words from the dictionairy
    for (let [key, value] of Object.entries(dictionairy)) {
      if (current_paragraph.indexOf(key) !== -1) {
        curr_paragraph_definitions[key] = value;
      }
    }
    if (is_loading) {
      return <ShimmerCust />;
    }

    return (
      <div className="ms-welcome">
        <Dictionary curr_para_defs={curr_paragraph_definitions} doc_defs={dictionairy} />
      </div>
    );
  }
}
