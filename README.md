# API status screen (React + Tailwind + Vite)

```bash
npm install
npm run dev
```

- `src/api/mockApi.js` – swap `fetchStatus` for a real `fetch` call.
- `src/hooks/useApiStatus.js` – async state machine: loading → success | empty | error, refreshing, auto-retry, stale data kept on failure.
- `src/hooks/useToasts.js` – toast queue with auto-dismiss.
- `src/components/` – Skeleton, StatusPill, Bars, Toasts, ErrorBanner, Panel, Stat, EndpointTable.
- The "Demo scenario" switcher in `App.jsx` is for previewing states only; delete it for production.
