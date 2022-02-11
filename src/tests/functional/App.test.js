const { retrieveKeyDefinitions } = require("../../taskpane/AppHelpers");
const split_value_start = "“";
const split_value_end = "”";

test("test initial loading of dictionary", () => {
  const paragraphs = {
    items: [
      {
        text: `“Voting Agreement” means the agreement among the Company, the Purchasers and certain other stockholders of the Company, dated as of the date of the Initial Closing, in the form of Exhibit H attached to this Agreement. `,
      },
    ],
  };

  expect(retrieveKeyDefinitions({ paragraphs, split_value_start, split_value_end })).toEqual({
    "Voting Agreement":
      "means the agreement among the Company, the Purchasers and certain other stockholders of the Company, dated as of the date of the Initial Closing, in the form of Exhibit H attached to this Agreement.",
  });
});

test("test initial loading of dictionary with multiple definition paragraphs", () => {
  const paragraphs = {
    items: [
      {
        text: `“Voting Agreement” means the agreement among the Company, the Purchasers and certain other stockholders of the Company, dated as of the date of the Initial Closing, in the form of Exhibit H attached to this Agreement. `,
      },
      {
        text: `“Transaction Agreements” means this Agreement, the Investors’ Rights Agreement, the Management Rights Letter, the Right of First Refusal and Co-Sale Agreement, the Voting Agreement and [list any other agreements, instruments or documents entered into in connection with this Agreement]. `,
      },
    ],
  };

  expect(retrieveKeyDefinitions({ paragraphs, split_value_start, split_value_end })).toEqual({
    "Voting Agreement":
      "means the agreement among the Company, the Purchasers and certain other stockholders of the Company, dated as of the date of the Initial Closing, in the form of Exhibit H attached to this Agreement.",
    "Transaction Agreements": `means this Agreement, the Investors’ Rights Agreement, the Management Rights Letter, the Right of First Refusal and Co-Sale Agreement, the Voting Agreement and [list any other agreements, instruments or documents entered into in connection with this Agreement].`,
  });
});

test("test initial loading of dictionary with no definitions", () => {
  const paragraphs = {
    items: [
      {
        text: `Representations and Warranties of the Company.12  The Company hereby represents and warrants to each Purchaser that, except as set forth on the Disclosure Schedule attached as Exhibit C to this Agreement, which exceptions shall be deemed to be part of the representations and warranties made hereunder, the following representations are true and complete as of the date of the [Initial][applicable] Closing, except as otherwise indicated. The Disclosure Schedule shall be arranged in sections corresponding to the numbered and lettered sections contained in this Section 2, and the disclosures in any section of the Disclosure Schedule shall qualify other sections in this Section 2 only to the extent it is readily apparent from a reading of the disclosure that such disclosure is applicable to such other sections .`,
      },
      {
        text: `For purposes of these representations and warranties (other than those in Sections 2.2, 2.3, 2.4, 2.5, and 2.6), the term the “Company” shall include any subsidiaries of the Company, unless otherwise noted herein. `,
      },
    ],
  };

  expect(retrieveKeyDefinitions({ paragraphs, split_value_start, split_value_end })).toEqual({});
});

test("test initial loading of dictionary with quotations within the paragraph", () => {
  const paragraphs = {
    items: [
      {
        text: `“Knowledge” including the phrase “to the Company’s knowledge” shall mean the actual knowledge [after reasonable investigation and assuming such knowledge as the individual would have as a result of the reasonable performance of his or her duties in the ordinary course] of the following officers: [specify names].10  Additionally, for purposes of Section 2.8, the Company shall be deemed to have “knowledge” of a patent right if the Company has actual knowledge of the patent right or would be found to be on notice of such patent right as determined by reference to United States patent laws.`,
      },
    ],
  };

  expect(retrieveKeyDefinitions({ paragraphs, split_value_start, split_value_end })).toEqual({
    Knowledge:
      "including the phrase “to the Company’s knowledge” shall mean the actual knowledge [after reasonable investigation and assuming such knowledge as the individual would have as a result of the reasonable performance of his or her duties in the ordinary course] of the following officers: [specify names].10  Additionally, for purposes of Section 2.8, the Company shall be deemed to have “knowledge” of a patent right if the Company has actual knowledge of the patent right or would be found to be on notice of such patent right as determined by reference to United States patent laws.",
  });
});
