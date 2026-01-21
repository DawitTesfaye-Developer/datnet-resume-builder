import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

const MinimalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 p-10 shadow-xl max-w-[8.5in] mx-auto" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-500 space-x-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="text-sm text-gray-500 mt-1">
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.portfolio && <span> • {personalInfo.portfolio}</span>}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-400">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{exp.company}{exp.location && `, ${exp.location}`}</p>
                {exp.achievements.length > 0 && (
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-gray-600 pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
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
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-medium text-gray-900">{edu.degree}, {edu.field}</span>
                  <span className="text-gray-500"> — {edu.institution}</span>
                </div>
                <span className="text-sm text-gray-400">{formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Skills
          </h2>
          <p className="text-sm text-gray-600">
            {skills.map(s => s.name).join(', ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
