import { useState } from "react";
import ActionButtons from "./ActionButtons";

interface SectionProps {
  sectionNumber: number;
  onDelete?: () => void;
  onCopy?: () => void;
  onAdd?: () => void;
}

const Section = ({ sectionNumber, onDelete, onCopy, onAdd }: SectionProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-row mt-5">
      <div className="w-[819px] h-[237px]">
        <div className="w-full max-w-2xl">
          <div className="bg-[#E8D5DD] rounded-lg p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#992C55]">
                Section {sectionNumber}
              </h3>
            </div>

            {/* Form Title Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Form Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Form Description Input */}
            <div>
              <input
                type="text"
                placeholder="Form description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-[-120px]">
        <ActionButtons onAdd={onAdd} onCopy={onCopy} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default Section;
