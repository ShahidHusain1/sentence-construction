// import React, { useEffect, useState } from 'react';
// import Timer from '../components/Timer';
// import WordOption from '../components/WordOption';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [filledBlanks, setFilledBlanks]  = useState([]);
//   const [answerHistory, setAnswerHistory] = useState([]);
//   const navigate = useNavigate();

//   const data = [
//     {
//       "id": 1,
//       "sentence": "The dog __ in the __.",
//       "blanks": 2,
//       "options": ["barked", "yard", "ran", "tree"],
//       "correct": ["barked", "yard"]
//     },
//     {
//       "id": 2,
//       "sentence": "He __ a book on the __.",
//       "blanks": 2,
//       "options": ["reads", "shelf", "eats", "writes"],
//       "correct": ["reads", "shelf"]
//     },
//     {
//       "id": 3,
//       "sentence": "They __ to the __ to play.",
//       "blanks": 2,
//       "options": ["went", "park", "jumped", "bicycles"],
//       "correct": ["went", "park"]
//     },
//     {
//       "id": 4,
//       "sentence": "The baby __ in the __.",
//       "blanks": 2,
//       "options": ["cries", "crib", "sleeps", "hurts"],
//       "correct": ["cries", "crib"]
//     },
//     {
//       "id": 5,
//       "sentence": "She __ flowers in the __.",
//       "blanks": 2,
//       "options": ["planted", "garden", "cooked", "cake"],
//       "correct": ["planted", "garden"]
//     },
//     {
//       "id": 6,
//       "sentence": "I like to __ movies on the __.",
//       "blanks": 2,
//       "options": ["watch", "screen", "read", "phone"],
//       "correct": ["watch", "screen"]
//     },
//     {
//       "id": 7,
//       "sentence": "The teacher __ the __.",
//       "blanks": 2,
//       "options": ["explains", "homework", "draws", "paints"],
//       "correct": ["explains", "homework"]
//     },
//     {
//       "id": 8,
//       "sentence": "The children __ in the __.",
//       "blanks": 2,
//       "options": ["play", "sandbox", "sleep", "eat"],
//       "correct": ["play", "sandbox"]
//     },
//     {
//       "id": 9,
//       "sentence": "My sister __ cookies in the __.",
//       "blanks": 2,
//       "options": ["bakes", "oven", "eats", "makes"],
//       "correct": ["bakes", "oven"]
//     },
//     {
//       "id": 10,
//       "sentence": "He __ a ride on the __.",
//       "blanks": 2,
//       "options": ["takes", "bicycle", "drives", "bus"],
//       "correct": ["takes", "bicycle"]
//     }
//   ];

//   useEffect(() => {
//     setQuestions(data);
//   }, []); // This effect should run only once after the initial render

//   const currentQuestion = questions[currentIndex];

//   const handleWordClick = (word) => {
//     if (filledBlanks.includes(word) || filledBlanks.length >= currentQuestion.blanks) return;
//     setFilledBlanks([...filledBlanks, word]);
//   };

//   const handleBlankClick = (index) => {
//     const updated = [...filledBlanks];
//     updated.splice(index, 1);
//     setFilledBlanks(updated);
//   };

//   const goToNext = () => {
//     const isCorrect = JSON.stringify(filledBlanks) === JSON.stringify(currentQuestion.correct);
    
//     const record = {
//       question: currentQuestion.sentence,
//       yourAnswer: filledBlanks,
//       correctAnswer: currentQuestion.correct,
//       isCorrect: isCorrect
//     };

//     setAnswerHistory([...answerHistory, record]);
//     setFilledBlanks([]);

//     if (currentIndex + 1 < questions.length) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       const score = [...answerHistory, record].filter(q => q.isCorrect).length;
//       navigate('/result', { state: { score, answerHistory: [...answerHistory, record] } });
//     }
//   };

//   const handleTimeout = () => {
//     goToNext();
//   };

//   if (!currentQuestion) return <div className="text-white">Loading...</div>;

//   const parts = currentQuestion.sentence.split('__');

//   return (
//     <div className="max-w-4xl mx-auto text-white p-4 space-y-6">
//       <Timer duration={30} onTimeout={handleTimeout} />

//       <div className="text-2xl font-semibold text-center">
//         {parts.map((part, i) => (
//           <span key={i}>
//             {part}
//             {i < currentQuestion.blanks && (
//               <span
//                 onClick={() => handleBlankClick(i)}
//                 className="inline-block min-w-[60px] mx-1 border-b-2 border-yellow-300 cursor-pointer px-2 text-yellow-400"
//               >
//                 {filledBlanks[i] || '___'}
//               </span>
//             )}
//           </span>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//         {currentQuestion.options.map((word, index) => (
//           <WordOption key={index} word={word} onSelect={handleWordClick} />
//         ))}
//       </div>

//       <div className="text-center">
//         <button
//           className={`mt-6 px-6 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:bg-gray-500`}
//           onClick={goToNext}
//           disabled={filledBlanks.length !== currentQuestion.blanks}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;





import React, { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import WordOption from '../components/WordOption';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filledBlanks, setFilledBlanks] = useState([]);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();

  const data = [
    {
      "id": 1,
      "sentence": "The dog __ in the __.",
      "blanks": 2,
      "options": ["barked", "yard", "ran", "tree"],
      "correct": ["barked", "yard"]
    },
    {
      "id": 2,
      "sentence": "He __ a book on the __.",
      "blanks": 2,
      "options": ["reads", "shelf", "eats", "writes"],
      "correct": ["reads", "shelf"]
    },
    {
      "id": 3,
      "sentence": "They __ to the __ to play.",
      "blanks": 2,
      "options": ["went", "park", "jumped", "bicycles"],
      "correct": ["went", "park"]
    },
    {
      "id": 4,
      "sentence": "The baby __ in the __.",
      "blanks": 2,
      "options": ["cries", "crib", "sleeps", "hurts"],
      "correct": ["cries", "crib"]
    },
    {
      "id": 5,
      "sentence": "She __ flowers in the __.",
      "blanks": 2,
      "options": ["planted", "garden", "cooked", "cake"],
      "correct": ["planted", "garden"]
    },
    {
      "id": 6,
      "sentence": "I like to __ movies on the __.",
      "blanks": 2,
      "options": ["watch", "screen", "read", "phone"],
      "correct": ["watch", "screen"]
    },
    {
      "id": 7,
      "sentence": "The teacher __ the __.",
      "blanks": 2,
      "options": ["explains", "homework", "draws", "paints"],
      "correct": ["explains", "homework"]
    },
    {
      "id": 8,
      "sentence": "The children __ in the __.",
      "blanks": 2,
      "options": ["play", "sandbox", "sleep", "eat"],
      "correct": ["play", "sandbox"]
    },
    {
      "id": 9,
      "sentence": "My sister __ cookies in the __.",
      "blanks": 2,
      "options": ["bakes", "oven", "eats", "makes"],
      "correct": ["bakes", "oven"]
    },
    {
      "id": 10,
      "sentence": "He __ a ride on the __.",
      "blanks": 2,
      "options": ["takes", "bicycle", "drives", "bus"],
      "correct": ["takes", "bicycle"]
    }
  ];

  useEffect(() => {
    setQuestions(data);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleWordClick = (word) => {
    if (filledBlanks.includes(word) || filledBlanks.length >= currentQuestion.blanks) return;
    setFilledBlanks([...filledBlanks, word]);
  };

  const handleBlankClick = (index) => {
    const updated = [...filledBlanks];
    updated.splice(index, 1);
    setFilledBlanks(updated);
  };

  const goToNext = () => {
    const isCorrect = JSON.stringify(filledBlanks) === JSON.stringify(currentQuestion.correct);
    
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    const record = {
      question: currentQuestion.sentence,
      yourAnswer: [...filledBlanks],
      correctAnswer: currentQuestion.correct,
      isCorrect: isCorrect
    };

    setAnswerHistory([...answerHistory, record]);
    setShowCorrect(true);
    
    setTimeout(() => {
      setFilledBlanks([]);
      setShowCorrect(false);
      
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        const score = [...answerHistory, record].filter(q => q.isCorrect).length;
        navigate('/result', { state: { score, answerHistory: [...answerHistory, record] } });
      }
    }, 1500);
  };

  const handleTimeout = () => {
    goToNext();
  };

  if (!currentQuestion) return <div className="text-white">Loading...</div>;

  const parts = currentQuestion.sentence.split('__');

  return (
    <div className="max-w-4xl mx-auto text-white p-4 space-y-6 min-h-screen flex flex-col">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium">
          Question {currentIndex + 1}/{questions.length}
        </div>
        <Timer duration={30} onTimeout={handleTimeout} />
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-semibold text-center mb-8"
          >
            {parts.map((part, i) => (
              <span key={i}>
                {part}
                {i < currentQuestion.blanks && (
                  <motion.span
                    onClick={() => handleBlankClick(i)}
                    className={`inline-block min-w-[60px] mx-1 border-b-2 cursor-pointer px-2 ${
                      showCorrect
                        ? filledBlanks[i] === currentQuestion.correct[i]
                          ? 'border-green-500 text-green-500'
                          : 'border-red-500 text-red-500'
                        : 'border-yellow-300 text-yellow-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {filledBlanks[i] || '___'}
                  </motion.span>
                )}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>

        {showCorrect && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            {JSON.stringify(filledBlanks) === JSON.stringify(currentQuestion.correct) ? (
              <p className="text-green-400 font-bold">Correct! 🎉</p>
            ) : (
              <p className="text-red-400 font-bold">
                Correct answer: {currentQuestion.correct.join(' ')}
              </p>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentQuestion.options.map((word, index) => (
            <WordOption 
              key={index} 
              word={word} 
              onSelect={handleWordClick}
              disabled={filledBlanks.includes(word) || filledBlanks.length >= currentQuestion.blanks}
              isCorrect={showCorrect && currentQuestion.correct.includes(word)}
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        <motion.button
          className={`mt-6 px-6 py-3 rounded-xl text-white cursor-pointer ${
            filledBlanks.length === currentQuestion.blanks 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : 'bg-gray-500'
          } transition`}
          onClick={goToNext}
          disabled={filledBlanks.length !== currentQuestion.blanks}
          whileHover={{ scale: filledBlanks.length === currentQuestion.blanks ? 1.05 : 1 }}
          whileTap={{ scale: filledBlanks.length === currentQuestion.blanks ? 0.95 : 1 }}
        >
          {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
        </motion.button>
      </div>
    </div>
  );
};

export default Home;