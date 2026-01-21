import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, GraduationCap, BookOpen, Award, FileText } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const AcademicTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, publications, projects } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto p-10" style={{ fontFamily: 'Palatino Linotype, Book Antiqua, serif' }}>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-1">
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.portfolio && <span>| {personalInfo.portfolio}</span>}
          </div>
        )}
      </header>

      {/* Research Interests / Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Research Interests
          </h2>
          <p className="text-gray-700 leading-relaxed pl-7">{personalInfo.summary}</p>
        </section>
      )}

      {/* Education - Primary for Academic CV */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h2>
          <div className="space-y-4 pl-7">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                  </div>
                  <span className="text-gray-500">{formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                {edu.achievements.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="italic">Honors:</span> {edu.achievements.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Publications
          </h2>
          <ol className="space-y-2 pl-7 list-decimal list-inside">
            {publications.map((pub) => (
              <li key={pub.id} className="text-sm text-gray-700">
                <span className="font-medium">{pub.title}</span>. 
                <span className="italic"> {pub.publisher}</span>, {pub.date}.
                {pub.link && <span className="text-blue-600"> [{pub.link}]</span>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Research Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Research & Teaching Experience
          </h2>
          <div className="space-y-4 pl-7">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-gray-600 pl-4 relative before:content-['•'] before:absolute before:left-0">
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

      {/* Research Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Research Projects</h2>
          <div className="space-y-3 pl-7">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Technical Skills & Languages</h2>
          <p className="text-sm text-gray-700 pl-7">
            {skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && education.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <GraduationCap className="w-12 h-12 mx-auto mb-4" />
          <p>Your academic CV will appear here</p>
        </div>
      )}
    </div>
  );
};

export default AcademicTemplate;
