import axios from 'axios';

describe('Queries', () => {
  describe('users', () => {
    it('should return user with id 1', async () => {
      const query = `
        query {
          user(id: 1) {
            id
            username
          }
        }
      `;

      const res = await axios.post('', { query });

      // Check if request was successful
      expect(res.status).toBe(200);

      // Check if data returned from GraphQL endpoint is as expected
      expect(res.data).toEqual({
        data: {
          user: {
            id: '1', // the id might be returned as a string
            username: 'omar',
          },
        },
      });
    });
  });
});
