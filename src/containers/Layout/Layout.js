import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import classes from './Layout.module.css';

class Layout extends Component {
    render () {
        return (

            <Aux>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <footer>
                        <hr style={{width: "90%"}}/>
                        <p><a href="https://github.com/georgeharvey3">George Harvey</a> 2020</p>
                </footer>
            </Aux>
        );
    }
}

export default Layout;