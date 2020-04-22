import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdNfo = (props) => {
    const { details } = props;
    return (
        <div className="">
            <h1>
                {details.brand.name} {details.name}
            </h1>
            <p>{details.description}</p>
        </div>
    );
};

export default ProdNfo;
