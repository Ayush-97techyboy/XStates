import { useState, useEffect } from "react";
import axios from "axios";
// import { 
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   Button,
//   Typography
//  } from "@mui/material";
import styles from "../Countries/Countries.module.css";

export default function useFetch(url) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get(`https://crio-location-selector.onrender.com/countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.log("Error in fetching country", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((res) => {
          setStates(res.data);
          setCities([]);
          setSelectedState("");
          setSelectedCity("");
        })
        .catch((error) => {
          console.log("Error in fetching country", error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((res) => {
          setCities(res.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.log("Error in fetching country", error);
        });
    }
  }, [selectedState]);

  return (
    <div>
      <h1>Select Location</h1>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className={styles.dropdown}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className={styles.dropdown}
      >
        <option value="" disabled>
          Select States
        </option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className={styles.dropdown}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && selectedState && selectedCountry && (

        <p>You Selected: 

          {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      // <Typography variant="h6" gutterBottom>
      //   // <p className={styles.city-selector}></p>
      //     {" "}
      //     You Selected:        
      //     <span className={styles.highlight}>,</span> 
      //     <span>{selectedState},</span>, 
      //     <span className={styles.fade}>{selectedCountry},</span>
      //     {" "}
      //   </Typography> */}
       )}
    </div>
  );
}
