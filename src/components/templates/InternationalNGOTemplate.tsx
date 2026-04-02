import { ResumeData } from '@/types/resume';

const InternationalNGOTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages, publications, references, referencesAvailable } = data;

  return (
    <div className="font-sans text-gray-900 bg-white min-h-[1100px]">
      {/* Teal Header */}
      <div className="bg-[#0D7377] text-white px-8 py-6">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || 'Full Name'}</h1>
        <div className="flex flex-wrap gap-4 text-xs opacity-90 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Mission Statement */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#0D7377]" />
              Professional Profile
            </h2>
            <p className="text-xs leading-relaxed text-gray-700 pl-8">{personalInfo.summary}</p>
          </div>
        )}

        {/* Field Experience */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#0D7377]" />
              Field & Professional Experience
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4 pl-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold">{exp.position}</p>
                    <p className="text-xs font-medium text-[#0D7377]">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-[#0D7377]/5 px-2 py-0.5 rounded">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#0D7377]">{a}</li>
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
            <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#0D7377]" />
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 pl-8 flex justify-between">
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
          {/* Technical Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#0D7377]" />
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-1 pl-8">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-[#0D7377]/10 text-[#0D7377] px-2 py-0.5 rounded">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#0D7377]" />
                Languages
              </h2>
              <div className="pl-8 space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-xs">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects / Programs */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#0D7377]" />
              Programs & Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 pl-8">
                <p className="text-xs font-semibold">{proj.name}</p>
                <p className="text-xs text-gray-600">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#0D7377]" />
              Publications
            </h2>
            {publications.map((pub) => (
              <div key={pub.id} className="mb-2 pl-8">
                <p className="text-xs font-semibold">{pub.title}</p>
                <p className="text-xs text-gray-500">{pub.publisher} • {pub.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#0D7377] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#0D7377]" />
              References
            </h2>
            <div className="grid grid-cols-2 gap-3 pl-8">
              {references.map((ref) => (
                <div key={ref.id} className="text-xs">
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

export default InternationalNGOTemplate;
