import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Shell } from '@/components/layout/Shell';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Method from '@/pages/Method';
import Sources from '@/pages/Sources';
import History from '@/pages/History';
import Privacy from '@/pages/Privacy';
import Deliberate from '@/pages/Deliberate';
import NotFound from '@/pages/NotFound';

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

export default function Router() {
  const location = useLocation();
  return (
    <Shell>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/method" element={<PageTransition><Method /></PageTransition>} />
          <Route path="/sources" element={<PageTransition><Sources /></PageTransition>} />
          <Route path="/history" element={<PageTransition><History /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="/deliberate" element={<PageTransition><Deliberate /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Shell>
  );
}
