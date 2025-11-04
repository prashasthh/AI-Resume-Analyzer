import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "../libb/puter";
import { useEffect, useState } from "react";
import ScoreBadge from "../Components/ScoreBadge";
import CategoryHeader from "../Components/CategoryHeader";
import CategoryContent from "../Components/CategoryContent";

export const meta = () => ([
  { title: 'Resumind | Review' },
  { name: 'description', content: 'Detailed overview of your resume' },
]);

export default function Resume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | null>('ATS');

  useEffect(() => {
    const loadResume = async () => {
      try {
        setLoading(true);
        const resume = await kv.get(`resume:${id}`);
        
        if(!resume) {
          setLoading(false);
          return;
        }
        
        const data = JSON.parse(resume);
        setResumeData(data);
        
        const resumeBlob = await fs.read(data.resumePath);
        if(!resumeBlob) {
          setLoading(false);
          return;
        }
        
        const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);
        
        // If there's an image path, you can set it here
        if (data.imagePath) {
          const imageBlob = await fs.read(data.imagePath);
          if (imageBlob) {
            const imageObjectUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageObjectUrl);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading resume:', error);
        setLoading(false);
      }
    };
    
    loadResume();
  }, [id]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <div className="text-white text-2xl">Loading your results...</div>
        </div>
      </div>
    );
  }

  if (!resumeUrl || !resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black flex items-center justify-center">
        <div className="text-white text-2xl">Resume not found</div>
      </div>
    );
  }

  const feedback = resumeData.feedback;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black pt-0">
      <nav className="w-full px-8 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-semibold">Back to Homepage</span>
        </Link>
      </nav>

      <div className="container mx-auto px-8 pb-12">
        {/* Header Section with Job Details */}
        <div className="mb-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-6">Resume Review</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Company</p>
              <p className="text-white font-semibold text-lg">{resumeData.companyName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Position</p>
              <p className="text-white font-semibold text-lg">{resumeData.jobTitle}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Job Description</p>
              <p className="text-gray-300 text-sm line-clamp-2">{resumeData.jobDescription}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-8 max-lg:flex-col">
          {/* Left: Feedback Section */}
          <section className="flex-1 space-y-6">{/* Overall Score */}
          {/* Overall Score */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-4">Overall Score</h2>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - feedback.overallScore / 100)}`}
                    className="text-purple-500 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{feedback.overallScore}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-lg">
                  {feedback.overallScore >= 80 ? 'Excellent resume!' : 
                   feedback.overallScore >= 60 ? 'Good resume with room for improvement' : 
                   'Needs significant improvement'}
                </p>
              </div>
            </div>
          </div>

          {/* Category Scores with Accordions */}
          {Object.entries(feedback).map(([key, value]: [string, any]) => {
            if (key === 'overallScore' || typeof value !== 'object') return null;
            
            const categoryNames: { [key: string]: string } = {
              ATS: 'ATS Compatibility',
              toneAndStyle: 'Tone & Style',
              content: 'Content Quality',
              structure: 'Structure',
              skills: 'Skills & Keywords'
            };

            const isOpen = openAccordion === key;

            return (
              <div key={key} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : key)}
                  className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors"
                >
                  <CategoryHeader title={categoryNames[key]} categoryScore={value.score} />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <CategoryContent tips={value.tips} />
                  </div>
                )}
              </div>
            );
          })}
        </section>

          {/* Right: Resume PDF Viewer */}
          <aside className="w-full lg:w-[500px] space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Your Resume</h3>
                <a 
                  href={resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-2"
                >
                  <span>Open Full</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="w-full h-[800px] bg-white rounded-lg overflow-hidden shadow-2xl cursor-pointer"
                   onClick={() => window.open(resumeUrl, '_blank')}>
                <iframe 
                  src={resumeUrl} 
                  className="w-full h-full"
                  title="Resume PDF"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
