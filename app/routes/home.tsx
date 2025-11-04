import ResumeCard from "../Components/ResumeCard";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "../libb/puter";

export function meta() {
    return [
        { title: "Rezoomed" },
        { name: "description", content: "Your resume, reimagined by intelligence!" },
    ];
}

export default function Home() {
    const { isLoading, auth, kv, fs } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1] || "/";
    const navigate = useNavigate();
    const [resumeUrl, setResumeUrl] = useState('');
    const [resumes, setResumes] = useState<any[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    const getDefaultResumes = () => {
        return [
            {
                id: 'default-1',
                companyName: 'Google',
                jobTitle: 'Software Engineer',
                jobDescription: 'Full stack development role',
                resumePath: '/default/path1.pdf',
                imagePath: '/default/path1.pdf',
                feedback: {
                    overallScore: 85,
                    atsCompatibility: { score: 80, tips: ['Add more keywords', 'Improve formatting'] },
                    keywordsMatching: { score: 90, tips: ['Great keyword usage'] },
                    experienceRelevance: { score: 85, tips: ['Highlight relevant projects'] },
                    formattingClarity: { score: 88, tips: ['Clean layout'] },
                }
            },
            {
                id: 'default-2',
                companyName: 'Microsoft',
                jobTitle: 'Cloud Engineer',
                jobDescription: 'Azure cloud infrastructure',
                resumePath: '/default/path2.pdf',
                imagePath: '/default/path2.pdf',
                feedback: {
                    overallScore: 78,
                    atsCompatibility: { score: 75, tips: ['Add certifications'] },
                    keywordsMatching: { score: 82, tips: ['Include Azure keywords'] },
                    experienceRelevance: { score: 76, tips: ['Add cloud projects'] },
                    formattingClarity: { score: 79, tips: ['Better section headers'] },
                }
            },
            {
                id: 'default-3',
                companyName: 'Apple',
                jobTitle: 'iOS Developer',
                jobDescription: 'Swift/SwiftUI development',
                resumePath: '/default/path3.pdf',
                imagePath: '/default/path3.pdf',
                feedback: {
                    overallScore: 92,
                    atsCompatibility: { score: 90, tips: ['Excellent format'] },
                    keywordsMatching: { score: 95, tips: ['Perfect keyword match'] },
                    experienceRelevance: { score: 91, tips: ['Strong iOS experience'] },
                    formattingClarity: { score: 92, tips: ['Very clear layout'] },
                }
            },
            {
                id: 'default-4',
                companyName: 'Amazon',
                jobTitle: 'DevOps Engineer',
                jobDescription: 'AWS infrastructure and CI/CD',
                resumePath: '/default/path4.pdf',
                imagePath: '/default/path4.pdf',
                feedback: {
                    overallScore: 88,
                    atsCompatibility: { score: 86, tips: ['Add AWS certifications'] },
                    keywordsMatching: { score: 89, tips: ['Good DevOps keywords'] },
                    experienceRelevance: { score: 87, tips: ['Strong automation experience'] },
                    formattingClarity: { score: 90, tips: ['Professional formatting'] },
                }
            },
            {
                id: 'default-5',
                companyName: 'Meta',
                jobTitle: 'Frontend Developer',
                jobDescription: 'React and modern web development',
                resumePath: '/default/path5.pdf',
                imagePath: '/default/path5.pdf',
                feedback: {
                    overallScore: 81,
                    atsCompatibility: { score: 78, tips: ['Add more skills'] },
                    keywordsMatching: { score: 85, tips: ['Good React keywords'] },
                    experienceRelevance: { score: 80, tips: ['Showcase UI projects'] },
                    formattingClarity: { score: 82, tips: ['Clean design'] },
                }
            },
            {
                id: 'default-6',
                companyName: 'Netflix',
                jobTitle: 'Data Scientist',
                jobDescription: 'ML and analytics',
                resumePath: '/default/path6.pdf',
                imagePath: '/default/path6.pdf',
                feedback: {
                    overallScore: 94,
                    atsCompatibility: { score: 92, tips: ['Outstanding format'] },
                    keywordsMatching: { score: 96, tips: ['Perfect ML keywords'] },
                    experienceRelevance: { score: 93, tips: ['Impressive projects'] },
                    formattingClarity: { score: 95, tips: ['Excellent layout'] },
                }
            }
        ];
    };

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=${next}`);
        }
    }, [auth.isAuthenticated, isLoading, next]);

    useEffect(() => {
        const loadResumes = async () => {
            try {
                // Just show the default 6 resumes instantly
                const defaultResumes = getDefaultResumes();
                setResumes(defaultResumes);
                setLoadingResumes(false);
            } catch (error) {
                console.error('Error loading resumes:', error);
                setLoadingResumes(false);
            }
        };

        if (auth.isAuthenticated && !isLoading) {
            // Load resumes immediately without delay
            const defaultResumes = getDefaultResumes();
            setResumes(defaultResumes);
            setLoadingResumes(false);
        } else {
            setLoadingResumes(false);
        }
    }, [auth.isAuthenticated, isLoading]);

    if (isLoading) {
        return null; // Return nothing during initial auth check to prevent flash
    }

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/auth", { replace: true });
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black">
            {/* Modern Header with Rezoomed, Upload, Logout */}
            <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left: Rezoomed Logo */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                                Rezoomed
                            </h1>
                        </div>
                        
                        {/* Center: Upload Button */}
                        <div className="flex-1 flex justify-center">
                            <button
                                onClick={() => navigate('/upload')}
                                className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold text-lg rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                            >
                                <span className="relative z-10">Upload Resume</span>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                        
                        {/* Right: Logout Button */}
                        <div className="flex-1 flex justify-end">
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <section className="Main-Section pt-12">
                <div className="Page-Heading container mx-auto px-4 pb-8 text-center">
                    <h1 className="text-7xl font-bold text-purple-400 mb-2">Track your Applications & Resume Ratings</h1>
                    <h2 className="text-5xl font-bold text-gray-300">Review your submissions and check AI powered feedback</h2>
                </div>
            </section>
            {resumes.length > 0 ? (
                <section className="container mx-auto px-4">
                    {/* Panel that holds the grid - dark bg with forced light text for visibility */}
                    <div className="rounded-b-xl overflow-hidden bg-gray-800/90 border border-gray-700/70 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {resumes.map((resume) => (
                                <ResumeCard key={resume.id} resume={resume} />
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="container mx-auto px-4">
                    <div className="rounded-xl overflow-hidden bg-gray-800/90 border border-gray-700/70 text-white p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-3xl font-bold text-gray-300">No Resumes Yet</h3>
                            <p className="text-xl text-gray-400 mb-4">Upload your first resume to get AI-powered feedback!</p>
                            <button
                                onClick={() => navigate('/upload')}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:brightness-110 transition"
                            >
                                Upload Resume
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}