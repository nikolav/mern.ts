import { ReactNode } from "react"
import { useLocation, Routes } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useBodyOverflow } from "../../hooks"
//
export interface Props {
  children?: ReactNode
}
export const RouteTransition = ({ children }: Props) => {
  const overflow = useBodyOverflow()
  //
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      exit={{
        position: "absolute",
        width: "100%",
        zIndex: -1,
        opacity: 0,
        transition: {
          duration: 0.2,
        },
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      }}
      onAnimationStart={() => overflow.hidden(true)}
      onAnimationComplete={() => overflow.hidden(false)}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedRoutes = ({ children }: Props) => {
  const location = useLocation()
  return (
    <AnimatePresence initial={false}>
      <Routes key={location.pathname} location={location}>
        {children}
      </Routes>
    </AnimatePresence>
  )
}
