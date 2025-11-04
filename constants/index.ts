export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Senior Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Solutions Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "Lead iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
    {
        id: "4",
        companyName: "Amazon",
        jobTitle: "Full-Stack Software Engineer",
        imagePath: "/images/resume_04.png",
        resumePath: "/resumes/resume-4.pdf",
        feedback: {
            overallScore: 92,
            ATS: { score: 95, tips: [] },
            toneAndStyle: { score: 95, tips: [] },
            content: { score: 95, tips: [] },
            structure: { score: 95, tips: [] },
            skills: { score: 95, tips: [] },
        },
    },
    {
        id: "5",
        companyName: "Microsoft",
        jobTitle: "Azure Cloud Architect",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
    {
        id: "6",
        companyName: "Apple",
        jobTitle: "Mobile Applications Lead",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
];

export const AIResponseFormat = `{
  "overallScore": <number between 0-100>,
  "ATS": {
    "score": <number between 0-100>,
    "tips": [<array of specific tips to improve ATS compatibility>]
  },
  "toneAndStyle": {
    "score": <number between 0-100>,
    "tips": [<array of specific tips to improve tone and style>]
  },
  "content": {
    "score": <number between 0-100>,
    "tips": [<array of specific tips to improve content>]
  },
  "structure": {
    "score": <number between 0-100>,
    "tips": [<array of specific tips to improve structure>]
  },
  "skills": {
    "score": <number between 0-100>,
    "tips": [<array of specific tips to improve skills section>]
  }
}`;

export const prepareInstructions = (jobTitle: string, jobDescription: string, AIResponseFormat: string) => `
You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze this resume and suggest how to improve it.
The rating can be low if the resume is bad.
Be thorough and detailed. Don't be afraid to point out any mistakes.
If there is a lot to improve, don't hesitate to give low scores.
If available, use the job description for the job user is applying to.
If provided, take the job description into consideration.

The job title is: ${jobTitle}
The job description is: ${jobDescription}

Provide the feedback using the following format:
${AIResponseFormat}

Return the analysis as an JSON object, without any other text and quotes.
Do not include any other text or comments.`;
