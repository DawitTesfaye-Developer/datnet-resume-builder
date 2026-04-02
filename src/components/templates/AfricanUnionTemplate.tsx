import { ResumeData } from '@/types/resume';

const AfricanUnionTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, languages, publications, references, referencesAvailable } = data;

  return (
    <div className="font-serif text-gray-900 bg-white min-h-[1100px]">
      {/* AU Header with Gold/Green */}
      <div className="bg-[#006B3F] text-white px-8 py-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-2 h-12 bg-[#D4A843]" />
          <div>
            <h1 className="text-2xl font-bold tracking-wide">{personalInfo.fullName || 'Full Name'}</h1>
            <p className="text-[#D4A843] text-sm font-medium mt-1">CURRICULUM VITAE</p>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[280px] bg-[#F5F0E6] p-6 min-h-[900px]">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b border-[#D4A843] pb-1">Personal Details</h3>
            {personalInfo.email && <p className="text-xs mb-1"><span className="font-semibold">Email:</span> {personalInfo.email}</p>}
            {personalInfo.phone && <p className="text-xs mb-1"><span className="font-semibold">Phone:</span> {personalInfo.phone}</p>}
            {personalInfo.location && <p className="text-xs mb-1"><span className="font-semibold">Nationality/Location:</span> {personalInfo.location}</p>}
            {personalInfo.linkedIn && <p className="text-xs mb-1"><span className="font-semibold">LinkedIn:</span> {personalInfo.linkedIn}</p>}
          </div>

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b border-[#D4A843] pb-1">Languages</h3>
              {languages.map((lang) => (
                <div key={lang.id} className="mb-2">
                  <p className="text-xs font-semibold">{lang.name}</p>
                  <p className="text-xs text-gray-600">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b border-[#D4A843] pb-1">Key Competencies</h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span key={skill.id} className="text-xs bg-[#006B3F]/10 text-[#006B3F] px-2 py-0.5 rounded">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b border-[#D4A843] pb-1">Certifications</h3>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <p className="text-xs font-semibold">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Personal Statement */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider mb-2 border-b-2 border-[#D4A843] pb-1">Personal Statement</h2>
              <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </div>
          )}

          {/* Professional Experience */}
          {experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b-2 border-[#D4A843] pb-1">Professional Experience</h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold">{exp.position}</p>
                      <p className="text-xs text-[#006B3F] font-medium">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative before:content-['▪'] before:absolute before:left-0 before:text-[#D4A843]">{a}</li>
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
              <h2 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b-2 border-[#D4A843] pb-1">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold">{edu.degree} in {edu.field}</p>
                      <p className="text-xs text-[#006B3F]">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    </div>
                    <p className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b-2 border-[#D4A843] pb-1">Publications</h2>
              {publications.map((pub) => (
                <div key={pub.id} className="mb-2">
                  <p className="text-xs font-semibold">{pub.title}</p>
                  <p className="text-xs text-gray-500">{pub.publisher} • {pub.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider mb-3 border-b-2 border-[#D4A843] pb-1">References</h2>
              <div className="grid grid-cols-2 gap-3">
                {references.map((ref) => (
                  <div key={ref.id} className="text-xs">
                    <p className="font-semibold">{ref.name}</p>
                    <p className="text-gray-600">{ref.position}, {ref.company}</p>
                    <p className="text-gray-500">{ref.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {referencesAvailable && references.length === 0 && (
            <p className="text-xs italic text-gray-500">References available upon request</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfricanUnionTemplate;
