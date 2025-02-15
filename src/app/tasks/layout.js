
export default async function  ParallelLayout ( {
    children, inProgress, pending, complete, addTask, modal
}) {
    return (
        <div className="flex flex-col gap-10 w-full p-5">
            {/* <TopBar/> */}
            { children }
            <div className="mb-6 flex justify-around gap-[0.5px] flex-wrap">
                { inProgress }
                { pending }
                { complete }
                { modal }
            </div>
        </div>
    );
}
