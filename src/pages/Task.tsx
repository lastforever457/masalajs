import Editor, {Monaco} from "@monaco-editor/react";
import confetti from "canvas-confetti";
import {useEffect, useRef, useState} from "react";
import {IoCheckmarkDoneCircle} from "react-icons/io5";
import axios from "axios";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Comment from "../Functions/Comment.tsx";

interface ITask {
    id: number;
    departmentId: number;
    text: string;
    examples: string[];
    fun_name: string;
    solved: boolean;
    check: string[];
    answers: number[];
}

interface IComment {
    userName: string;
    comment: string;
}

const Task: React.FC = () => {
    const [task, setTask] = useState<ITask | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);
    const [code, setCode] = useState<string>("");
    const [results, setResults] = useState<string[]>([]);

    const taskId = parseInt(localStorage.getItem("taskId") || "", 10);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/tasks?id=${taskId}`);
                setTask(res.data[0]);
            } catch (error) {
                console.error("Error fetching the task:", error);
            }
        };

        fetchTask();
    }, [taskId]);

    useEffect(() => {
        if (task) {
            const newDefaultCode = `function ${task.fun_name} {
        // Write your code here
      }`;
            setCode(newDefaultCode);
            setResults([]);
        }
    }, [task]);

    const showValue = (value: string | undefined) => {
        setCode(value || "");
    };

    const getValue = async () => {
        if (!task) return;

        const codeText = editorRef.current.getValue();
        const functionName = task.fun_name.slice(0, task.fun_name.indexOf("("));
        const wrappedCode = `(function() { ${codeText} return ${functionName}; })()`;

        const userFunction = eval(wrappedCode);
        const resultsArray = task.check.map((testCase, index) => {
            const args = testCase.split(",").map(Number);
            const result = userFunction(...args);
            const expected = task.answers[index];
            return `${functionName}(${args.join(", ")}) => ${result} - ${result === expected ? "Passed ✅" : "Failed ❌"}`;
        });

        const allPassed = resultsArray.every((result) => result.includes("Passed"));
        if (allPassed) {
            const count = 200;
            const defaults = {origin: {y: 0.7}};

            function fire(particleRatio: number, opts: any) {
                confetti(Object.assign({}, defaults, opts, {particleCount: Math.floor(count * particleRatio)}));
            }

            fire(0.25, {spread: 26, startVelocity: 55});
            fire(0.2, {spread: 60});
            fire(0.35, {spread: 100, decay: 0.91, scalar: 0.8});
            fire(0.1, {spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2});
            fire(0.1, {spread: 120, startVelocity: 45});
        }

        setResults(resultsArray);
        return editorRef.current.getValue();
    };

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;

        monaco.editor.defineTheme("shadesOfPurple", {
            base: "vs-dark",
            inherit: true,
            rules: [
                {token: "comment", foreground: "b362ff", fontStyle: "italic"},
                {token: "keyword", foreground: "ff9d00"},
                {token: "identifier", foreground: "9effff"},
                {token: "string", foreground: "a5ff90"},
                {token: "number", foreground: "ff628c"},
                {token: "delimiter", foreground: "c792ea"},
                {token: "type", foreground: "ffcc99"},
            ],
            colors: {
                "editor.background": "#1F1F2B",
                "editor.foreground": "#f8f8f2",
                "editorCursor.foreground": "#f8f8f0",
                "editor.lineHighlightBackground": "#3d3d57",
                "editorLineNumber.foreground": "#6d6d6d",
                "editor.selectionBackground": "#9b9b9b30",
                "editorIndentGuide.background": "#2d2b55",
                "editorIndentGuide.activeBackground": "#9b9b9b",
            },
        });

        monaco.editor.setTheme("shadesOfPurple");
    };

    const handleEditorValidation = (markers: any[]) => {
        markers.forEach((marker) => console.log("onValidate:", marker.message));
    };

    const capitalizedFunctionName = task?.fun_name.replace(/\(.*\)$/, "").replace(/^\w/, (c) => c.toUpperCase()) || "";

    const breadcrumbs = [
        <Link className="fs-4 text-secondary text-decoration-none" key="1" to="/">
            Home
        </Link>,
        <Link className="fs-4 text-secondary text-decoration-none" key="2" to="/tasks">
            Tasks
        </Link>,
        <Typography className="fs-5 text-light" key="3">
            {capitalizedFunctionName}
        </Typography>,
    ];

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/comments?taskId=${taskId}`);
                setComments(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComments();
    }, [taskId]);

    const handleAddComment = async (event: Event) => {
        event.preventDefault();
        const input: HTMLInputElement | null = document.querySelector("#add-comment").value;
        try {
            let user = localStorage.getItem("token")
            user = JSON.parse(user)
            if (input && user) {
                const res = await axios.post("https://f7f2aac439c74f02.mokky.dev/comments", {
                    taskId: taskId,
                    userName: user.name,
                    comment: input,
                });
                console.log(res)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="container py-3">
            <p id="main-title" className="p-0 m-0">
                masala.js
            </p>
            <hr className="text-secondary"/>
            <div className="breadcrumb2">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb" className="my-3">
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <div className="row rounded-4 px-3 py-4" style={{backgroundColor: "#303041"}}>
                <div className="col-6">
                    <div>
                        <h2 className="p-0 m-0 text-white">{task?.fun_name || ""}</h2>
                        <p className="text-white my-3 fs-5">{task?.text || ""}</p>
                        <ul className="fs-5 ps-4 my-3">
                            {task?.examples.map((item, index) => (
                                <li key={index} className="text-white">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-white my-3 fs-4">
                            Natijalar {task && <IoCheckmarkDoneCircle/>}
                        </p>
                        <div
                            className="results-field rounded-3"
                            style={{
                                backgroundColor: "#1F1F2B",
                                width: "100%",
                                minHeight: "120px",
                                whiteSpace: "pre-wrap",
                                color: "white",
                                padding: "10px",
                            }}
                        >
                            {results.map((result, index) => (
                                <div className="fs-4" key={index}>
                                    {result}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <div className="codeground rounded-3">
                            <Editor
                                language="javascript"
                                value={code}
                                onChange={showValue}
                                theme="shadesOfPurple"
                                options={{
                                    minimap: {enabled: false},
                                    fontSize: 18,
                                    scrollBeyondLastLine: false,
                                }}
                                onMount={handleEditorDidMount}
                                onValidate={handleEditorValidation}
                            />
                        </div>
                        <div className="button-wrapper d-flex justify-content-end align-items-center">
                            <button className="btn btn-outline-light my-3" onClick={getValue}>
                                Topshirish
                            </button>
                        </div>
                    </div>
                </div>
                <div className="accordion accordion-flush mt-4 rounded-3" id="accordionFlushExample">
                    <div className="accordion-item rounded-3" style={{backgroundColor: "#1F1F2B"}}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed text-light fs-5"
                                type="button"
                                style={{backgroundColor: "#1F1F2B"}}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                            >
                                Comments
                            </button>
                        </h2>
                        <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                <ul id="comment-accordion" className="list-group list-group-flush">
                                    <li className="list-group-item add-comment-wrapper">
                                        <div
                                            className="input-group add-comment-wrapper d-flex justify-content-between align-items-center">
                                            <input id="add-comment" type="text" className="form-control"/>
                                            <button onClick={handleAddComment}
                                                    className="btn btn-outline-light">Yozish
                                            </button>
                                        </div>
                                    </li>
                                    {comments.map((cmt, index) => (
                                        <Comment key={index} userName={cmt.userName} comment={cmt.comment}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Task;
