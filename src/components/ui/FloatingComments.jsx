import { AnimatePresence, motion } from 'framer-motion'
import './FloatingComments.css'

export default function FloatingComments({ comments }) {
  return (
    <div className="float-comments-root" aria-live="polite">
      <AnimatePresence>
        {comments.map(c => (
          <motion.div
            key={c.id}
            className="float-comment"
            initial={{ opacity: 0, y: 0, x: 20, rotate: 3 }}
            animate={{ opacity: 1, y: -10, x: 0, rotate: Math.random() > 0.5 ? 2 : -2 }}
            exit={{ opacity: 0, y: -30, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            ✎ {c.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
