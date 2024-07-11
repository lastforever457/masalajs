import {useEffect, useState} from "react";
import axios from "axios";

interface IComment {
    "id": number,
    "taskId": number,
    "userId": number,
    "comment": string
}

function Comment({taskId: number}) {
    const [comments, setComments] = useState<IComment | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/comments?taskId=${taskId}`);
            setComments(res.data)
            console.log(comments)
        }

        fetchComments()
    }, []);

    return (
        <li className="list-group-item">
            <h4>${}</h4>
        </li>
    );
}

export default Comment;