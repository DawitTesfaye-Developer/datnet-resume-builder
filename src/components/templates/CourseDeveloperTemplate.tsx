import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, BookOpen, Monitor, Layers, Award, Users, Lightbulb } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const CourseDeveloperTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Categorize skills for specialized sections
  const lmsSkills = skills.filter(s => 
    s.name.toLowerCase().includes('lms') || 
    s.name.toLowerCase().includes('moodle') || 
    s.name.toLowerCase().includes('canvas') ||
    s.name.toLowerCase().includes('blackboard') ||
    s.name.toLowerCase().includes('articulate') ||
    s.name.toLowerCase().includes('storyline') ||
    s.name.toLowerCase().includes('captivate') ||
    s.name.toLowerCase().includes('rise') ||
    s.name.toLowerCase().includes('scorm')
  );

  const methodologySkills = skills.filter(s => 
    s.name.toLowerCase().includes('addie') || 
    s.name.toLowerCase().includes('sam') || 
    s.name.toLowerCase().includes('agile') ||
    s.name.toLowerCase().includes('bloom') ||
    s.name.toLowerCase().includes('kirkpatrick') ||
    s.name.toLowerCase().includes('backward design') ||
    s.name.toLowerCase().includes('ux') ||
    s.name.toLowerCase().includes('accessibility')
  );

  const otherSkills = skills.filter(s => 
    !lmsSkills.includes(s) && !methodologySkills.includes(s)
  );

  return (
    <div className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto" style={{ fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <div className="flex items-center gap-5">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-white/30" />
          )}
          <div>
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-indigo-100 text-lg mb-4">Instructional Designer & Course Developer</p>
        <div className="flex flex-wrap gap-4 text-sm text-indigo-100">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-4 h-4" />
              {personalInfo.linkedIn}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-indigo-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
              <Lightbulb className="w-5 h-5" />
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="col-span-2 space-y-8">
            {/* Courses Developed / Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <BookOpen className="w-5 h-5" />
                  Courses Developed
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border-l-4 border-indigo-200 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(project.startDate)}{project.endDate && ` – ${formatDate(project.endDate)}`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a href={project.link} className="text-sm text-indigo-600 hover:underline mt-1 inline-block">
                          View Course →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Professional Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <Users className="w-5 h-5" />
                  Professional Experience
                </h2>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-indigo-600">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                        </div>
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                      )}
                      {exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-indigo-400 mt-1">▸</span>
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
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* LMS Expertise */}
            {(lmsSkills.length > 0 || skills.length > 0) && (
              <section className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Monitor className="w-4 h-4" />
                  LMS & Authoring Tools
                </h2>
                <div className="space-y-2">
                  {(lmsSkills.length > 0 ? lmsSkills : skills.slice(0, 6)).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{skill.name}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= (skill.level === 'expert' ? 4 : skill.level === 'advanced' ? 3 : skill.level === 'intermediate' ? 2 : 1)
                                ? 'bg-indigo-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Instructional Design Methodologies */}
            {(methodologySkills.length > 0 || skills.length > 3) && (
              <section className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Layers className="w-4 h-4" />
                  ID Methodologies
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {(methodologySkills.length > 0 ? methodologySkills : skills.slice(0, 5)).map((skill) => (
                    <span 
                      key={skill.id}
                      className="px-2 py-1 bg-white border border-indigo-200 text-indigo-700 text-xs rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Other Skills */}
            {otherSkills.length > 0 && (
              <section className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-sm font-bold text-indigo-700 mb-3 uppercase tracking-wide">
                  Additional Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {otherSkills.map((skill) => (
                    <span 
                      key={skill.id}
                      className="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Award className="w-4 h-4" />
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="text-sm font-medium text-gray-800">{cert.name}</p>
                      <p className="text-xs text-gray-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-sm font-bold text-indigo-700 mb-3 uppercase tracking-wide">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-sm font-medium text-gray-800">{edu.degree}</p>
                      <p className="text-xs text-gray-600">{edu.field}</p>
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
      {!personalInfo.fullName && experiences.length === 0 && projects.length === 0 && (
        <div className="text-center py-12 text-gray-400 p-8">
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <p>Your course developer resume will appear here</p>
        </div>
      )}
    </div>
  );
};

export default CourseDeveloperTemplate;
