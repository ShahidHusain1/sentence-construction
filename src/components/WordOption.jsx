// import React from 'react';

// const WordOption = ({ word, onSelect }) => {
//   return (
//     <div
//       className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-xl shadow cursor-pointer text-center hover:bg-indigo-100 transition"
//       onClick={() => onSelect(word)}
//     >
//       {word}
//     </div>
//   );
// };

// export default WordOption;


import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const WordOption = ({ word, onSelect, disabled, isCorrect }) => {
  return (
    <motion.div
      className={`font-bold py-3 px-4 rounded-xl shadow cursor-pointer text-center transition ${
        disabled
          ? isCorrect
            ? 'bg-green-500 text-white'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          : 'bg-white text-indigo-600 hover:bg-indigo-100'
      }`}
      onClick={() => !disabled && onSelect(word)}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      >
        {word}
        </motion.div>
  );
};

export default WordOption;