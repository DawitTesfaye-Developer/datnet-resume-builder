import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const skillWidth = (level: string) =>
    level === 'expert' ? '100%' :
    level === 'advanced' ? '82%' :
    level === 'intermediate' ? '60%' : '38%';

  return (
    <div
      className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto overflow-hidden print:shadow-none"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", lineHeight: '1.5' }}
    >
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white px-10 py-8">
        <div className="flex items-center gap-6">
          {personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt=""
              className="w-[76px] h-[76px] rounded-full object-cover ring-3 ring-white/25 flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-[30px] font-bold tracking-tight leading-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2.5 text-[11px] text-blue-100">
              {personalInfo.email && (
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>
              )}
              {personalInfo.linkedIn && (
                <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" />{personalInfo.linkedIn}</span>
              )}
              {personalInfo.portfolio && (
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{personalInfo.portfolio}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="px-10 py-7">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-7">
            <p className="text-[12px] text-gray-600 leading-[1.7] border-l-[3px] border-blue-600 pl-4 italic">
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-[1fr_240px] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-[14px] font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
                  Experience
                </h2>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                      <div className="absolute -left-[5px] top-[6px] w-2 h-2 bg-blue-600 rounded-full" />
                      <h3 className="text-[12px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[11px] text-blue-700 font-medium">{exp.company}</p>
                      <p className="text-[10px] text-gray-500 mb-2">
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                      {exp.description && (
                        <p className="text-[11px] text-gray-600 mb-1.5 leading-[1.6]">{exp.description}</p>
                      )}
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-1">
                          {exp.achievements.map((a, idx) => (
                            <li key={idx} className="text-[11px] text-gray-600 flex items-start gap-2 leading-[1.6]">
                              <span className="text-blue-500 mt-[3px] text-[8px]">▸</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-[14px] font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h3 className="text-[12px] font-bold text-gray-900">{project.name}</h3>
                      <p className="text-[11px] text-gray-600 mt-1 leading-[1.6]">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] rounded border border-blue-100">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-[14px] font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
                  Languages
                </h2>
                <div className="flex flex-wrap gap-3">
                  {languages.map((l) => (
                    <span key={l.id} className="text-[11px] text-gray-700">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-gray-400 ml-1">({l.proficiency})</span>
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* References */}
            {references.length > 0 && (
              <section>
                <h2 className="text-[14px] font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
                  References
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {references.map((ref) => (
                    <div key={ref.id} className="text-[10px] bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="font-semibold text-gray-900">{ref.name}</p>
                      <p className="text-gray-600">{ref.position}, {ref.company}</p>
                      <p className="text-gray-500">{ref.email}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {referencesAvailable && references.length === 0 && (
              <p className="text-[10px] italic text-gray-500">References available upon request</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h2 className="text-[13px] font-bold text-blue-800 mb-3">Skills</h2>
                <div className="space-y-2.5">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-medium text-gray-800">{skill.name}</span>
                        <span className="text-gray-400 capitalize">{skill.level}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                          style={{ width: skillWidth(skill.level) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h2 className="text-[13px] font-bold text-blue-800 mb-3">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-[11px] font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-[10px] text-gray-600">{edu.field}</p>
                      <p className="text-[10px] text-gray-500">{edu.institution}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{formatDate(edu.endDate)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h2 className="text-[13px] font-bold text-blue-800 mb-3">Certifications</h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="text-[10px] font-semibold text-gray-900">{cert.name}</p>
                      <p className="text-[9px] text-gray-500">{cert.issuer} · {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-16 text-gray-400 p-8">
          <p className="text-sm">Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
