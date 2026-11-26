import { useCallback, useState } from 'react';

export function useToasts(duration = 5000) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const push = useCallback(
    (kind, msg) => {
      const id = crypto.randomUUID();
      setToasts((t) => [...t.slice(-2), { id, kind, msg }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss, duration]
  );

  return { toasts, push, dismiss };
}
