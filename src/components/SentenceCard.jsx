// import React from 'react';

// const SentenceCard = ({ sentenceParts, selectedWords, onBlankClick }) => {
//   return (
//     <div className="text-xl flex flex-wrap gap-2 p-4 bg-white rounded-xl shadow-lg">
//       {sentenceParts.map((part, index) => (
//         <span key={index}>
//           {part === '__' ? (
//             <span
//               className="inline-block min-w-[60px] px-2 py-1 border-b-2 border-indigo-500 text-indigo-600 cursor-pointer"
//               onClick={() => onBlankClick(index)}
//             >
//               {selectedWords[index] || '____'}
//             </span>
//           ) : (
//             <span>{part}</span>
//           )}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default SentenceCard;




import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const SentenceCard = ({ 
  sentenceParts, 
  selectedWords, 
  onBlankClick,
  showFeedback = false,
  correctAnswers = []
}) => {
  return (
    <motion.div 
      className="text-xl flex flex-wrap gap-2 p-4 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {sentenceParts.map((part, index) => (
        <React.Fragment key={index}>
          {part === '__' ? (
            <motion.span
              className={`inline-block min-w-[60px] px-2 py-1 border-b-2 cursor-pointer transition-colors ${
                showFeedback
                  ? selectedWords[index] === correctAnswers[index]
                    ? 'border-green-500 text-green-600'
                    : 'border-red-500 text-red-600'
                  : 'border-indigo-500 text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => onBlankClick(index)}
              whileHover={!showFeedback ? { scale: 1.05 } : {}}
              whileTap={!showFeedback ? { scale: 0.95 } : {}}
            >
              {selectedWords[index] || '____'}
              {showFeedback && selectedWords[index] !== correctAnswers[index] && (
                <span className="block text-xs text-green-600">
                  {correctAnswers[index]}
                </span>
              )}
            </motion.span>
          ) : (
            <span className="text-gray-800">{part}</span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default React.memo(SentenceCard);