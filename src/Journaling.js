import { useState } from 'react';
import { saveJournal } from './api'; // API call to save journal entry

function Journaling() {
  const [entry, setEntry] = useState('');

  const handleJournalSubmit = () => {
    saveJournal(entry); // Save journal entry in backend
  };

  return (
    <div>
      <h1>Daily Journal</h1>
      <textarea 
        value={entry} 
        onChange={(e) => setEntry(e.target.value)} 
        placeholder="Write about your day..." 
      />
      <button onClick={handleJournalSubmit}>Save Journal</button>
    </div>
  );
}

export default Journaling;
