function Comment(props) {
    return (
        <li className="list-group-item">
            <h4>${props.userName}</h4>
            <p>{props.comment}</p>
        </li>
    );
}

export default Comment;