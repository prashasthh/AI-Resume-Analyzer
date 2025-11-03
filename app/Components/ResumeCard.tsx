import { Link } from "react-router";
import ScoreCircle from "~/Components/ScoreCircle";

// Define the expected props (types)
interface ResumeCardProps {
    resume: Resume;
}

export default function ResumeCard({ resume }: ResumeCardProps) {
    const { id, companyName, jobTitle, feedback, imagePath } = resume;


    return (
        <Link
            to={`/resume/${id}`}
            className="resume-card animate-in fade-in duration-1000"
        >
            <div className="resume-card-header flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-extrabold text-white leading-snug break-words">
                        {companyName ?? ""}
                    </h2>
                    <h3 className="text-base font-bold text-white leading-tight break-words max-w-[220px] truncate mt-1">
                        {jobTitle ?? ""}
                    </h3>
                </div>

                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            <div className="gradient-border animate-in fade-in duration-1000 mt-3 rounded-xl overflow-hidden">
                <div className="w-full h-full">
                    <img
                        src={imagePath}
                        alt="resume"
                        className="w-full h-[300px] max-sm:h-[200px] object-cover object-top"
                    />
                </div>
            </div>
        </Link>
    );
}
