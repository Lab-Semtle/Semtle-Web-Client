/** 핸들러 관리 파일 */
import { authHandlers } from './auth.handlers';
import { demoHandlers } from './demo.handlers';

const handlers = [...authHandlers, ...demoHandlers];

export default handlers;
