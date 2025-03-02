import LoginForm from "../../../components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Generated by github.com/muhamash",
};

export default async function LoginPage() {
    return (
        <div className="w-[300px] h-screen flex flex-col gap-5 justify-center items-center mx-auto ">
            <h2>Please login!!</h2>
            <div className="bg-slate-300 p-3 rounded-md">
                <LoginForm />
            </div>
        </div>
    );
}