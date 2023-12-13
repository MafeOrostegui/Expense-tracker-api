const {
  fetch,
} = process;

describe('GET /users', () => {
  it('should fail with 404 when no auth', () => (
    fetch('/users').then((resp) => expect(resp.status).toBe(404))
  ));
});

describe('GET /users/:uid', () => {
  it('should fail with 403 when no auth', () => (
    fetch('/users/foo@bar.baz').then((resp) => expect(resp.status).toBe(403))
  ));
});

describe('PATCH /users/:uid', () => {
  it('should fail with 403 when no auth', () => (
    fetch('/users/foo@bar.baz', { method: 'PATCH' })
      .then((resp) => expect(resp.status).toBe(403))
  ));
});

describe('DELETE /users/:uid', () => {
  it('should fail with 403 when no auth', () => (
    fetch('/users/foo@bar.baz', { method: 'DELETE' })
      .then((resp) => expect(resp.status).toBe(403))
  ));
});
