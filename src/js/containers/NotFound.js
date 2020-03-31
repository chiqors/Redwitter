import React from 'react';
import Navigation from '../components/Navigation';

const NotFound = () => {
    return (
        <div>
            <header class="o-header">
                <div class="container">
                    <Navigation />
                </div>
            </header>

            <section class="hero is-medium is-dark is-bold">
                <div class="hero-body">
                    <div class="container">
                        <p class="title">
                            404 Not Found
                        </p>
                        <p class="subtitle">
                            The page you have requested could not be found.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFound;
