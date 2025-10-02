import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project: locationProject } = location.state || {};
  
  // Check for project data in sessionStorage if not passed via location.state
  const sessionProject = sessionStorage.getItem('selectedProject');
  const project = locationProject || (sessionProject ? JSON.parse(sessionProject) : null);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Project not found</div>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
        </div>

        {/* Project Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            {project.title}
          </h1>
        </div>

        {/* Project Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="mb-8 text-center">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="max-w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          )}

          {/* Project Description */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-white"
              style={{
                lineHeight: '1.5',
                fontSize: '18px',
                textAlign: 'justify',
                fontFamily: '"Barlow", "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
              }}
              dangerouslySetInnerHTML={{ 
                __html: project.text
                  .replace(/<br\s*\/?>/gi, '')
                  .replace(/\n/g, '')
                  .replace(/<p>/g, '<p style="margin: 0 0 1rem 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                  .replace(/<h1>/g, '<h1 style="font-size: 1.8rem; font-weight: 600; margin: 1rem 0 0 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif;">')
                  .replace(/<h2>/g, '<h2 style="font-size: 1.6rem; font-weight: 600; margin: 1rem 0 0 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif;">')
                  .replace(/<h3>/g, '<h3 style="font-size: 1.4rem; font-weight: 600; margin: 1rem 0 0 0; padding: 0; color: white; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif;">')
                  .replace(/<ul>/g, '<ul style="margin: 0; padding: 0 0 0 1.5rem; color: white; list-style-type: disc; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                  .replace(/<ol>/g, '<ol style="margin: 0; padding: 0 0 0 1.5rem; color: white; list-style-type: decimal; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                  .replace(/<li>/g, '<li style="margin: 0; padding: 0; color: white; display: list-item; text-align: justify; font-family: \'Barlow\', \'Inter\', \'Segoe UI\', \'Roboto\', \'Helvetica Neue\', Arial, sans-serif; font-size: 18px;">')
                  .replace(/<strong>/g, '<strong style="color: white;">')
                  .replace(/<em>/g, '<em style="color: white;">')
                  .replace(/<u>/g, '<u style="color: white;">')
                  .replace(/<a[^>]*>/g, '<a style="color: #60a5fa; text-decoration: underline;">')
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {/* GitHub Link */}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 border border-transparent hover:border-blue-400"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            )}

            {/* Documentation Link */}
            {project.documentationLink && (
              <a
                href={project.documentationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 border border-transparent hover:border-green-400"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Documentation
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
