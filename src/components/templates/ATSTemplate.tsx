import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

const ATSTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div
      className="bg-white text-black max-w-[8.5in] mx-auto print:shadow-none"
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '11pt',
        lineHeight: '1.4',
        padding: '0.75in',
      }}
    >
      {/* Header - No icons, no graphics, plain text */}
      <header style={{ marginBottom: '16pt', borderBottom: '1pt solid black', paddingBottom: '8pt' }}>
        <h1 style={{ fontSize: '18pt', fontWeight: 'bold', marginBottom: '4pt' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '10pt', color: '#333' }}>
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedIn, personalInfo.portfolio]
            .filter(Boolean)
            .join(' | ')}
        </p>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '10.5pt', color: '#222' }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            Work Experience
          </h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '11pt' }}>{exp.position}</p>
                  <p style={{ fontSize: '10.5pt', color: '#333' }}>{exp.company}{exp.location && `, ${exp.location}`}</p>
                </div>
                <p style={{ fontSize: '10pt', color: '#555', whiteSpace: 'nowrap' }}>
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
              {exp.description && (
                <p style={{ fontSize: '10.5pt', marginTop: '4pt', color: '#333' }}>{exp.description}</p>
              )}
              {exp.achievements.length > 0 && (
                <ul style={{ marginTop: '4pt', paddingLeft: '18pt', listStyleType: 'disc' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: '10.5pt', color: '#222', marginBottom: '2pt' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '11pt' }}>{edu.degree} in {edu.field}</p>
                  <p style={{ fontSize: '10.5pt', color: '#333' }}>{edu.institution}{edu.location && `, ${edu.location}`}</p>
                </div>
                <p style={{ fontSize: '10pt', color: '#555' }}>{formatDate(edu.endDate)}</p>
              </div>
              {edu.gpa && <p style={{ fontSize: '10pt', color: '#444' }}>GPA: {edu.gpa}</p>}
              {edu.achievements.length > 0 && (
                <p style={{ fontSize: '10pt', color: '#444', marginTop: '2pt' }}>{edu.achievements.join('; ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills - Plain comma-separated list (ATS-friendly) */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            Skills
          </h2>
          <p style={{ fontSize: '10.5pt', color: '#222' }}>
            {skills.map(s => s.name).join(', ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            Certifications
          </h2>
          {certifications.map((cert) => (
            <p key={cert.id} style={{ fontSize: '10.5pt', marginBottom: '2pt' }}>
              <span style={{ fontWeight: 'bold' }}>{cert.name}</span> — {cert.issuer}, {cert.date}
            </p>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '8pt' }}>
              <p style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                {project.name}
                {project.link && <span style={{ fontWeight: 'normal', fontSize: '10pt', color: '#555' }}> ({project.link})</span>}
              </p>
              <p style={{ fontSize: '10.5pt', color: '#333' }}>{project.description}</p>
              {project.technologies.length > 0 && (
                <p style={{ fontSize: '10pt', color: '#444' }}>Technologies: {project.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            Languages
          </h2>
          <p style={{ fontSize: '10.5pt' }}>
            {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
          </p>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section style={{ marginBottom: '14pt' }}>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1pt solid #666', paddingBottom: '2pt', marginBottom: '6pt' }}>
            References
          </h2>
          {references.map((ref) => (
            <p key={ref.id} style={{ fontSize: '10.5pt', marginBottom: '4pt' }}>
              <span style={{ fontWeight: 'bold' }}>{ref.name}</span> — {ref.position}, {ref.company}
              {ref.email && ` | ${ref.email}`}
              {ref.phone && ` | ${ref.phone}`}
            </p>
          ))}
        </section>
      )}
      {referencesAvailable && references.length === 0 && (
        <p style={{ fontSize: '10pt', fontStyle: 'italic', color: '#555' }}>References available upon request</p>
      )}

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48pt 0', color: '#999' }}>
          <p style={{ fontSize: '12pt' }}>ATS-optimized resume preview</p>
          <p style={{ fontSize: '10pt', marginTop: '4pt' }}>No graphics, no icons — maximum ATS compatibility</p>
        </div>
      )}
    </div>
  );
};

export default ATSTemplate;
