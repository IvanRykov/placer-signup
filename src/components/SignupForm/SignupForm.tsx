import React, {useState, useEffect} from 'react';
import './SignupForm.css';
import useStates from './hooks/useStates/useStates';
import useCities from './hooks/useCities/useCities';

interface State {
  [index: string]: string;

  firstName: string;
  lastName: string;
  state: string;
  city: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const initialState: State = {
    firstName: '',
    lastName: '',
    state: '',
    city: '',
    email: '',
    password: '',
  };
  const [formState, setFormState] = useState<State>(initialState);
  const [cityOptions, setCityOptions] = useState<string[]>([]);


  const {states, loading: statesLoading, error: statesError} = useStates();
  const {cities, loading: citiesLoading, error: citiesError} = useCities(formState.state);

  useEffect(() => {
    if (formState.state) {
      setCityOptions(cities);
    }
  }, [formState.state]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setFormState((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formState);

    const response = {
      accessToken: "something_here"
    }
    // setToken(response.accessToken); implement here, maybe pass from the caller, or save in cache
  };

  const citiesSelect = (
    <select className="form-select" name="city" value={formState.city} onChange={handleInputChange} required>
      <option value="">--Select City--</option>
      {cityOptions.map((city) => (
        <option key={city} value={city}>{city}</option>
      ))}
    </select>
  );

  const stateSelect = ( // add proper error handling when states request failed
    <select className="form-select" name="state" value={formState.state} onChange={handleInputChange} required>
      <option value="">--Select State--</option>
      {states.map((state) => (
        <option key={state} value={state}>{state}</option>
      ))}
    </select>
  );

  return (
    <>
      {!statesLoading && !statesError && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input className="form-input" name="firstName" value={formState.firstName} onChange={handleInputChange}
                   required placeholder="First Name"/>
            <input className="form-input" name="lastName" value={formState.lastName} onChange={handleInputChange}
                   required placeholder="Last Name"/>
            {stateSelect}
            {citiesSelect}
            <input className="form-input" type="email" name="email" value={formState.email}
                   onChange={handleInputChange} required placeholder="Email"/>
            <input className="form-input" type="password" name="password" value={formState.password}
                   onChange={handleInputChange} required placeholder="Password"/>
            <button className="submit-button" type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupForm;