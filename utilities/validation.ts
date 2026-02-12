import { Ajv } from 'ajv';

export function validateSchema(schema: object, data: JSON): void {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw new Error(
      'Schema validation failed: ' + JSON.stringify(validate.errors, null, 2)
    );
  }
}
