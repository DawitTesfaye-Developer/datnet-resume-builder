import { ResumeData } from '@/types/resume';

const NationalNGOTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages, references, referencesAvailable } = data;

  return (
    <div className="font-sans text-gray-900 bg-white min-h-[1100px]">
      {/* Warm Earth-Tone Header */}
      <div className="bg-[#92400E] text-white px-8 py-6">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || 'Full Name'}</h1>
        <div className="flex flex-wrap gap-4 text-xs mt-2 opacity-90">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Profile */}
        {personalInfo.summary && (
          <div className="mb-6 p-4 bg-[#FEF3C7] rounded-lg border-l-4 border-[#D97706]">
            <h2 className="text-xs font-bold text-[#92400E] uppercase tracking-wider mb-1">Profile</h2>
            <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {/* Community & Professional Experience */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-wider mb-3 border-b-2 border-[#D97706] pb-1">Community & Professional Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold">{exp.position}</p>
                    <p className="text-xs font-medium text-[#B45309]">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                  </div>
                  <p className="text-xs text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['✦'] before:absolute before:left-0 before:text-[#D97706] before:text-[8px]">{a}</li>
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
            <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-wider mb-3 border-b-2 border-[#D97706] pb-1">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 flex justify-between">
                <div>
                  <p className="text-sm font-bold">{edu.degree} — {edu.field}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-wider mb-3 border-b-2 border-[#D97706] pb-1">Core Competencies</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-wider mb-3 border-b-2 border-[#D97706] pb-1">Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-wider mb-3 border-b-2 border-[#D97706] pb-1">Certifications & Training</h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs p-2 bg-[#FEF3C7]/50 rounded">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-500">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Programs */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-wider mb-3 border-b-2 border-[#D97706] pb-1">Program Coordination</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <p className="text-xs font-semibold">{proj.name}</p>
                <p className="text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-wider mb-3 border-b-2 border-[#D97706] pb-1">References</h2>
            <div className="grid grid-cols-2 gap-3">
              {references.map((ref) => (
                <div key={ref.id} className="text-xs p-2 bg-gray-50 rounded">
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-gray-600">{ref.position}, {ref.company}</p>
                  <p className="text-gray-500">{ref.email}</p>
                </div>
              ))}
            </div>
          </div>
        ) : referencesAvailable && (
          <p className="text-xs italic text-gray-500">References available upon request</p>
        )}
      </div>
    </div>
  );
};

export default NationalNGOTemplate;
