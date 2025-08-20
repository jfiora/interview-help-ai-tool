interface JobButtonProps {
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function JobButton({
    title,
    isSelected,
    onClick,
}: JobButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
        ${
            isSelected
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
        }
      `}
        >
            {title}
        </button>
    );
}
