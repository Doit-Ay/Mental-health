import { useState } from 'react';

function MoodTracker() {
  const [mood, setMood] = useState('');
  const [history, setHistory] = useState([]); // Use history and setHistory

  const handleSaveMood = () => {
    setHistory([...history, mood]); // Save the current mood to history
    console.log('Mood saved:', mood);
  };

  return (
    <div>
      <input value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Enter your mood" />
      <button onClick={handleSaveMood}>Save Mood</button>
      <ul>
        {history.map((moodEntry, index) => (
          <li key={index}>{moodEntry}</li>
        ))}
      </ul>
    </div>
  );
}

export default MoodTracker;
