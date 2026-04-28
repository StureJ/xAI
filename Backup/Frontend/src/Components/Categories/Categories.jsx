function Categories({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "cardiometabolic", label: "Cardiometabolic Markers" },
    { id: "metrics", label: "Metrics" },
    { id: "medication", label: <>Discharge<br />Medication</> },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab-box ${activeTab === tab.id ? "tab-active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
          style={{ cursor: "pointer" }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default Categories;