<>
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        https://net-variance-backend-production.up.railway.app/, 
        formData
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📄 Net Variance Checker</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Result:</h3>
          {result.status === "ok" ? (
            <p>✅ All values are correct!</p>
          ) : (
            <ul>
              {result.errors.map((err, idx) => (
                <li key={idx}>
                  ⚠️ Row: {JSON.stringify(err.row)}<br />
                  Reason: {err.reason}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
</>