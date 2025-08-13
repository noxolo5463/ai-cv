import { useState, type FormEvent } from "react";
import Navbar from "~/components/navbar"
import FileUploader from "~/components/uploader";

const Upload = () => {

    const [isProceessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };
    

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const form = event.currentTarget.closest('form');
        if (!form) return;

        const formData = new FormData(form);
        const companyName = formData.get('company-name')  as string;
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');

        console.log({
            companyName,
            jobTitle,
            jobDescription,
            file
        })

    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
                <section className="main-section">
                    <div className="page-heading py-16">
                       <h1>
                         Smart feedback for your dream job!
                       </h1>
                       {
                        isProceessing ? <>
                        <h2>{statusText}</h2>
                        <img src="/images/resume-scan.gif" className="w-full" />
                        </> : <>
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                        </>
                       }

                       {
                        !isProceessing && (
                            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                                <div className="form-div">
                                    <label htmlFor="company-name">Company Name</label>
                                    <input type="text" id="company-name" placeholder="Company Name" name="company-name" />
                                </div>
                                 <div className="form-div">
                                    <label htmlFor="job-title">Job Title</label>
                                    <input type="text" id="job-title" placeholder="Job Title" name="job-title" />
                                </div>
                                 <div className="form-div">
                                    <label htmlFor="job-description">Job Description</label>
                                    <textarea rows={6} id="job-description" placeholder="Job Description" name="job-description" />
                                </div>
                                 <div className="form-div">
                                    <label htmlFor="uploader">Uploader</label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>
                                <button className="primary-button" type="submit">
                                    Analyze Resume
                                </button>
                            </form>
                        )
                       }
                       
                    </div>
                </section>
        </main>
    );
};

export default Upload;
