import images from "../constants/images";

interface QuestionTypeSelectorProps {
  onTypeSelect: (type: string) => void;
  selectedType?: string;
}

const QuestionTypeSelector = ({
  onTypeSelect,
  selectedType,
}: QuestionTypeSelectorProps) => {
  const questionTypes = [
    { id: "normal", icon: images.checkbox, label: "Normal Selector" },
    { id: "paragraph", icon: images.paragraph, label: "Paragraph" },
    { id: "radio", icon: images.radiobutton, label: "Multiple Choice" },
    { id: "checkbox", icon: images.checkboxoutline, label: "Checkbox" },
  ];

  return (
    <div className="flex flex-row gap-1.5 border-[#989898] border-1 rounded-2xl p-2">
      {questionTypes.map((type) => (
        <div
          key={type.id}
          className={`flex flex-col items-center justify-center cursor-pointer p-1 rounded-lg transition-colors ${
            selectedType === type.id ? "bg-[#E8D5DD]" : "hover:bg-gray-50"
          }`}
          onClick={() => onTypeSelect(type.id)}
        >
          <div>
            <img className="cursor-pointer" src={type.icon} alt={type.label} />
          </div>
          <div>
            <p className="text-[10px]">{type.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionTypeSelector;
