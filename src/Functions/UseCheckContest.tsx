import axios from "axios";

const useCheckContest = () => {

    const checkContest = async () => {
        try {
            const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/contests`);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    };

    return {checkContest};
};

export default useCheckContest;