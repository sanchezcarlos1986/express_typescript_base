import { sum } from "../sum";

describe.each`
  number1 | number2 | expectedResult
  ${1}    | ${1}    | ${2}
  ${4}    | ${6}    | ${10}
`("sum", ({ number1, number2, expectedResult }) => {
  it(`sum ${number1} and ${number2} shoud be ${expectedResult}`, () => {
    expect(sum(number1, number2)).toBe(expectedResult);
  });
});
