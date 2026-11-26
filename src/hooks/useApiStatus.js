import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchStatus } from '../api/mockApi.js';

const RETRY_SECONDS = 10;
const INITIAL = { phase: 'loading', data: null, error: null, updated: null };


export function useApiStatus({ scenario, onRefreshed, onFailed }) {
  const [state, setState] = useState(INITIAL);
  const [countdown, setCountdown] = useState(RETRY_SECONDS);
  const scenarioRef = useRef(scenario);
  const requestId = useRef(0);
  const callbacks = useRef({});
  callbacks.current = { onRefreshed, onFailed };

  const load = useCallback(async (manual = false) => {
    const id = ++requestId.current;
    setState((p) => ({ ...p, phase: p.data ? 'refreshing' : 'loading', error: null }));
    try {
      const data = await fetchStatus(scenarioRef.current);
      if (id !== requestId.current) return; // ignore stale responses
      setState({ phase: data.length ? 'success' : 'empty', data, error: null, updated: new Date() });
      if (manual && data.length) callbacks.current.onRefreshed?.();
    } catch (e) {
      if (id !== requestId.current) return;
      setState((p) => ({ ...p, phase: 'error', error: e.message }));
      setCountdown(RETRY_SECONDS);
      callbacks.current.onFailed?.(e);
    }
  }, []);

  
  useEffect(() => {
    scenarioRef.current = scenario;
    setState(INITIAL);
    load();
  }, [scenario, load]);

  useEffect(() => {
    if (state.phase !== 'error') return;
    if (countdown <= 0) {
      load();
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [state.phase, countdown, load]);

  return {
    ...state,
    countdown,
    busy: state.phase === 'loading' || state.phase === 'refreshing',
    hasData: Boolean(state.data && state.data.length),
    reload: () => load(true),
  };
}
