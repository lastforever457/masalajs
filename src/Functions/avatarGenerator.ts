import {IGenerateAva} from "./interface.ts";

const generateAvatar = (props: IGenerateAva): string => {
    if (!props.name) return '';
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    canvas.width = props.width;
    canvas.height = props.height;

    if (context) {
        // Draw background
        context.fillStyle = props.background;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw text (name)
        context.font = "bold 15px Montserrat";  // Adjust font size as needed
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(props.name[0].toLocaleUpperCase(), canvas.width / 2, canvas.height / 2);

        // Return the data URL of the canvas as a string
        return canvas.toDataURL("image/png");  // Return as base64 URL
    } else {
        throw new Error("Canvas context is null");
    }
};

export default generateAvatar;
