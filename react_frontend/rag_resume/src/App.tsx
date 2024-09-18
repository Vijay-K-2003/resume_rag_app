import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("NOT YET RECEIVED");
  const [loading, setLoading] = useState<boolean>(false);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setFile(input.files[0]);
    }
  }
  const getSummary = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/summarize/", formData);
      console.log(response.data);
      setSummary(response.data["summary"]);
    } catch (error) {
      console.error("Error during file upload:", error);
      setSummary("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className='hero'>
        <h1>Resume RAG</h1>
      </div>
      <div className='neubox card'>
        <h2>Summarizer</h2>
        This is an application that helps you to summarize your resume.
        <br />
        <br />
        <form onSubmit={getSummary}>
          <div>
            <label htmlFor='resume'>File : </label>
            <input type="file" name="resume" id="resume" onChange={onFileChange} />
          </div>
          <br />
          <div>
          <label htmlFor='summary'>Summary :</label>
          <p>{summary}</p>
          </div>
          <br />
          <button id="summarizer_submit" type='submit' className={(file)? "uploadbtn_active" : "uploadbtn_inactive"}>
          {loading ? 'Submitting...' : 'Summarize'}
          </button>
        </form>

        <div>
          
        </div>
      </div>
    </div>
  )
}

export default App
