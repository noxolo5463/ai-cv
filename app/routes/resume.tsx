import { useEffect, useState, type JSX } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/home";
import Summary from "~/components/summary";
import ATS from "~/components/ats";
import Details from "~/components/details";
import type { Feedback } from "types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

function Resume() {
  const { id } = useParams();
  const {auth,isLoading,  kv, fs } = usePuterStore();

  const [resumeUrl, setResumeUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const navigate = useNavigate();

     useEffect(() => {
        if (!isLoading &&!auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      setImageUrl(URL.createObjectURL(imageBlob));

      setFeedback(data.feedback || "");
    };

    loadResume();
  }, [id, kv, fs]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to home page
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-url[(''/images/bg-small.svg)] bg-cover h-[100vh] sticky top-0 item-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wsl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="Resume"
				  
                />
              </a>
            </div>
          )}
        </section>
		<section className="feedback-section ">
			<h2 className="text-4xl !text-black-bold font-bold">
				Resume Review
			</h2>
			{
				feedback  ? (
					<div className="flex flex-col animate-in fade-in gap-8 duration-1000">
						<Summary feedback={feedback} />
						<ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
						<Details feedback={feedback} />
					</div>
				):(
					<img src="/images/resume-scan-2.gif" />
				)
			}
		</section>
      </div>
    </main>
  );
}

export default function ResumeRoute() {
  if (typeof window === "undefined") {
    return null; 
  }
  return <Resume />;
}
