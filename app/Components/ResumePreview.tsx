interface ResumePreviewProps {
    companyName: string;
    jobTitle: string;
}

const names = [
    'Sarah Chen', 'Michael Rodriguez', 'Emily Johnson', 'David Kim', 
    'Jessica Williams', 'Alex Martinez', 'Olivia Brown', 'James Wilson',
    'Sophia Taylor', 'Daniel Anderson', 'Isabella Garcia', 'Ryan Thompson'
];

const companies = [
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix',
    'Tesla', 'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Spotify'
];

const roles = [
    'Senior Software Engineer', 'Full Stack Developer', 'Frontend Developer',
    'Backend Engineer', 'DevOps Engineer', 'Data Scientist', 
    'Product Manager', 'UX Designer', 'Cloud Architect', 'ML Engineer'
];

const getRandomItem = (array: string[], seed: string) => {
    // Use string hash as seed for consistent randomness per company/role combo
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash = hash & hash;
    }
    return array[Math.abs(hash) % array.length];
};

export default function ResumePreview({ companyName, jobTitle }: ResumePreviewProps) {
    // Generate consistent random values based on company name
    const seed = companyName + jobTitle;
    const randomName = getRandomItem(names, seed);
    const randomCompany = getRandomItem(companies, seed + '1');
    const randomRole = getRandomItem(roles, seed + '2');
    
    return (
        <div className="w-full h-[300px] max-sm:h-[200px] bg-white p-6 overflow-hidden relative">
            {/* Header Section */}
            <div className="border-b-2 border-gray-300 pb-3 mb-4">
                <h1 className="text-xl font-bold text-gray-800 truncate">{randomName}</h1>
                <p className="text-sm text-gray-600 truncate mt-0.5">{jobTitle}</p>
                <p className="text-xs text-gray-500 mt-1">{randomName.toLowerCase().replace(' ', '.')}@email.com | (555) 123-4567</p>
            </div>

            {/* Professional Summary */}
            <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-700 mb-2">Professional Summary</h2>
                <div className="space-y-1">
                    <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                    <div className="h-1.5 bg-gray-200 rounded w-11/12"></div>
                    <div className="h-1.5 bg-gray-200 rounded w-10/12"></div>
                </div>
            </div>

            {/* Experience Section */}
            <div className="mb-4">
                <h2 className="text-sm font-bold text-gray-700 mb-2">Experience</h2>
                <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-800 truncate">{randomRole}</p>
                    <p className="text-xs text-gray-600 truncate mt-0.5">{randomCompany} | 2021 - Present</p>
                    <div className="space-y-1 mt-2">
                        <div className="flex items-start gap-2">
                            <span className="text-xs text-gray-400 mt-0.5">•</span>
                            <div className="h-1.5 bg-gray-200 rounded flex-1"></div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-xs text-gray-400 mt-0.5">•</span>
                            <div className="h-1.5 bg-gray-200 rounded w-11/12"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="mb-3">
                <h2 className="text-sm font-bold text-gray-700 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                    {['JavaScript', 'React', 'TypeScript', 'Node.js'].map((skill) => (
                        <span key={skill} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Watermark overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-7xl font-bold text-gray-100 opacity-30 rotate-[-45deg]">PREVIEW</span>
            </div>
        </div>
    );
}
