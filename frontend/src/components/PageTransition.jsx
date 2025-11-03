import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -12, scale: 0.98 }}
			transition={{ duration: 0.25, ease: 'easeOut' }}
			style={{ height: '100%' }}
		>
			{children}
		</motion.div>
	);
};

export default PageTransition;
