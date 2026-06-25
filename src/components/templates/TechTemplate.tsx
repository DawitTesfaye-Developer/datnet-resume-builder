import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Code, Terminal } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const TechTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-slate-900 text-slate-100 shadow-xl max-w-[8.5in] mx-auto font-mono">
      {/* Header */}
      <header className="p-8 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="w-6 h-6 text-green-400" />
          <span className="text-green-400">~</span>
          <h1 className="text-2xl font-bold">
            {personalInfo.fullName || 'Your Name'}
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-cyan-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-cyan-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-cyan-400" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-4 h-4 text-cyan-400" />
              {personalInfo.linkedIn}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-cyan-400" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">{"/**"}</span>
            </div>
            <p className="text-slate-300 pl-4 border-l-2 border-slate-700">
              {personalInfo.summary}
            </p>
            <span className="text-yellow-400">{" **/"}</span>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" />
              tech_stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-green-400"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-cyan-400 mb-4">
              work_experience<span className="text-slate-500">()</span>
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="text-slate-600 text-sm w-8">{String(index + 1).padStart(2, '0')}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400">const</span>
                        <span className="text-yellow-400">{exp.position.replace(/\s+/g, '_')}</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-green-400">"{exp.company}"</span>
                      </div>
                      <p className="text-slate-500 text-sm mt-1">
                        // {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                      {exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1 pl-4">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-slate-300 before:content-['→'] before:text-cyan-400 before:mr-2">
                              {achievement}
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
          <section className="mb-8">
            <h2 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Github className="w-5 h-5" />
              projects
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-yellow-400 font-bold">{project.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs text-cyan-400">
                          #{tech}
                        </span>
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
            <h2 className="text-lg font-bold text-cyan-400 mb-4">
              education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center gap-2 text-sm">
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
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-12 text-slate-500 p-8">
          <Terminal className="w-12 h-12 mx-auto mb-4" />
          <p>$ resume --generate</p>
          <p className="text-sm">Start adding your information...</p>
        </div>
      )}
    </div>
  );
};

export default TechTemplate;
