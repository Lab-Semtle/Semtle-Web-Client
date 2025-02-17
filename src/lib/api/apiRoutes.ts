const API_BASE = '/index';

export const API_ROUTES = {
  READ_RECENT_ACTIVITY: (limit: number) =>
    `${API_BASE}/activity/recent?limit=${limit}`,
};
