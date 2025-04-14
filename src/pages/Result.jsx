// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Result = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { score = 0, answerHistory = [] } = state || {};

//   return (
//     <div className="max-w-3xl mx-auto text-white p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Quiz Summary</h1>
//       <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">
//           Score: {score} / {answerHistory.length}
//         </h2>

//         {answerHistory.map((item, idx) => (
//           <div key={idx} className="mb-6 border-b pb-4">
//             <p className="font-semibold">Q{idx + 1}: {item.question}</p>
//             <p>
//               <span className="font-medium">Your Answer:</span>{' '}
//               <span className={item.isCorrect ? 'text-green-600' : 'text-red-500'}>
//                 {item.yourAnswer.join(' ')}
//               </span>
//             </p>
//             {!item.isCorrect && (
//               <p>
//                 <span className="font-medium">Correct Answer:</span>{' '}
//                 <span className="text-green-600">{item.correctAnswer.join(' ')}</span>
//               </p>
//             )}
//           </div>
//         ))}

//         <div className="text-center mt-6">
//           <button
//             onClick={() => navigate('/')}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
//           >
//             Restart Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Result;



import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { score = 0, answerHistory = [] } = state || {};
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const percentage = Math.round((score / answerHistory.length) * 100);
  const isPerfectScore = percentage === 100;

  return (
    <div className="max-w-3xl mx-auto text-white p-4 min-h-screen">
      {isPerfectScore && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Quiz Summary</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={`${percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${percentage} 100`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold">
            Score: {score} / {answerHistory.length}
          </h2>
          <p className="text-lg mt-2">
            {percentage >= 90
              ? 'Excellent! 🎉'
              : percentage >= 70
              ? 'Good job! 👍'
              : percentage >= 50
              ? 'Not bad! 😊'
              : 'Keep practicing! 💪'}
          </p>
        </div>

        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
          {answerHistory.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-lg ${item.isCorrect ? 'bg-green-900/50' : 'bg-red-900/50'}`}
            >
              <p className="font-semibold">
                Q{idx + 1}: {item.question}
              </p>
              <p className="mt-2">
                <span className="font-medium">Your Answer:</span>{' '}
                <span className={item.isCorrect ? 'text-green-300' : 'text-red-300'}>
                  {item.yourAnswer.join(' ')}
                </span>
              </p>
              {!item.isCorrect && (
                <p className="mt-1">
                  <span className="font-medium">Correct Answer:</span>{' '}
                  <span className="text-green-300">{item.correctAnswer.join(' ')}</span>
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Restart Quiz
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Result;