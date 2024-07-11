interface IComment {
    userName: string;
    comment: string;
}

function Comment(props: IComment) {
    return (
        <li className="list-group-item">
            <h4>${props.userName}</h4>
            <p>{props.comment}</p>
        </li>
    );
}

export default Comment;