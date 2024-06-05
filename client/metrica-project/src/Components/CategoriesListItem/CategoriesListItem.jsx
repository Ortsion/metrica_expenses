import React, { useState } from 'react';
import './CategoriesListItem.css';

export default function CategoriesListItem(props) {

    const [itemId, setItemId] = useState(props.id);

    const handleItemClick = () => {
        console.log(itemId);
    }


    return (
        <div className='categoriesListItem'>
            <p className='categoryItem' onClick={handleItemClick}>
                {props.name}
            </p>
        </div>
    )
}
