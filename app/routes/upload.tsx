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
        // Keep isProcessing true so the message stays visible
        // TODO: Add redirect to results page later
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
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="absolute top-6 left-8">
        <span className="font-extrabold tracking-tight text-3xl sm:text-4xl text-white">
          Rezoomed
        </span>
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full
                     bg-gray-200 hover:bg-gray-300
                     px-5 py-2 text-sm font-semibold text-gray-800 transition
                     hover:shadow-md active:scale-[0.98] motion-reduce:active:scale-100
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
                     focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          Logout
        </button>
      </div>
      
      <section className="container mx-auto px-4 pt-16">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold text-purple-400 mb-6 animate-fade-in">Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 mb-2 animate-fade-in">{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full max-w-xl mx-auto rounded-lg animate-fade-in-up" alt="Processing resume" />
            </>
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
    </main>
  );
};

export default Upload;