/** 모든 MSW 목업 핸들러 관리 파일 */

import { activityHandlers } from './handlers/activity.handlers';
import { authHandlers } from './handlers/auth.handlers';
import { testHandlers } from './handlers/test.handlers';

const handlers = [...authHandlers, ...activityHandlers, ...testHandlers];

export default handlers;
