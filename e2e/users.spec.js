const {
  fetch,
} = process;

describe('GET /users', () => {
  it('should fail with 404 when no auth', () => (
    fetch('/users').then((res) => expect(res.status).toBe(404))
  ));
});

describe('GET /users/:uid', () => {
  it('should fail with 403 when no auth', () => (
    fetch('/users/example@gmail.com').then((res) => expect(res.status).toBe(403))
  ));
});

describe('PATCH /users/:uid', () => {
  it('should fail with 403 when no auth', () => (
    fetch('/users/example@gmail.com', { method: 'PATCH' })
      .then((res) => expect(res.status).toBe(403))
  ));
});

describe('DELETE /users/:uid', () => {
  it('should fail with 403 when no auth', () => (
    fetch('/users/example@gmail.com', { method: 'DELETE' })
      .then((res) => expect(res.status).toBe(403))
  ));
});
