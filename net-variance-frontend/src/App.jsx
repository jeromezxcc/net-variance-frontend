import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("https://net-variance-backend-production.up.railway.app/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.result || "No result returned");
    } catch (err) {
      setResult("Error connecting to backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Net Variance Checker</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Checking..." : "Upload & Check"}
      </button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default App;

