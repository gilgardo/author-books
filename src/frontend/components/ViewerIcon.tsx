const ViewerIcon = ({
  Icon,
  handleClick,
  isLoaded,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  handleClick: () => void;
  isLoaded: boolean;
}) => {
  return (
    <button onClick={handleClick} disabled={!isLoaded}>
      <Icon
        className={`${
          isLoaded
            ? "sm:text-light text-green/80 cursor-pointer"
            : "text-transparent"
        } size-7`}
      />
    </button>
  );
};

export default ViewerIcon;
