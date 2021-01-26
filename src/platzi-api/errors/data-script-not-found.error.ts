export class DataScriptNotFound extends Error {
  constructor(message = 'Data script not found') {
    super(message);
  }
}
