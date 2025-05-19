import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fandom, getFandomById } from '../utils/fandoms';
import { useWallet } from '../contexts/WalletContext';
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';

const QuizPage: React.FC = () => {
  const { fandom: fandomId } = useParams<{ fandom: string }>();
  const navigate = useNavigate();
  const { mintNFT } = useWallet();
  
  const [fandom, setFandom] = useState<Fandom | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  
  useEffect(() => {
    if (fandomId) {
      const fandomData = getFandomById(fandomId);
      if (fandomData) {
        setFandom(fandomData);
      } else {
        navigate('/fandom');
      }
    }
  }, [fandomId, navigate]);
  
  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };
  
  const handleSubmitAnswer = async () => {
    if (selectedOption === null || !fandom) return;
    
    setIsAnswered(true);
    const correct = selectedOption === fandom.quizQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      try {
        setIsMinting(true);
        // Mint the rare moment NFT for correct answer
        const nftId = await mintNFT(
          fandom.rareNFTName,
          fandom.rareNFTDescription,
          fandom.rareNFTImageUrl
        );
        
        if (!nftId) {
          alert('Failed to mint rare moment NFT. Please try again.');
        }
      } catch (error) {
        console.error('Error minting rare moment NFT:', error);
        alert('Error minting rare moment NFT. Please try again.');
      } finally {
        setIsMinting(false);
      }
    }
  };
  
  const handleFinish = () => {
    navigate('/gallery');
  };
  
  if (!fandom) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="minting-animation mx-auto w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-center gradient-text">
        {fandom.name} Fan Quiz
      </h1>
      <p className="text-center text-gray-300 mb-8">
        Answer correctly to earn a rare moment NFT!
      </p>
      
      {isMinting && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl text-center max-w-md">
            <div className="minting-animation mx-auto mb-4 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            <h3 className="text-xl font-bold mb-2">Minting Your Rare Moment NFT</h3>
            <p className="text-gray-300">
              Please wait while we mint your {fandom.rareNFTName} on the Sui blockchain...
            </p>
          </div>
        </div>
      )}
      
      <div className="card p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">{fandom.quizQuestion.question}</h3>
          
          <div className="space-y-3">
            {fandom.quizQuestion.options.map((option, index) => (
              <div 
                key={index}
                className={`quiz-option flex items-center justify-between ${
                  selectedOption === index ? 'selected' : ''
                } ${
                  isAnswered && index === fandom.quizQuestion.correctAnswer 
                    ? 'bg-green-600/30 border-green-500' 
                    : isAnswered && index === selectedOption && selectedOption !== fandom.quizQuestion.correctAnswer
                      ? 'bg-red-600/30 border-red-500'
                      : ''
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <span>{option}</span>
                {isAnswered && index === fandom.quizQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {isAnswered && index === selectedOption && selectedOption !== fandom.quizQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {isAnswered ? (
          <div className="text-center">
            {isCorrect ? (
              <div className="bg-green-600/20 border border-green-500 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-green-400 mr-2" />
                  <h3 className="text-xl font-bold text-green-400">Correct Answer!</h3>
                </div>
                <p>You've earned a rare {fandom.rareNFTName} NFT. Check your gallery to view it!</p>
              </div>
            ) : (
              <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 mb-6">
                <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-red-400 mb-2">Not quite right</h3>
                <p>That's okay! You can try again later. You still keep your fan badge NFT.</p>
              </div>
            )}
            
            <button 
              className="btn-primary"
              onClick={handleFinish}
            >
              <span className="flex items-center">
                View My NFT Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </button>
          </div>
        ) : (
          <button 
            className="btn-primary w-full"
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;