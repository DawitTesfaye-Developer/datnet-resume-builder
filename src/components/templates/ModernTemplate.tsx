import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto overflow-hidden">
      {/* Header with accent */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-blue-100">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              {personalInfo.linkedIn}
            </span>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <p className="text-gray-600 leading-relaxed text-lg border-l-4 border-blue-600 pl-4">
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-1 bg-blue-600"></div>
                  Experience
                </h2>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                      <div className="absolute -left-1.5 top-1 w-3 h-3 bg-blue-600 rounded-full"></div>
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-700 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">▸</span>
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

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-1 bg-blue-600"></div>
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-blue-800 mb-3">Skills</h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ 
                            width: skill.level === 'expert' ? '100%' : 
                                   skill.level === 'advanced' ? '80%' : 
                                   skill.level === 'intermediate' ? '60%' : '40%' 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-blue-800 mb-3">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.field}</p>
                      <p className="text-xs text-gray-500">{edu.institution}</p>
                      <p className="text-xs text-gray-400">{formatDate(edu.endDate)}</p>
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
        <div className="text-center py-12 text-gray-400 p-8">
          <p>Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
