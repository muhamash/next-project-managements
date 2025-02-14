export default async function  ParallelLayout ( {
    children, inProgress, pending, complete
}) {
    return (
        <div className="flex flex-col gap-10 w-full p-5">
            { children }
            <div className="-mx-2 mb-6 flex flex-wrap justify-between">
            { inProgress }
            { pending }
            { complete }
        </div>
        </div>
    );
}
