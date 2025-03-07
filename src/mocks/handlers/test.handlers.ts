import { HttpResponse, http } from 'msw';

export const testHandlers = [
  http.get('/test', async () => {
    return HttpResponse.json({ message: 'Mocked response' });
  }),
];

export default testHandlers;
