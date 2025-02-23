/** 브라우저 환경에서의 MSW 설정 */

import { setupWorker } from 'msw/browser';
import handlers from './handlers';

export const worker = setupWorker(...handlers);
