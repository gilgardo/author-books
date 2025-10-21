const CustomButton = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-primary text-secondary disabled:bg-green/40 font-bold shadow-md rounded-2xl overflow-hidden transition-transform ${
        !disabled ? "hover:scale-105 hover:shadow-xl cursor-pointer" : ""
      } duration-200 flex flex-col justify-between p-2`}>
      {children}
    </button>
  );
};

export default CustomButton;
