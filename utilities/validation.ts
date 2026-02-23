import { Ajv } from 'ajv';

/**
 * Validates the provided data against a JSON Schema using Ajv.
 *
 * Creates a new Ajv instance, compiles the given `schema`, and runs validation
 * against `data`. If validation fails, an Error is thrown containing the
 * Ajv validation errors serialized as JSON.
 *
 * @param schema - The JSON Schema object used to validate `data`.
 * @param data - The data to validate (a JSON-compatible value).
 * @throws {Error} When the data does not conform to the schema. The error
 *         message includes the Ajv validation errors.
 */
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
