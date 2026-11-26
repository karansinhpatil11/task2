
const BASE = [
  { id: 1, name: 'Auth service', path: 'POST /v1/auth/token', kind: 'ok', lat: 84, up: 99.99 },
  { id: 2, name: 'Payments', path: 'POST /v1/charges', kind: 'warn', lat: 412, up: 99.82 },
  { id: 3, name: 'Orders', path: 'GET /v1/orders', kind: 'ok', lat: 121, up: 99.95 },
  { id: 4, name: 'Search', path: 'GET /v1/search', kind: 'ok', lat: 96, up: 99.97 },
  { id: 5, name: 'Notifications', path: 'POST /v1/notify', kind: 'err', lat: null, up: 98.4 },
];


export function fetchStatus(scenario = 'ok') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (scenario === 'error') return reject(new Error('HTTP 503 · req_8f2a91c'));
      if (scenario === 'empty') return resolve([]);
      resolve(BASE.map((e) => ({ ...e, lat: e.lat && e.lat + Math.round(Math.random() * 20 - 10) })));
    }, 1400);
  });
}
