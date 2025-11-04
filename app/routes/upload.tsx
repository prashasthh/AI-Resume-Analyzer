import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { usePuterStore } from '../libb/puter';
import { generateUUID } from '../libb/utils';
import FileUploader from '../Components/fileuploader';
import { prepareInstructions, AIResponseFormat } from '../../constants';

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async (companyName: string, jobTitle: string, jobDescription: string, file: File) => {
    console.log('=== HANDLE ANALYZE STARTED ===');
    console.log({ companyName, jobTitle, jobDescription, file });
    
    setIsProcessing(true);
    setStatusText('Uploading the file...');
    console.log('Status set to: Uploading the file...');
    
    try {
      const uploadedFile: FSItem | undefined = await fs.upload([file]);
      console.log('File uploaded:', uploadedFile);
      
      if (!uploadedFile) {
        setStatusText('Error: Failed to upload file. Please try again.');
        setIsProcessing(false);
        return;
      }
      
      setStatusText('Converting to image...');
      // For now, work directly with the PDF file
      // TODO: Add proper PDF to image conversion when available
      
      setStatusText('Preparing data...');
      const uuid = generateUUID();
      const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedFile.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: '',
      };
      
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      
      setStatusText('Analyzing...');
      console.log('Starting AI analysis...');
      
      try {
        // Call AI feedback with path to uploaded file and job requirements message
        const feedback = await ai.feedback(
          uploadedFile.path,  // path: path to the uploaded resume file
          prepareInstructions(jobTitle, jobDescription, AIResponseFormat)  // message: prepared instructions
        );
        
        console.log('Feedback received:', feedback);
        
        if (!feedback) {
          console.error('No feedback received from AI');
          setStatusText('Error: Failed to analyze resume - no response');
          setIsProcessing(false);
          return;
        }
        
        console.log('Processing feedback...');
        const feedbackText: any = typeof feedback.message.content === 'string'
          ? feedback.message.content
          : feedback.message.content[0].text;
        
        const parsedFeedback = JSON.parse(feedbackText);
        
        data.feedback = parsedFeedback;
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        
        console.log('Analysis complete:');
        console.log(data);
        
        setStatusText('Analysis complete! Redirecting...');
        
        // Wait a moment to ensure KV storage is fully synced
        await new Promise(resolve => setTimeout(resolve, 500));
        
        navigate(`/resume/${uuid}`, { replace: true });
        // Keep isProcessing true so the message stays visible
      } catch (analysisError) {
        console.error('Analysis error:', analysisError);
        const errorMessage = analysisError instanceof Error ? analysisError.message : JSON.stringify(analysisError);
        setStatusText(`Analysis error: ${errorMessage}`);
        alert(`Analysis failed: ${errorMessage}`);
        setIsProcessing(false);
        return;
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      setStatusText(`Error: ${error instanceof Error ? error.message : 'Failed to process file. Please try again.'}`);
      setIsProcessing(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth", { replace: true });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form: HTMLFormElement | null = e.currentTarget.closest('form');
    if (!form) return;
    
    const formData = new FormData(form);
    
    const companyName: FormDataEntryValue | null = formData.get('company-name');
    const jobTitle: FormDataEntryValue | null = formData.get('job-title');
    const jobDescription: FormDataEntryValue | null = formData.get('job-description');
    
    if (!file) return;
    
    // Call handleAnalyze with the form data
    handleAnalyze(
      companyName as string,
      jobTitle as string,
      jobDescription as string,
      file
    );
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated gradient background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-black to-indigo-900/60 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/30 via-transparent to-cyan-500/20 animate-gradient-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-violet-600/20 via-transparent to-purple-700/30" 
           style={{ animation: 'gradient-slow 30s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse' }}></div>
      
      {/* Noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.015]" 
           style={{ 
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
             backgroundRepeat: 'repeat'
           }}></div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        <section className="container mx-auto px-4 pt-16">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold text-purple-400 mb-6 animate-fade-in">Smart feedback for your dream job</h1>
          {isProcessing ? (
            <div className="space-y-8 min-h-[400px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="flex items-center justify-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                  </div>
                </div>
                <h2 key={statusText} className="text-3xl sm:text-5xl font-bold text-white mt-8 animate-fade-in">
                  {statusText}
                </h2>
                <p className="text-gray-400 text-lg mt-4 animate-fade-in-delay">
                  {statusText.includes('Uploading') && 'Securely uploading your resume...'}
                  {statusText.includes('Converting') && 'Processing document format...'}
                  {statusText.includes('Preparing') && 'Optimizing data for AI analysis...'}
                  {statusText.includes('Analyzing') && 'AI is reviewing your resume against job requirements...'}
                  {statusText.includes('complete') && 'Taking you to your results...'}
                </p>
              </div>
            </div>
          ) : (
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 mb-8 animate-fade-in-delay">Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto animate-fade-in-up-delay">
              <div className="flex flex-col gap-2">
                <label htmlFor="company-name" className="text-left text-lg font-semibold text-gray-200">Company Name</label>
                <input 
                  type="text" 
                  name="company-name" 
                  placeholder="Company Name" 
                  id="company-name"
                  className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="job-title" className="text-left text-lg font-semibold text-gray-200">Job Title</label>
                <input 
                  type="text" 
                  name="job-title" 
                  placeholder="Job Title" 
                  id="job-title"
                  className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="job-description" className="text-left text-lg font-semibold text-gray-200">Job Description</label>
                <textarea 
                  name="job-description" 
                  placeholder="Job Description" 
                  id="job-description"
                  rows={6}
                  className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400 transition-all duration-300 resize-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="uploader" className="text-left text-lg font-semibold text-gray-200">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button 
                className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 via-blue-400 to-blue-300 text-white font-semibold text-lg hover:brightness-110 hover:shadow-lg transition-all duration-300 active:scale-[0.98]" 
                type="submit"
              >
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
      </div>
    </main>
  );
};

export default Upload;