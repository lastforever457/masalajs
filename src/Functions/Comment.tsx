interface IComment {
    userName: string;
    comment: string;
}

function Comment(props: IComment) {
    return (
        <li className="d-flex align-items-center gap-3 list-group-item bg-transparent text-light">
            <h4 className="p-0 m-0">{props.userName}:</h4>
            <p className="p-0 m-0">{props.comment}</p>
        </li>
    );
}

export default Comment;