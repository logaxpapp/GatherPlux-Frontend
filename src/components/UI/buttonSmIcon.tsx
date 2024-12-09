
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  label?: string;
  className?: string;
  disabled?: boolean;
  icon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonSmIcon = ({ label = "Button-Sm-Icon", className, onClick, disabled = false, icon = true }: Props) => {


  const baseClassName = `${disabled ? 'bg-cta-hover' : 'bg-cta'} w-full bg-cta hover:bg-cta-hover rounded-[12px] p-3 capitalize font-medium flex flex-row items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  const combinedClassName = `${baseClassName} ${className || ""}`;
  return (
    <>
      <button className={combinedClassName} disabled={disabled} onClick={onClick}>
        {label}
        {(icon === true) &&
          <Icon icon="ic:sharp-navigate-next" width="24" height="24" className="text-black" />
        }
      </button>
    </>
  );
};

export default ButtonSmIcon;
