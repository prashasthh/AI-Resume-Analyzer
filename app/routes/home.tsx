import ResumeCard from "../Components/ResumeCard";
import { resumes } from "../../constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "../libb/puter";

export function meta() {
    return [
        { title: "Rezoomed" },
        { name: "description", content: "Your resume, reimagined by intelligence!" },
    ];
}

export default function Home() {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1] || "/";
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.isAuthenticated) navigate(`/auth?next=${next}`);
    }, [auth.isAuthenticated, next]);
    return (
        <main className="min-h-screen bg-gray-900">
            <section className="Main-Section">
                <div className="Page-Heading container mx-auto px-4 pt-6 pb-8 text-center">
                    <h1 className="text-7xl font-bold text-purple-400 mb-2">Track your Applications & Resume Ratings</h1>
                    <h2 className="text-5xl font-bold text-gray-300">Review your submissions and check AI powered feedback</h2>
                </div>
            </section>
            {resumes.length > 0 && (
                <section className="container mx-auto px-4">
                    {/* Soft gradient divider under hero - adjusted for dark theme */}
                    <div className="h-2 rounded-t-xl bg-gradient-to-r from-purple-500/80 via-purple-400/70 to-transparent mb-6" />
                    {/* Panel that holds the grid - dark bg with forced light text for visibility */}
                    <div className="rounded-b-xl overflow-hidden bg-gray-800/90 border border-gray-700/70 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {resumes.map((resume) => (
                                <ResumeCard key={resume.id} resume={resume} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}