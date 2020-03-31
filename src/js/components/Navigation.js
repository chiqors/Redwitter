import React from 'react';
import { Link } from 'react-router';

const Navigation = ({updateView}) => {

    const navLinks = [
        {
            name: 'Top',
            url: '/top'
        },
        {
            name: 'New',
            url: '/new'
        }
    ];

    const loginLinks = () => {
        if (window.App.loggedIn) {
            return (
                <div class="field is-grouped">
                    <p class="control">
                        <Link class="navbar-item" to={`/u/${App.user.username}`}>
                            {App.user.username}
                        </Link>
                    </p>

                    <p class="control">
                        <a class="button is-info" href="/logout">
                            Logout
                        </a>
                    </p>
                </div>
            );
        }


        return (
            <div class="field is-grouped">
                <p class="control">
                    <a class="button is-info" href="/login">
                        Login
                    </a>
                </p>
                <p class="control">
                    <a class="button is-primary" href="/register">
                        Register
                    </a>
                </p>
            </div>
        );
    };

    const submitLink = () => {
        if (window.App.loggedIn) {
            return (
                <Link class="navbar-item" to="/submit">
                    Submit
                </Link>
            );
        }
    };

    return (
        <nav class="navbar">
            <div class="navbar-brand">
                <Link class="navbar-item" to="/" onClick={updateView}>Tweddit</Link>

                <div class="navbar-burger burger" data-target="nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="nav" class="navbar-menu">
                <div class="navbar-start">
                    {navLinks.map(navLink => {
                        return (
                            <Link key={navLink.url} class="navbar-item" to={navLink.url} onClick={updateView}>
                                {navLink.name}
                            </Link>
                        );
                    })}
                    {submitLink()}
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        {loginLinks()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
