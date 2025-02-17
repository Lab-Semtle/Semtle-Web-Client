/** 핸들러 관리 파일 */
import { authHandlers } from './auth.handlers';
import { secretPostHandlers } from './secret.handlers';

const handlers = [...authHandlers, ...secretPostHandlers];

export default handlers;
