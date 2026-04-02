import { ResumeData } from '@/types/resume';

const UnitedNationsTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, languages, publications, references, referencesAvailable } = data;

  return (
    <div className="font-sans text-gray-900 bg-white min-h-[1100px]">
      {/* UN Blue Header */}
      <div className="bg-[#009EDB] text-white px-8 py-6">
        <div className="border-b border-white/30 pb-3 mb-2">
          <p className="text-xs uppercase tracking-[0.3em] mb-1 opacity-80">Personal History Form</p>
          <h1 className="text-2xl font-bold">{personalInfo.fullName || 'Full Name'}</h1>
        </div>
        <div className="flex gap-6 text-xs opacity-90">
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6 p-4 bg-[#E8F4FD] rounded border-l-4 border-[#009EDB]">
            <h2 className="text-xs font-bold text-[#009EDB] uppercase tracking-wider mb-2">Summary of Qualifications</h2>
            <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {/* Employment Record */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#009EDB] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#009EDB]">Employment Record</h2>
            {experiences.map((exp, idx) => (
              <div key={exp.id} className={`mb-4 pb-4 ${idx < experiences.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <div>
                    <p className="text-sm font-bold">{exp.position}</p>
                    <p className="text-xs font-medium text-[#009EDB]">{exp.company}</p>
                    {exp.location && <p className="text-xs text-gray-500">Duty Station: {exp.location}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                </div>
                {exp.description && <p className="text-xs text-gray-600 mt-2">{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-4 relative before:content-['–'] before:absolute before:left-1 before:text-[#009EDB] before:font-bold">{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#009EDB] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#009EDB]">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 flex justify-between">
                <div>
                  <p className="text-sm font-bold">{edu.degree} — {edu.field}</p>
                  <p className="text-xs text-gray-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#009EDB] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#009EDB]">Language Proficiency</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#E8F4FD]">
                  <th className="text-left p-2 font-semibold">Language</th>
                  <th className="text-left p-2 font-semibold">Proficiency</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang) => (
                  <tr key={lang.id} className="border-b border-gray-100">
                    <td className="p-2">{lang.name}</td>
                    <td className="p-2">{lang.proficiency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#009EDB] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#009EDB]">Technical Skills & Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-[#E8F4FD] text-[#006B9F] px-3 py-1 rounded-full border border-[#009EDB]/20">{skill.name} ({skill.level})</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#009EDB] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#009EDB]">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2 flex justify-between">
                <div>
                  <p className="text-xs font-semibold">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                </div>
                <p className="text-xs text-gray-500">{cert.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#009EDB] uppercase tracking-wider mb-3 pb-1 border-b-2 border-[#009EDB]">References</h2>
            <div className="grid grid-cols-2 gap-4">
              {references.map((ref) => (
                <div key={ref.id} className="text-xs p-3 bg-gray-50 rounded">
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-gray-600">{ref.position}, {ref.company}</p>
                  <p className="text-gray-500">{ref.email}</p>
                  {ref.phone && <p className="text-gray-500">{ref.phone}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {referencesAvailable && references.length === 0 && (
          <p className="text-xs italic text-gray-500 mt-4">References available upon request</p>
        )}
      </div>
    </div>
  );
};

export default UnitedNationsTemplate;
