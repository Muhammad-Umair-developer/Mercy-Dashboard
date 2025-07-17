import { useState } from "react";
import Question from "../../components/Question";
import Section from "../../components/Section";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"General" | "Questionnaire">(
    "General"
  );

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "singleChoice" as const,
      text: "",
      options: ["Option 1", "Option 2"],
    },
  ]);

  const [sections, setSections] = useState([1]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "singleChoice" as const,
      text: "",
      options: ["Option 1", "Option 2"],
    };
    setQuestions([...questions, newQuestion]);
  };

  const copyQuestion = (questionId: number) => {
    const questionToCopy = questions.find((q) => q.id === questionId);
    if (questionToCopy) {
      const newQuestion = {
        ...questionToCopy,
        id: questions.length + 1,
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  const deleteQuestion = (questionId: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const addSection = () => {
    setSections([...sections, sections.length + 1]);
  };

  const copySection = () => {
    setSections([...sections, sections.length + 1]);
  };

  const deleteSection = (sectionIndex: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, index) => index !== sectionIndex));
    }
  };

  const updateQuestion = (questionId: number, updates: any) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q))
    );
  };

  const addOption = (questionId: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const newOptions = [
        ...question.options,
        `Option ${question.options.length + 1}`,
      ];
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const deleteOption = (questionId: number, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options.length > 2) {
      const newOptions = question.options.filter(
        (_, index) => index !== optionIndex
      );
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    newValue: string
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = newValue;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div></div>

            {/* Toggle Button - Top Right */}
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-sm  mr-5">
              <button
                onClick={() => setActiveTab("General")}
                className={`px-6 py-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 min-w-[120px] ${
                  activeTab === "General"
                    ? "bg-[#A84672] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab("Questionnaire")}
                className={`px-6 py-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 min-w-[120px] ${
                  activeTab === "Questionnaire"
                    ? "bg-[#A84672] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Questionnaire
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className=" min-h-[600px]">
          {activeTab === "General" && (
            <div className="p-6">
              {/* <h2 className="text-xl font-semibold text-gray-900 mb-6">
                General Settings
              </h2> */}

              {/* API Keys Section */}
              <div className="space-y-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Paystack API Key
                    </label>
                    <input
                      type="text"
                      placeholder="Enter api key"
                      className="px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white"
                      style={{ width: "508px", height: "60px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Google login key
                    </label>
                    <input
                      type="text"
                      placeholder="Enter api key"
                      className="px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white"
                      style={{ width: "508px", height: "60px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Facebook login key
                    </label>
                    <input
                      type="text"
                      placeholder="Enter api key"
                      className="px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white"
                      style={{ width: "508px", height: "60px" }}
                    />
                  </div>
                </div>

                {/* Social Media Links Section */}
                <div className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Whatsapp Link
                    </label>
                    <input
                      type="url"
                      placeholder="Enter link"
                      className="px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white"
                      style={{ width: "508px", height: "60px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Facebook link
                    </label>
                    <input
                      type="url"
                      placeholder="Enter link"
                      className="px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white"
                      style={{ width: "508px", height: "60px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Instagram link
                    </label>
                    <input
                      type="url"
                      placeholder="Enter link"
                      className="px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white"
                      style={{ width: "508px", height: "60px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      X link
                    </label>
                    <input
                      type="url"
                      placeholder="Enter link"
                      className="px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white"
                      style={{ width: "508px", height: "60px" }}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-8">
                  <button
                    className="bg-[#A84672] text-white py-3 px-6 rounded-lg hover:bg-[#8e3a5f] transition-colors font-medium cursor-pointer"
                    style={{ width: "120px", height: "50px" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Questionnaire" && (
            <div className="flex items-center justify-center">
              <div className="flex flex-col">
                {/* Sections */}
                {sections.map((sectionNumber, index) => (
                  <Section
                    key={sectionNumber}
                    sectionNumber={sectionNumber}
                    onAdd={addSection}
                    onCopy={copySection}
                    onDelete={() => deleteSection(index)}
                  />
                ))}

                {/* Questions */}
                {questions.map((question) => (
                  <Question
                    key={question.id}
                    questionNumber={question.id}
                    type={question.type}
                    text={question.text}
                    options={question.options}
                    onAdd={addQuestion}
                    onCopy={() => copyQuestion(question.id)}
                    onDelete={() => deleteQuestion(question.id)}
                    onTypeChange={(
                      type:
                        | "singleChoice"
                        | "paragraph"
                        | "multipleChoice"
                        | "checkbox"
                    ) => updateQuestion(question.id, { type })}
                    onTextChange={(text: string) =>
                      updateQuestion(question.id, { text })
                    }
                    onAddOption={() => addOption(question.id)}
                    onDeleteOption={(optionIndex: number) =>
                      deleteOption(question.id, optionIndex)
                    }
                    onUpdateOption={(optionIndex: number, value: string) =>
                      updateOption(question.id, optionIndex, value)
                    }
                  />
                ))}

                <div>
                  <button className="bg-[#992C55] text-white rounded-2xl p-3 pl-8 pr-8 mt-5 border-none mb-5 cursor-pointer">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
