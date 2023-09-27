import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CategoryContext } from '../../contexts/categoryContext';
import { PropTypes } from 'prop-types';
import './DropDownList.css';


export default function DropDownList(props) {

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const {selectedCategory, setSelectedCategory,selectedCategory2, setSelectedCategory2, selectedCategory3, setSelectedCategory3} = useContext(CategoryContext);

  useEffect(() => {
    const apiEndpoint = props.apiEndpoint;

    // Fetch options from the database
    axios.get(apiEndpoint, {
      params: {
        father: props.father,
      },
      headers: {
        Authorization: localStorage.getItem('token') 
      }
    })
      .then((response) => {
        setOptions(response.data);
    console.log('response.data: ' ,response.data);
      })
      .catch((error) => {
        console.error('Error fetching options:', error);
      });

  }, [selectedCategory,selectedCategory2]); // The empty dependency array ensures this effect runs once on component mount


  const handleSelectChange = (event) => {
    console.log("Event.target.value from DrpoDownList: ",event.target.value)

    if (props.categoryHirarchy == 'primary') {
      setSelectedCategory(event.target.value);
    } else if (props.categoryHirarchy == 'secondary') {
      setSelectedCategory2(event.target.value);
    } else if (props.categoryHirarchy == 'end') {
      setSelectedCategory3(event.target.value)
    }
  };

  return (
    <div >
      <select value={selectedOption.name} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      &nbsp;
      &nbsp;
      <label>{`בחר קטגוריה ${props.categoryType}`}</label>

      {/* {selectedCategory && <p>You selected: {selectedCategory}</p>} */}
    </div>
  );
}

DropDownList.propTypes = {
  categoryType: PropTypes.string,
  apiEndpoint :PropTypes.string,
  father: PropTypes.string,
  categoryHirarchy:  PropTypes.string,  
}