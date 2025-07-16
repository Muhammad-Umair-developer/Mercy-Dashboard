import images from "../constants/images";

interface ActionButtonsProps {
  onAdd?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}

const ActionButtons = ({ onAdd, onCopy, onDelete }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col bg-white rounded-2xl justify-center items-center w-[60px] h-[120px] border-[#989898] border-1">
        <div>
          <img
            className="w-[31px] h-[31px] mb-3 cursor-pointer hover:opacity-80 transition-opacity"
            src={images.plus}
            alt="Add"
            onClick={onAdd}
          />
        </div>
        <div>
          <img
            className="cursor-pointer hover:opacity-80 transition-opacity"
            src={images.tabler}
            alt="Copy"
            onClick={onCopy}
          />
        </div>
      </div>
      <div>
        <img
          className="w-[60px] h-[65px] cursor-pointer hover:opacity-80 transition-opacity"
          src={images.delete}
          alt="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default ActionButtons;
