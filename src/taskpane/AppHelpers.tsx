export interface Definitions_Map {
  [key: string]: string;
}
export function retrieveKeyDefinitions({ paragraphs, split_value_start, split_value_end }) {
  /**
   * ! TODO: TEST
   *  Split this function out and test it with random paragraphs that:
   *    (1) HAVE the quotations to start,
   *    (2) have quotations in the middle
   *    (3) has a starting quotation, but no ending quotation
   *    (4) has no quotations
   *    (5) test performance
   * */
  let temp_dictionary: { [key: string]: string } = {};
  // Go through paragraphs
  paragraphs.items.forEach((item) => {
    // Get the text
    let paragraph: string = item.text.trim();
    // Get the "definition paragraphs"
    if (paragraph && paragraph.startsWith(split_value_start)) {
      /**
       * (1) Get the word as key
       * (2) Get the definition as string
       */
      var key_word: string = paragraph.substring(
        paragraph.indexOf(split_value_start) + 1,
        paragraph.indexOf(split_value_end)
      );
      var definition: string = paragraph.split(split_value_start + key_word + split_value_end)[1].trim();

      // check for case: entire paragraph is surrounded in quotations
      if (key_word.length > 0 && definition.length > 0) {
        temp_dictionary[key_word] = definition;
      }
    }
  });
  return temp_dictionary;
}
module.exports = { retrieveKeyDefinitions };
