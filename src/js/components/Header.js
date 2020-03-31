import React from 'react';
import Navigation from './Navigation';

const Header = ({title, updateView}) => {
    return (
        <div>
            <header class="o-header">
                <div class="container">
                    <Navigation updateView={updateView} />
                </div>

                <div class="hero is-primary is-bold">
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns is-vcentered">
                                <div class="column">
                                    <div class="title">
                                        {title}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
