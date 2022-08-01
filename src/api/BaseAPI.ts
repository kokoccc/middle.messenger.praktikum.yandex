export default class BaseAPI {
  create() {
    throw new Error('Create API method is not implemented');
  }

  request() {
    throw new Error('Request API method is not implemented');
  }

  update() {
    throw new Error('Update API method is not implemented');
  }

  delete() {
    throw new Error('Delete API method is not implemented');
  }
}
