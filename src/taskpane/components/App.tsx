import * as React from "react";
import Dictionary from "./main/Dictionary";
import Progress from "./Progress";

/* global Word, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
  current_paragraph: string;
}

export interface AppState {
  definitionItems: Definitions_Map;
  current_paragraph: string;
  curr_range;
}
export interface Definitions_Map {
  [key: string]: string;
}
export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      definitionItems: {},
      current_paragraph: "",
      curr_range: null,
    };
  }

  componentDidMount() {
    this.setState({});

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
        return context.sync().then(() => {
          console.log("current paragraph: ", this.state.current_paragraph);
          console.log("selected paragraph: ", range.paragraphs.items[0].text);
          // ! IF selected paragraph starts with quotation marks, check if add it to this.state.DefinitionItems
          // * [performance] if user clicks current paragraph again or makes no changes in the current paragraph (e.g., moving cursor around), no need to update the state
          if (this.state.current_paragraph !== range.paragraphs.items[0].text) {
            this.setState({
              current_paragraph: range.paragraphs.items[0].text,
            });
          }
        });
      });
    });
    return Word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("text");
      await context.sync();

      let paragraph_list: Definitions_Map = {};
      paragraphs.items.forEach((item) => {
        let paragraph: string = item.text.trim();
        if (paragraph && paragraph.startsWith("“")) {
          /**
           * (1) Get the word as key
           * (2) Get the definition as string
           */
          var key_word: string = paragraph.substring(paragraph.lastIndexOf("“") + 1, paragraph.lastIndexOf("”"));
          var definition: string = paragraph.split("“" + key_word + "”")[1].trim();
          paragraph_list[key_word] = definition;
        }
      });
      this.setState({
        definitionItems: paragraph_list,
      });
    }).catch(function (error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }

  render() {
    const { title, isOfficeInitialized } = this.props;
    const { current_paragraph } = this.state;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/logo-filled.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }
    const definitions_list: Definitions_Map = this.state.definitionItems;
    const definitions_list_array: Definitions_Map = {};
    const curr_paragraph_definisions_list_array: Definitions_Map = {};

    for (let [key, value] of Object.entries(definitions_list)) {
      definitions_list_array[key] = value;
      if (current_paragraph.indexOf(key) !== -1) {
        curr_paragraph_definisions_list_array[key] = value;
      }
    }

    return (
      <div className="ms-welcome">
        <Dictionary curr_para_defs={curr_paragraph_definisions_list_array} doc_defs={definitions_list} />
      </div>
    );
  }
}
