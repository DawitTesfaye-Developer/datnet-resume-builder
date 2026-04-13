import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

const MinimalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto print:shadow-none"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", lineHeight: '1.55', padding: '48px 52px' }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-[32px] font-light tracking-tight text-gray-900 leading-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-[11px] text-gray-500 mt-2 space-x-2.5">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>· {personalInfo.phone}</span>}
          {personalInfo.location && <span>· {personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="text-[11px] text-gray-500 mt-1">
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.portfolio && <span> · {personalInfo.portfolio}</span>}
          </div>
        )}
        <div className="h-px bg-gray-200 mt-5" />
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-7">
          <p className="text-[11.5px] text-gray-600 leading-[1.7]">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[12px] font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mb-1.5">{exp.company}{exp.location && `, ${exp.location}`}</p>
                {exp.description && (
                  <p className="text-[11px] text-gray-600 leading-[1.65] mb-1.5">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="space-y-0.5">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-[11px] text-gray-600 pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400 leading-[1.65]">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Education
          </h2>
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-[11.5px] font-medium text-gray-900">{edu.degree}, {edu.field}</span>
                  <span className="text-[11px] text-gray-500"> — {edu.institution}</span>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-4">{formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            Skills
          </h2>
          <p className="text-[11px] text-gray-600 leading-[1.7]">
            {skills.map(s => s.name).join(', ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <p key={cert.id} className="text-[11px] text-gray-700">
                <span className="font-medium">{cert.name}</span>
                <span className="text-gray-500"> — {cert.issuer}, {cert.date}</span>
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-[11.5px] font-medium text-gray-900">{project.name}</h3>
                <p className="text-[11px] text-gray-600 leading-[1.6]">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            Languages
          </h2>
          <p className="text-[11px] text-gray-600">
            {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
          </p>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            References
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {references.map((ref) => (
              <div key={ref.id} className="text-[10px]">
                <p className="font-medium text-gray-900">{ref.name}</p>
                <p className="text-gray-500">{ref.position}, {ref.company}</p>
                <p className="text-gray-400">{ref.email}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {referencesAvailable && references.length === 0 && (
        <p className="text-[10px] italic text-gray-400">References available upon request</p>
      )}

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
