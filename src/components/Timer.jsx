// import React, { useEffect, useState } from 'react';

// const Timer = ({ duration, onTimeout }) => {
//   const [seconds, setSeconds] = useState(duration);
//   const [hasTimedOut, setHasTimedOut] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setSeconds(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           if (!hasTimedOut) {
//             setHasTimedOut(true);
//             onTimeout();
//           }
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [duration, onTimeout, hasTimedOut]);

//   return (
//     <div className="text-center text-xl font-bold text-yellow-300">
//       Time Left: {seconds}s
//     </div>
//   );
// };

// export default Timer;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Timer = ({ duration, onTimeout }) => {
  const [seconds, setSeconds] = useState(duration);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    setSeconds(duration);
    setHasTimedOut(false);
  }, [duration]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasTimedOut) {
            setHasTimedOut(true);
            onTimeout();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeout, hasTimedOut]);

  // Calculate percentage for the progress bar
  const progressPercentage = (seconds / duration) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold text-yellow-300 mb-1">
        {seconds}s
      </div>
      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ width: '100%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default Timer;