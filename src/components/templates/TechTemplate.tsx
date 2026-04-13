import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Code, Terminal } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const TechTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="bg-slate-900 text-slate-100 shadow-xl max-w-[8.5in] mx-auto print:shadow-none"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace", lineHeight: '1.55' }}
    >
      {/* Header */}
      <header className="px-8 pt-8 pb-6 border-b border-slate-700/80">
        <div className="flex items-center gap-3 mb-3">
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="text-green-400 text-[13px]">~/$</span>
          <h1 className="text-[22px] font-bold tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-slate-400">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cyan-400" />{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-cyan-400" />{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" />{personalInfo.location}</span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-cyan-400" />{personalInfo.linkedIn}</span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5 text-cyan-400" />{personalInfo.github}</span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-cyan-400" />{personalInfo.portfolio}</span>
          )}
        </div>
      </header>

      <div className="p-8 space-y-7">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <div className="text-yellow-400 text-[10px] mb-1 opacity-80">{"/**"}</div>
            <p className="text-[11px] text-slate-300 pl-4 border-l-2 border-slate-700 leading-[1.7]">
              {personalInfo.summary}
            </p>
            <div className="text-yellow-400 text-[10px] mt-1 opacity-80">{" **/"}</div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              tech_stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill.id} className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-green-400">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-cyan-400 mb-4">
              work_experience<span className="text-slate-500">()</span>
            </h2>
            <div className="space-y-5">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="text-slate-600 text-[10px] w-6 pt-0.5">{String(index + 1).padStart(2, '0')}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-purple-400 text-[11px]">const</span>
                        <span className="text-yellow-400 text-[11px]">{exp.position.replace(/\s+/g, '_')}</span>
                        <span className="text-slate-500 text-[11px]">=</span>
                        <span className="text-green-400 text-[11px]">"{exp.company}"</span>
                      </div>
                      <p className="text-slate-500 text-[10px] mt-0.5">
                        // {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                      {exp.description && (
                        <p className="text-[10px] text-slate-400 mt-1.5 leading-[1.6]">{exp.description}</p>
                      )}
                      {exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1 pl-2">
                          {exp.achievements.map((a, idx) => (
                            <li key={idx} className="text-[10px] text-slate-300 before:content-['→'] before:text-cyan-400 before:mr-2 leading-[1.6]">
                              {a}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <Github className="w-4 h-4" />
              projects
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-800/80 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-yellow-400 text-[11px] font-bold">{project.name}</h3>
                  <p className="text-slate-400 text-[10px] mt-1 leading-[1.6]">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-[9px] text-cyan-400">#{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-cyan-400 mb-3">education</h2>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center gap-2 text-[10px] flex-wrap">
                  <span className="text-purple-400">import</span>
                  <span className="text-yellow-400">{`{ ${edu.degree} }`}</span>
                  <span className="text-purple-400">from</span>
                  <span className="text-green-400">"{edu.institution}"</span>
                  <span className="text-slate-500">// {formatDate(edu.endDate)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-cyan-400 mb-3">certifications</h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-[10px]">
                  <span className="text-green-400">{cert.name}</span>
                  <span className="text-slate-500"> // {cert.issuer} · {cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-cyan-400 mb-2">languages</h2>
            <p className="text-[10px] text-slate-400">
              [{languages.map(l => `"${l.name}: ${l.proficiency}"`).join(', ')}]
            </p>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-cyan-400 mb-3">references</h2>
            <div className="grid grid-cols-2 gap-3">
              {references.map((ref) => (
                <div key={ref.id} className="text-[10px] bg-slate-800 p-3 rounded border border-slate-700">
                  <p className="text-yellow-400 font-semibold">{ref.name}</p>
                  <p className="text-slate-400">{ref.position}, {ref.company}</p>
                  <p className="text-slate-500">{ref.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {referencesAvailable && references.length === 0 && (
          <p className="text-[10px] text-slate-500 italic">// References available upon request</p>
        )}
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-16 text-slate-500 p-8">
          <Terminal className="w-10 h-10 mx-auto mb-3" />
          <p className="text-[12px]">$ resume --generate</p>
          <p className="text-[10px] mt-1">Start adding your information...</p>
        </div>
      )}
    </div>
  );
};

export default TechTemplate;
