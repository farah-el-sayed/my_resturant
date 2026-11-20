import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const loadGame = () => import('./OfflineGame');
const OfflineGame = lazy(loadGame);
const connectionCheckUrl =
  import.meta.env.VITE_CONNECTION_CHECK_URL ||
  'https://www.gstatic.com/generate_204';

// فحص الإنترنت الحقيقي (مش فحص موقعك)
const checkConnection = async () => {
  if (!navigator.onLine) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch(connectionCheckUrl, {
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
};

export default function OfflineGate() {
  const { t } = useTranslation();
  const [offline, setOffline] = useState(!navigator.onLine);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 3000));
    idle(() => loadGame());

    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    window.addEventListener('app:network-error', goOffline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
      window.removeEventListener('app:network-error', goOffline);
    };
  }, []);

  // فحص تلقائي كل 5 ثواني وهو ظاهر، وبيختفي لحاله لما يرجع الاتصال
  useEffect(() => {
    if (!offline) return;
    const id = setInterval(async () => {
      if (await checkConnection()) setOffline(false);
    }, 5000);
    return () => clearInterval(id);
  }, [offline]);

  const retry = useCallback(async () => {
    setChecking(true);
    if (await checkConnection()) setOffline(false);
    setChecking(false);
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 overflow-y-auto bg-black/90 p-4 text-white">
      <p className="text-center text-lg font-semibold">
        {t("failedConnection")}
      </p>

      <button
        onClick={retry}
        disabled={checking}
        className="rounded-lg bg-white px-5 py-2 font-medium text-black disabled:opacity-60"
      >
        {checking ? t("checking") : t("tryAgain")}
      </button>

      <Suspense fallback={<p className="text-sm text-white/60">{t("loadingGame")}</p>}>
        <OfflineGame />
      </Suspense>
    </div>
  );
}