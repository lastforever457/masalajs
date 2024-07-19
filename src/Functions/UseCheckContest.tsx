import axios from "axios";
import {useCallback} from "react";
import {IContest} from "./interface.ts";

const useCheckContest = () => {
    const checkContest = useCallback(async () => {
        try {
            const res = await axios.get<IContest[]>(`https://f7f2aac439c74f02.mokky.dev/contests`);
            const currentDate = new Date();

            res.data.forEach((contest) => {
                const contestStartDate = new Date(contest.startDate);
                const setStatusContest = async (status: string) => {
                    await axios.patch(`https://f7f2aac439c74f02.mokky.dev/contests/${contest.id}`, {
                        ...contest,
                        status: status,
                    });
                }
                if (contestStartDate < currentDate) {
                    setStatusContest("Boshlandi");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return {checkContest};
};

export default useCheckContest;
