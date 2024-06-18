import Google from "@/assets/google.svg?react";
import Github from "@/assets/github.svg?react";

type AuthButtonProps = {
    text?: string;
    authWith: string;
    onClick?: () => void;
};

function AuthButton({ text, authWith, onClick }: AuthButtonProps) {
    const styles = {
        google: "bg-[#fafafa] px-6 py-3 rounded-full border border-[#EEEEEE] font-medium text-xs text-[#616161] flex items-center gap-2",
        github: "bg-[#fafafa] px-6 py-3 rounded-full border border-[#eeeeee] font-medium text-xs text-[#616161] flex items-center gap-2",
        email: "bg-[#7B76F1] rounded-full border-none px-8 py-4 font-bold text-xs text-white shadow-2xl shadow-[#7e7be9] hover:shadow-[#54528e] transition-all duration-300 ease-in-out",
    };

    const renderAuthIcon = () => {
        if (authWith === "google") {
            return <Google />;
        } else if (authWith === "github") {
            return <Github />;
        }

        return null; // or a default component/icon
    };

    return (
        <button
            className={styles[authWith as keyof typeof styles]}
            onClick={onClick}
        >
            {renderAuthIcon()}
            {text}
        </button>
    );
}

export default AuthButton;
