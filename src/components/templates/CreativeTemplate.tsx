import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Palette } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto overflow-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-pink-500 text-white p-6">
          {/* Profile */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">
                {personalInfo.fullName?.split(' ').map(n => n[0]).join('') || '?'}
              </span>
            </div>
            <h1 className="text-xl font-bold text-center mb-4">
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <div className="space-y-3 mb-8">
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center gap-2 text-sm">
                <Linkedin className="w-4 h-4" />
                <span className="break-all">{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4" />
                <span className="break-all">{personalInfo.portfolio}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-2 py-1 bg-white/20 rounded-full text-xs"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-white/80">{edu.field}</p>
                    <p className="text-white/60 text-xs">{edu.institution}</p>
                    <p className="text-white/60 text-xs">{formatDate(edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-purple-600 mb-3 uppercase tracking-wide">
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-purple-600 mb-4 uppercase tracking-wide">
                Experience
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-gradient-to-r before:from-purple-600 before:to-pink-500 before:rounded-full">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-purple-600 font-medium text-sm">{exp.company}</p>
                    <p className="text-xs text-gray-400 mb-2">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                    {exp.achievements.length > 0 && (
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {achievement}</li>
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
              <h2 className="text-lg font-bold text-purple-600 mb-4 uppercase tracking-wide">
                Projects
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="border border-purple-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
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
        </div>
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-12 text-gray-400 p-8">
          <p>Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default CreativeTemplate;
