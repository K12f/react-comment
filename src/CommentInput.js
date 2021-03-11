import React, {Component} from 'react'

class CommentInput extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            content: ''
        }
    }

    componentWillMount() {
        this._loadUsername()
    }

    componentDidMount() {
        this.textarea.focus()
    }

    handleUserNameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handleUsernameBlur(e) {
        this._saveUsername(e.target.value)
    }

    _loadUsername() {
        const username = localStorage.getItem('username')
        if (username) {
            console.log(username);
            this.setState({username: username})
        }
    }

    _saveUsername(username) {
        localStorage.setItem('username', username)
    }

    handleContentChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit(e) {
        if (this.props.onSubmit) {
            const {username, content} = this.state
            this.props.onSubmit({
                username: username,
                content: content,
                createdTime: +new Date()
            })
        }
        this.setState({content: ''})
    }

    render() {
        return (
            <div>
                <div className="comment-field">
                    <span className="comment-field-name">
                        用户名:
                    </span>
                    <div className="comment-field-input">
                        <input
                            value={this.state.username}
                            onChange={this.handleUserNameChange.bind(this)}
                            onBlur={this.handleUsernameBlur.bind(this)}
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">
                        评论内容:
                    </span>
                    <div className="comment-field-input">
                        <textarea value={this.state.content} onChange={this.handleContentChange.bind(this)}
                                  ref={(textarea) => {
                                      this.textarea = textarea
                                  }}/>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        );
    }
}

export default CommentInput
