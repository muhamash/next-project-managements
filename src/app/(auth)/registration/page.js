import RegisterForm from '../../../../components/RegistrationForm';

export default function RegistrationPage() {
    return (
        <div className="w-[300px] h-screen flex flex-col gap-5 justify-center items-center mx-auto ">
            <h2>Please Register your account!!</h2>
            <div className="bg-slate-300 p-3 rounded-md">
                <RegisterForm />
            </div>
        </div>
    );
}
