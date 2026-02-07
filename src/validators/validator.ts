const validator = (schema: any) => (payload: any) => schema.validate(payload);

export default validator;
