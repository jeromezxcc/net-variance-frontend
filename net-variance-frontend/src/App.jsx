import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
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
      setResult(data);
    } catch (err) {
      setResult({ status: "error", message: "Error connecting to backend" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>📄 Net Variance Checker</h1>

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading} style={{ marginLeft: "10px" }}>
        {loading ? "Checking..." : "Upload & Check"}
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Result</h2>

          {result.status === "ok" && <p style={{ color: "green" }}>✅ All values are correct.</p>}

          {result.status === "mismatches" && (
            <>
              <p style={{ color: "red" }}>
                ❌ {result.errors.length} mismatch{result.errors.length > 1 ? "es" : ""} found:
              </p>
              <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead style={{ backgroundColor: "#f0f0f0" }}>
                  <tr>
                    <th>#</th>
                    <th>Account</th>
                    <th>Net Rate</th>
                    <th>Net Variance</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {result.errors.map((err, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{err.row.Account}</td>
                      <td>{err.row["Net Rate"]}</td>
                      <td>{err.row["Net Variance"]}</td>
                      <td>{err.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {result.status === "error" && <p style={{ color: "red" }}>❌ {result.message}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
