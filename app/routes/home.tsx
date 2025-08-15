import Navbar from "~/components/navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/resume-card";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const {  auth } = usePuterStore();
  const [generatedResume, setGeneratedResume] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('generatedResume');
      if(stored) setGeneratedResume(JSON.parse(stored));
    } catch (error) {
      console.error("Error parsing generatedResume from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications and Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resume-section flex flex-col gap-y-4">
            {generatedResume ? (
              <ResumeCard key={generatedResume.id} resume={generatedResume} />
            ) : (
              resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}
