export class UserNotFound extends Error {
  constructor(message = 'User was not found') {
    super(message);
  }
}
