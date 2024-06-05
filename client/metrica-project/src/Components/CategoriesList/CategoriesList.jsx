import React, { useState, useEffect } from 'react';
import './CategoriesList.css';
import { PropTypes } from 'prop-types';
import { getCategoriesList } from '../../toolsFunctions/getCategoriesList';
import CategoriesListItem from '../CategoriesListItem/CategoriesListItem';


export default function CategoriesList(props) {

    const [categoriesList, setCategoriesList] = useState(null);

    useEffect(() => {
        // Fetch data when component mounts
        getCategoriesList(props.father)
            .then((response) => {
                setCategoriesList(response.data); // Update state with fetched data
            })
            .catch((error) => {
                console.error(error); // Handle errors
            });
    }, []);

    return (
        <div className='categoriesList'>
            {categoriesList ? (
                <ul>
                    {categoriesList.map((category) => (
                        <CategoriesListItem
                            name={category.name}
                            category={category.data}
                            key={category.id}
                            id={category.id}
                        />
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

CategoriesList.propTypes = {
    father: PropTypes.number,
}