"use client";

import { useState, useCallback, useEffect } from "react";
import PersonalInfoSection from "@/components/(user-resume)/form-sections/PersonalInfoSection";
import ExperienceSection from "@/components/(user-resume)/form-sections/ExperienceSection";
import EducationSection from "@/components/(user-resume)/form-sections/EducationSection";
import SkillsSection from "@/components/(user-resume)/form-sections/SkillsSection";
import ProjectsSection from "@/components/(user-resume)/form-sections/ProjectsSection";
import CertificationsSection from "@/components/(user-resume)/form-sections/CertificationsSection";

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
];

export default function ResumeForm({ resumeData, updateResumeData }) {
  const [activeSection, setActiveSection] = useState("personal");

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Memoized handlers — stable references so memo on children works
  const handlePersonalChange = useCallback(
    (val) => updateResumeData("personalInfo", val), [updateResumeData]);
  const handleExperienceChange = useCallback(
    (val) => updateResumeData("experience", val), [updateResumeData]);
  const handleEducationChange = useCallback(
    (val) => updateResumeData("education", val), [updateResumeData]);
  const handleSkillsChange = useCallback(
    (val) => updateResumeData("skills", val), [updateResumeData]);
  const handleProjectsChange = useCallback(
    (val) => updateResumeData("projects", val), [updateResumeData]);
  const handleCertificationsChange = useCallback(
    (val) => updateResumeData("certifications", val), [updateResumeData]);

  return (
    <div className="flex flex-col h-full">
      {/* Section Nav */}
      <div className="flex overflow-x-auto border-b border-white/10 bg-gray-950">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeSection === s.id
                ? "border-blue-500 text-white font-medium"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === "personal" && (
          <PersonalInfoSection
            data={resumeData?.personalInfo || {}}
            onChange={handlePersonalChange}
          />
        )}
        {activeSection === "experience" && (
          <ExperienceSection
            data={resumeData?.experience || []}
            onChange={handleExperienceChange}
          />
        )}
        {activeSection === "education" && (
          <EducationSection
            data={resumeData?.education || []}
            onChange={handleEducationChange}
          />
        )}
        {activeSection === "skills" && (
          <SkillsSection
            data={{
              technical: resumeData?.skills?.technical || resumeData?.skills?.[0]?.technical || [],
              soft: resumeData?.skills?.soft || resumeData?.skills?.[0]?.soft || []
            }}
            onChange={handleSkillsChange}
          />
        )}
        {activeSection === "projects" && (
          <ProjectsSection
            data={resumeData?.projects || []}
            onChange={handleProjectsChange}
          />
        )}
        {activeSection === "certifications" && (
          <CertificationsSection
            data={resumeData?.certifications || []}
            onChange={handleCertificationsChange}
          />
        )}
      </div>
    </div>
  );
}