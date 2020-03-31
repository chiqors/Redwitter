import React from 'react';
import url from 'url';
import { Link } from 'react-router';

class NewTweet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            link: ''
        };
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleLinkChange(event) {
        this.setState({link: event.target.value});
    }

    handleSubmit(event) {
        this.props.newTweet(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Title</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" placeholder="Title" value={this.state.title} onChange={(e) => this.handleTitleChange(e)} />
                            </p>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Tweet Link</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="url" placeholder="https://twitter.com" value={this.state.link} onChange={(e) => this.handleLinkChange(e)} />
                            </p>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <button type="submit" class="button is-primary">
                                  Submit Tweet
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default NewTweet;

