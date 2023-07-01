import {useState, useEffect} from 'react';

const useCities = (state: string) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state && state.length > 0) {
      fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "country": "United States",
          "state": state
        })
      })
          .then(response => response.json())
          .then(data => {
            setCities(data.data);
            setLoading(false);
          })
          .catch(error => {
            setError(error);
            setLoading(false);
          });
    } else {
      setCities([]);
    }
  }, [state]);


  return {cities, loading, error};
};

export default useCities;