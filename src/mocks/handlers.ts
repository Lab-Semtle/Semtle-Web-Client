/** 핸들러 관리 파일 */
import { activityHandlers } from './handlers/activity.handlers';
import { authHandlers } from './handlers/auth.handlers';

const handlers = [...authHandlers, ...activityHandlers];

export default handlers;
