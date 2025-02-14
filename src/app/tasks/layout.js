export default async function  ParallelLayout ( {
    children, inProgress, pending, complete
}) {
    return (
        <div className="flex h-screen">
            { children }
            { inProgress }
            { pending }
            { complete }
        </div>
    );
}
