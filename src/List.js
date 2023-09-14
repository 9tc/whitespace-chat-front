import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";

const List = (props) => {
    const {state} = props;
    const renderPost = (post) => {
        console.log(post);
        return (
            <React.Fragment>
                <div className="titlebar d-flex">
                    <div className={"d-inline-flex"}>
                        <div className="title_id mr-3">{post.id}.</div>
                        <div className="title_name">名前: {post.name}</div>
                    </div>
                    <div class={"ml-auto"}>
                        <div className="title_date">{post.datetime}</div>
                    </div>
                </div>
                <div className="ws">{post.ws}</div>
                <div className="output">{post.output}</div>
            </React.Fragment>
        );
    }

    const handleClickPreview = () => {
        const { posts } = state;
        let currentPage = state.currentPage;
        let offset = state.offset;
        if(currentPage > 1) {
            offset = offset - state.postsPerPage;
            currentPage = currentPage - 1;
        }
        props.onSubmitViews({
            ...state,
            views: posts.slice(offset, offset + state.postsPerPage),
            currentPage: currentPage,
            offset: offset
        });
    }

    const handleClickNext = () => {
        const { posts } = state;
        let currentPage = state.currentPage;
        let offset = state.offset;
        if(currentPage < state.total) {
            offset = offset + state.postsPerPage;
            currentPage = currentPage + 1;
        }
        props.onSubmitViews({
            ...state,
            views: posts.slice(offset, offset + state.postsPerPage),
            currentPage: currentPage,
            offset: offset
        });
    }

    return (
        <div className="main">
            <div className="pager d-inline-flex align-items-center mb-3">
                <button
                    className="btn btn-primary"
                    variant="contained"
                    onClick={handleClickPreview}
                    disabled={state.currentPage === 1}
                >
                    前へ
                </button>
                <div className="pager-count text-center mx-3">{state.currentPage}
                    <span className="pager-slash">/</span>
                    {state.total}
                </div>
                <button
                    className="btn btn-primary"
                    variant="contained"
                    onClick={handleClickNext}
                    disabled={state.currentPage === state.total || state.total === 0}
                >
                    次へ
                </button>
            </div>
            {
                state.views.map((post, index) => {
                    return (
                        <div className='comment container border p-2 text-left' key={post.id}>{renderPost(post)}</div>
                    );
                })
            }
        </div>
    )
}

export default List;