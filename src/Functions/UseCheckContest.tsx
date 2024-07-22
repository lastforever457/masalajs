import axios from "axios";
import { useCallback } from "react";
import { IContest } from "./interface.ts";

const useCheckContest = () => {
    const checkContest = useCallback(async () => {
        try {
            const res = await axios.get<IContest[]>(`https://f7f2aac439c74f02.mokky.dev/contests`);

            const removeDuplicates = (array: number[]): number[] => {
                return [...new Set(array)];
            }

            const updateContestStatus = async (contest: IContest) => {
                const contestStartDateTime = new Date(`${contest.startDate}T${contest.startTime}`);
                const contestFinishDateTime = new Date(`${contest.finishDate}T${contest.finishTime}`);
                const usersArr: number[] = removeDuplicates(contest.users);
                const currentDateTime = new Date();

                let status: string;

                if (contestStartDateTime <= currentDateTime && contestFinishDateTime >= currentDateTime) {
                    status = "Boshlandi";
                } else if (contestFinishDateTime < currentDateTime) {
                    status = "Tugadi";
                } else {
                    status = "Registering";
                }

                if (status !== contest.status) {
                    await axios.patch(`https://f7f2aac439c74f02.mokky.dev/contests/${contest.id}`, {
                        ...contest,
                        users: usersArr,
                        status: status,
                    });
                }
            }

            // Barcha turnirlarni tekshirish
            await Promise.all(res.data.map(updateContestStatus));

        } catch (error) {
            console.error('Xatolik yuz berdi:', error);
        }
    }, []);

    return { checkContest };
};

export default useCheckContest;
