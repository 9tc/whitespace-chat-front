import React from 'react';
import axios from 'axios';

const INSERT_URI = 'http://localhost:3004/status';

const PATH = 'friend';
const Form = (props) => {
    const [post, setPost] = React.useState(props.post);

    const handleChangeName = (event) => {
        setPost({...post, name: event.target.value});
    };

    const handleChangeMessage = (event) => {
        setPost({...post, ws: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(post.name === '') {
            post.name = '名無しさん'
        }

        let body = {
            name: post.name,
            ws: post.ws,
        }

        props.setViewState('LOADING');

        //axios.post(INSERT_URI, body).then(res => {
        axios.get(INSERT_URI, body).then(res => {
            console.log(res);
            if (res.data.id === -1) throw new Error('Error');
            props.onSubmitPost({
                id: res.data.id,
                name: post.name,
                datetime: res.data.datetime,
                output: res.data.output,
                ws: post.ws,
                star: 0
            });

            props.setViewState('READY');
            console.log(props.state)

            setPost({
                ...post,
                name: '名無しさん',
                ws: '',
            });
        }).catch(error => {
            props.setViewState('ERROR');
        });
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className={"mb-3 text-left"}>
                <label htmlFor={"standard-basic"} className={"form-label"}>名前</label>
                <input
                    className={"form-control"}
                    type={"text"}
                    id="standard-basic"
                    label="名前"
                    variant="outlined"
                    value={post.name}
                    onChange={handleChangeName}
                    disabled={props.state.viewState === 'LOADING'}
                />
            </div>
            <div className={"mb-3 text-left"}>
                <label htmlFor={"standard-multiline-flexible"} className={"form-label"}>Whitespaceソースコード</label>
                <textarea
                    className={"form-control"}
                    id="standard-multiline-flexible"
                    label="本文"
                    variant="outlined"
                    fullWidth
                    multiline
                    rowsMax={1000}
                    value={post.ws}
                    onChange={handleChangeMessage}
                    disabled={props.state.viewState === 'LOADING'}
                />
            </div>
            <div className="button">
                <button
                    type="submit"
                    className="btn btn-primary"
                    variant="contained"
                    disabled={props.state.viewState === 'LOADING' || post.ws === ''}
                >
                    送信
                </button>
            </div>
        </form>

    );
}

// ①フォームのデータのデフォルト値
Form.defaultProps = {
    post: {
        name: '名無しさん',
        ws: '',
    }
}

export default Form;