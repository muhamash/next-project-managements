import HeaderButton from "./HeaderButton";

export default async function Header() {
    return (
        <div className="mt-[70px] mb-6 flex items-center justify-between w-full">
            <h2 className="text-2xl font-bold">Welcome to Task board!</h2>
            <div className="flex space-x-2">
                {/* client interaction button */ }
                <HeaderButton/>
            </div>
        </div>
    );
}