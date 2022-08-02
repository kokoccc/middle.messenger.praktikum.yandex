import { isEqual } from 'helpers';

interface ITextFieldValidationResult {
  isValid: boolean
  errorMessages: string[]
}

const validateRegexMatching = (value: string, rule: IValidationRuleRegex) => {
  const { regex, negative } = rule;
  const isRegexTestPassed = regex.test(value);

  return negative ? !isRegexTestPassed : isRegexTestPassed;
};

const validateValueMatching = (
  inputEl: HTMLInputElement,
  { compareFieldName }: { compareFieldName: string },
) => {
  const formEl = inputEl.closest('form') as HTMLFormElement;
  const originalInputEl = formEl.querySelector(`input[name="${compareFieldName}"]`) as HTMLInputElement;
  const originalValue = originalInputEl.value;

  return isEqual(inputEl.value, originalValue);
};

const validateTextField = (
  inputEl: HTMLInputElement,
  rules: TValidationRules,
): ITextFieldValidationResult => {
  const errorMessages = rules.reduce((arr: string[], rule: IValidationRule) => {
    const isValid = rule.regex
      ? validateRegexMatching(inputEl.value, rule as IValidationRuleRegex)
      : validateValueMatching(inputEl, rule as IValidationRuleCompare);

    return isValid ? arr : arr.concat(rule.message);
  }, []);

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
};

export { validateTextField };
