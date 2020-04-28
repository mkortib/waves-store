import React from 'react';

const PageTop = (props) => {
    return (
        <div className="cm-container">
            <div className="page-top">{props.title}</div>
        </div>
    );
};

export default PageTop;
