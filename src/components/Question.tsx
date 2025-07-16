import { useState } from 'react'
import QuestionTypeSelector from './QuestionTypeSelector'
import ActionButtons from './ActionButtons'
import images from '../constants/images'

interface QuestionProps {
  questionNumber: number
  type: 'singleChoice' | 'paragraph' | 'multipleChoice' | 'checkbox'
  text: string
  options: string[]
  onDelete?: () => void
  onCopy?: () => void
  onAdd?: () => void
  onTypeChange?: (type: 'singleChoice' | 'paragraph' | 'multipleChoice' | 'checkbox') => void
  onTextChange?: (text: string) => void
  onAddOption?: () => void
  onDeleteOption?: (optionIndex: number) => void
  onUpdateOption?: (optionIndex: number, value: string) => void
}

const Question = ({ 
  questionNumber, 
  type, 
  text, 
  options, 
  onDelete, 
  onCopy, 
  onAdd, 
  onTypeChange,
  onTextChange,
  onAddOption
}: QuestionProps) => {
  const [questionType, setQuestionType] = useState<string>(type)
  const [questionText, setQuestionText] = useState<string>(text)

  const handleTypeChange = (newType: string) => {
    setQuestionType(newType)
    onTypeChange?.(newType as 'singleChoice' | 'paragraph' | 'multipleChoice' | 'checkbox')
  }

  const handleTextChange = (newText: string) => {
    setQuestionText(newText)
    onTextChange?.(newText)
  }

  const addOption = () => {
    onAddOption?.()
  }

  const renderQuestionContent = () => {
    switch (questionType) {
      case 'paragraph':
        return (
          <div className="mb-4">
            <textarea
              placeholder="Answer text"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
        )
      
      default: // singleChoice
        return (
          <div>
            {options.map((option, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  defaultValue={option}
                  placeholder={`Type ${option}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="flex flex-row gap-7 mt-5">
      <div className="w-[673px] border-[#992C55] p-5 border-2 rounded-2xl">
        <div className="flex flex-row justify-between">
          <div className="flex justify-center items-center">
            <h3 className="text-2xl font-bold text-[#992C55]">
              Question no {questionNumber}
            </h3>
          </div>
          <QuestionTypeSelector 
            onTypeSelect={handleTypeChange}
            selectedType={questionType}
          />
        </div>

        <div className="mb-4 mt-4">
          <input
            type="text"
            placeholder="Type question here"
            value={questionText}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A84672] focus:border-[#A84672] outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        {renderQuestionContent()}

        <div className="flex justify-center items-center">
          <img
            className="cursor-pointer mt-5"
            src={images.add}
            alt="Add option"
            onClick={addOption}
          />
        </div>
      </div>
      
      <ActionButtons 
        onAdd={onAdd}
        onCopy={onCopy}
        onDelete={onDelete}
      />
    </div>
  )
}

export default Question
