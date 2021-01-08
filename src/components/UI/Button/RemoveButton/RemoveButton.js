import React from 'react';

import classes from './RemoveButton.module.css';

const removeButton = props => (
    <button 
        className={classes.RemoveButton}
        onClick={props.clicked}>{props.children}
    </button>
);

export default removeButton;