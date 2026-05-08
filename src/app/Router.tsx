import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shell } from '@/components/layout/Shell';
import Home from '@/pages/Home';

const About = lazy(() => import('@/pages/About'));
const Method = lazy(() => import('@/pages/Method'));
const Sources = lazy(() => import('@/pages/Sources'));
const History = lazy(() => import('@/pages/History'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Deliberate = lazy(() => import('@/pages/Deliberate'));
const Examples = lazy(() => import('@/pages/Examples'));
const ExampleDetail = lazy(() => import('@/pages/ExampleDetail'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PageFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-prose px-6 py-32 text-center text-sm text-muted-foreground"
    >
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function Router() {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <Shell>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        {t('nav.skipToContent', { defaultValue: 'Skip to main content' })}
      </a>
      <AnimatePresence mode="wait" initial={false}>
        <Suspense key={`s-${location.pathname}`} fallback={<PageFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/method" element={<PageTransition><Method /></PageTransition>} />
            <Route path="/sources" element={<PageTransition><Sources /></PageTransition>} />
            <Route path="/history" element={<PageTransition><History /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/deliberate" element={<PageTransition><Deliberate /></PageTransition>} />
            <Route path="/examples" element={<PageTransition><Examples /></PageTransition>} />
            <Route path="/examples/:id" element={<PageTransition><ExampleDetail /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Shell>
  );
}
