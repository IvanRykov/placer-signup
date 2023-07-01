import {useState, useEffect} from 'react';

const useStates = () => {
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/states', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"country": "United States"})
    })
        .then(response => response.json())
        .then(data => {
          const stateNames = data.data.states.map((state: any) => state.name);
          setStates(stateNames);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
  }, []);

  return {states, loading, error};
};

export default useStates;