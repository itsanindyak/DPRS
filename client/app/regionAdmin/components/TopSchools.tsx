import React from 'react';
import './regionAdminStyles.css';
interface School {
  name: string;
  type: string;
  score: number;
  students: number;
}

export default function TopSchools() {
  const schools: School[] = [
    { name: 'Greenwood High School', type: 'Private', score: 8.9, students: 450 },
    { name: 'Delhi Public School', type: 'Private', score: 8.7, students: 680 },
    { name: 'St. Mary\'s School', type: 'Aided', score: 8.5, students: 320 },
    { name: 'Modern School', type: 'Private', score: 8.3, students: 520 },
    { name: 'Government High School', type: 'Government', score: 8.1, students: 380 }
  ];

  return (
    <div className="card">
      <h2>Top Schools</h2>
      <p className="regional-subtitle">
        Institutional performance rankings
      </p>

      <div className="regional-schools-list">
        {schools.map((school, index) => (
          <div key={index} className="regional-item">
            <div>
              <div className="regional-name">{school.name}</div>
              <div className="regional-school-meta">
                <span className={`regional-school-type ${school.type.toLowerCase()}`}>
                  {school.type}
                </span>
                <span className="regional-school-students">
                  {school.students} students
                </span>
              </div>
            </div>
            <div className="regional-score">
              {school.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}