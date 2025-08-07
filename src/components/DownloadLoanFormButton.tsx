import React, { useState } from "react";

const forms = [
  {
    label: "Business Loan Application",
    file: require("../loan-forms/Business loan application form.docx"),
    filename: "Business loan application form.docx"
  },
  {
    label: "Personal Loan Application",
    file: require("../loan-forms/Personal loan application form.docx"),
    filename: "Personal loan application form.docx"
  },
  {
    label: "Salary Based Loan Application",
    file: require("../loan-forms/Salary Based Application forms.docx"),
    filename: "Salary Based Application forms.docx"
  }
];

export const DownloadLoanFormButton: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleDownload = (file: string, filename: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowOptions(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setShowOptions((v) => !v)}
        style={{ padding: "8px 16px", borderRadius: 6, background: "#2563eb", color: "white", border: "none", cursor: "pointer" }}
      >
        Download Form
      </button>
      {showOptions && (
        <div style={{ position: "absolute", top: "110%", left: 0, background: "white", border: "1px solid #ddd", borderRadius: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 10 }}>
          {forms.map((form) => (
            <button
              key={form.filename}
              onClick={() => handleDownload(form.file, form.filename)}
              style={{ display: "block", padding: "8px 16px", width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}
            >
              {form.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadLoanFormButton;
