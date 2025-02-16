import { Suspense } from "react";

export const metadata = {
  title: "Tasks!!",
  description: "Generated by github.com/muhamash",
};

export default async function  ParallelLayout ( {
    children, inProgress, pending, complete, addTask, modal
}) {
    return (
        <Suspense fallback={<p>loading....</p>}>
            <div className="flex flex-col gap-10 w-full p-5">
                {/* <TopBar/> */ }
                { children }
                <div className="mb-6 flex justify-around gap-[0.5px] flex-wrap">
                    { inProgress }
                    { pending }
                    { complete }
                    { modal }
                </div>
            </div>
        </Suspense>
    );
}
