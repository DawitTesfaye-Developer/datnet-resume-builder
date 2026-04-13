import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Palette } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto overflow-hidden print:shadow-none"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", lineHeight: '1.5' }}
    >
      <div className="flex min-h-[1100px]">
        {/* Sidebar */}
        <div className="w-[260px] bg-gradient-to-b from-purple-600 via-purple-700 to-pink-600 text-white p-7 flex-shrink-0">
          {/* Profile */}
          <div className="mb-7 text-center">
            {personalInfo.photoUrl ? (
              <img src={personalInfo.photoUrl} alt="" className="w-[88px] h-[88px] rounded-full object-cover mx-auto mb-4 ring-3 ring-white/25" />
            ) : (
              <div className="w-[88px] h-[88px] rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-[28px] font-bold">
                  {personalInfo.fullName?.split(' ').map(n => n[0]).join('') || '?'}
                </span>
              </div>
            )}
            <h1 className="text-[18px] font-bold leading-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <div className="space-y-2.5 mb-7">
            {personalInfo.email && (
              <div className="flex items-center gap-2.5 text-[10px]">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2.5 text-[10px]">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2.5 text-[10px]">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center gap-2.5 text-[10px]">
                <Linkedin className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                <span className="break-all">{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-2.5 text-[10px]">
                <Globe className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                <span className="break-all">{personalInfo.portfolio}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-7">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2 opacity-90">
                <Palette className="w-3.5 h-3.5" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-2 py-0.5 bg-white/15 rounded-full text-[9px] backdrop-blur-sm border border-white/10">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-7">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 opacity-90">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[10px]">
                    <p className="font-semibold">{edu.degree}</p>
                    <p className="opacity-85">{edu.field}</p>
                    <p className="opacity-65 text-[9px]">{edu.institution}</p>
                    <p className="opacity-50 text-[9px]">{formatDate(edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-7">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 opacity-90">Languages</h2>
              <div className="space-y-1.5">
                {languages.map((l) => (
                  <div key={l.id} className="text-[10px] flex justify-between">
                    <span>{l.name}</span>
                    <span className="opacity-65">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 opacity-90">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-[9px]">
                    <p className="font-semibold text-[10px]">{cert.name}</p>
                    <p className="opacity-65">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-7">
              <h2 className="text-[14px] font-bold text-purple-700 mb-3 uppercase tracking-[0.08em]">
                About Me
              </h2>
              <p className="text-[11px] text-gray-600 leading-[1.7]">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section className="mb-7">
              <h2 className="text-[14px] font-bold text-purple-700 mb-4 uppercase tracking-[0.08em]">
                Experience
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-2.5 before:h-2.5 before:bg-gradient-to-br before:from-purple-500 before:to-pink-500 before:rounded-full">
                    <h3 className="text-[12px] font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-[11px] text-purple-600 font-medium">{exp.company}</p>
                    <p className="text-[10px] text-gray-400 mb-2">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                    {exp.description && (
                      <p className="text-[11px] text-gray-600 mb-1.5 leading-[1.6]">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="space-y-0.5">
                        {exp.achievements.map((a, idx) => (
                          <li key={idx} className="text-[11px] text-gray-600 leading-[1.6]">• {a}</li>
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
            <section className="mb-7">
              <h2 className="text-[14px] font-bold text-purple-700 mb-4 uppercase tracking-[0.08em]">
                Projects
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {projects.map((project) => (
                  <div key={project.id} className="border border-purple-100 rounded-lg p-3.5 bg-purple-50/30">
                    <h3 className="text-[11px] font-bold text-gray-900">{project.name}</h3>
                    <p className="text-[10px] text-gray-600 mt-1 line-clamp-2 leading-[1.6]">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[8px] rounded">
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

          {/* References */}
          {references.length > 0 && (
            <section>
              <h2 className="text-[14px] font-bold text-purple-700 mb-3 uppercase tracking-[0.08em]">References</h2>
              <div className="grid grid-cols-2 gap-3">
                {references.map((ref) => (
                  <div key={ref.id} className="text-[10px]">
                    <p className="font-semibold text-gray-900">{ref.name}</p>
                    <p className="text-gray-600">{ref.position}, {ref.company}</p>
                    <p className="text-gray-400">{ref.email}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {referencesAvailable && references.length === 0 && (
            <p className="text-[10px] italic text-gray-400 mt-4">References available upon request</p>
          )}
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

export default CreativeTemplate;
