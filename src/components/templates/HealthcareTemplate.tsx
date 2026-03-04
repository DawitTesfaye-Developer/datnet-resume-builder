import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Heart, Award, BookOpen } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const HealthcareTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, certifications } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto">
      {/* Header with medical accent */}
      <header className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8">
        <div className="flex items-center gap-4">
          {personalInfo.photoUrl ? (
            <img src={personalInfo.photoUrl} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white/30" />
          ) : (
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-teal-100 mt-2">
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
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8 bg-teal-50 p-6 rounded-lg border-l-4 border-teal-600">
            <h2 className="text-sm font-bold uppercase text-teal-800 mb-2">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Clinical Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2 border-b-2 border-teal-200 pb-2">
                  <Heart className="w-5 h-5" />
                  Clinical Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-teal-700 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        {exp.location && ` | ${exp.location}`}
                      </p>
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-teal-500 mt-1">●</span>
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
              <section>
                <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2 border-b-2 border-teal-200 pb-2">
                  <BookOpen className="w-5 h-5" />
                  Education & Training
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree} - {edu.field}</h3>
                      <p className="text-teal-700">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{formatDate(edu.endDate)}</p>
                      {edu.achievements.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">{edu.achievements.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills & Competencies */}
            {skills.length > 0 && (
              <section className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-sm font-bold uppercase text-teal-800 mb-3">
                  Clinical Skills
                </h2>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill.id} className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-sm font-bold uppercase text-teal-800 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certifications
                </h2>
                <ul className="space-y-3">
                  {certifications.map((cert) => (
                    <li key={cert.id} className="text-sm">
                      <p className="font-medium text-gray-900">{cert.name}</p>
                      <p className="text-gray-500">{cert.issuer}</p>
                      <p className="text-xs text-gray-400">{cert.date}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Placeholder for certifications */}
            {certifications.length === 0 && (
              <section className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h2 className="text-sm font-bold uppercase text-teal-800 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certifications
                </h2>
                <p className="text-xs text-teal-600">Add your licenses & certifications</p>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-12 text-gray-400 p-8">
          <Heart className="w-12 h-12 mx-auto mb-4 text-teal-300" />
          <p>Your healthcare resume will appear here</p>
        </div>
      )}
    </div>
  );
};

export default HealthcareTemplate;
