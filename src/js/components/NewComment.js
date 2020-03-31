import React from 'react';
import url from 'url';
import { Link } from 'react-router';

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    handleChange(event) {
        this.setState({comment: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.newComment(this.state.comment);
        this.setState({comment: ''});
    }

    render() {
        return (
            <article class="media">
                <div class="media-content">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div class="field">
                            <p class="control">
                                <textarea class="textarea" placeholder="Add a comment..." onChange={(e) => this.handleChange(e)} value={this.state.comment}></textarea>
                            </p>
                        </div>
                        <nav class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <button type="submit" class="button is-info">Submit</button>
                                </div>
                            </div>
                        </nav>
                    </form>
                </div>
            </article>
        );
    }
}

export default NewComment;

