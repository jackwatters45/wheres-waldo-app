import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';

const useHighScore = (initial) => {
  const [value, setValue] = useState(initial);
  const fetchScore = async (id, user) => {
    if (!user) return;

    const collectionRef = query(
      collection(db, `${id}-scores`),
      where('user', '==', user.uid),
    );
    const docsSnapshot = await getDocs(collectionRef);

    const scoresArr = [];
    docsSnapshot.forEach((doc) => {
      const date = new Date(doc.get('date').seconds * 1000);
      const time = doc.get('time');
      const name = doc.get('name');
      scoresArr.push({ date, time, name });
    });

    scoresArr.sort((a, b) => a.time - b.time);

    if (!scoresArr[0]) return;
    setValue(scoresArr[0].time);
  };

  return [value, fetchScore];
};

export default useHighScore;
