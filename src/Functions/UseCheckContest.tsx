import axios from "axios";
import {useCallback} from "react";
import {IContest} from "./interface.ts";

const useCheckContest = () => {
    const checkContest = useCallback(async () => {
        try {
            const res = await axios.get<IContest[]>(`https://f7f2aac439c74f02.mokky.dev/contests`);

            const removeDuplicates = (array: number[]): number[] => {
                return [...new Set(array)];
            }

            res.data.forEach((contest) => {
                const checkEachContest = async () => {

                    const contestStartDateTime = new Date(`${contest.startDate}T${contest.startTime}`);
                    const contestFinishDateTime = new Date(`${contest.finishDate}T${contest.finishTime}`);
                    const usersArr: number[] = removeDuplicates(contest.users);
                    const setStatusContest = async (status: string) => {
                        await axios.patch(`https://f7f2aac439c74f02.mokky.dev/contests/${contest.id}`, {
                            ...contest,
                            users: usersArr,
                            status: status,
                        });
                    }

                    const currentDateTime = new Date();

                    if (contestStartDateTime <= currentDateTime && contestFinishDateTime >= currentDateTime) {
                        await setStatusContest("Boshlandi");
                    } else if (contestFinishDateTime < currentDateTime) {
                        await setStatusContest("Yakunlandi");
                    }
                }

                checkEachContest()
            });


        } catch (error) {
            console.log(error);
        }
    }, []);

    return {checkContest};
};

export default useCheckContest;
