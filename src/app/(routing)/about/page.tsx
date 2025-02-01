'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-6">About Our Project</h1>
      <p className="mt-4 text-lg">
        Welcome to our Budget Tracker App! Our mission is to provide a comprehensive platform to track the allocation and expenditure of government funds across various schemes and projects. Our platform offers interactive maps, detailed data tables, and insightful visualizations to help users understand and analyze the data effectively at each governance level.
      </p>
      <p className="mt-4 text-lg">
        Our app features a user-friendly interface that allows you to easily navigate through different sections such as income, schemes, and projects. With our dynamic map component, you can visualize your financial data in a more interactive way. We have integrated various features such as dynamic routing, data filtering, and interactive maps to enhance the user experience.
      </p>
      <p className="mt-4 text-lg">
        We understand the importance of financial management, and our goal is to provide a comprehensive solution that caters to all your budgeting needs. Our team is dedicated to continuously improving the app and adding new features to enhance your experience.
      </p>
      <p className="mt-4 text-lg">
        We hope that our platform will be a valuable tool for government officials, researchers, and the general public to gain insights into government activities and make informed decisions.
      </p>
      <p className="mt-4 text-lg">
        Thank you for visiting our project. If you have any questions or feedback, please feel free to contact us.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-6">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="glass-card shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Arjit</h3>
          <p className="text-md">UI/UX and Frontend Developer</p>
          <p className="mt-2 text-sm">
            Arjit is responsible for designing the user interface and ensuring a seamless user experience. He also works on the frontend development to bring the designs to life.
          </p>
          <p className="mt-2 text-sm">
            <a href="mailto:kambojarjit@gmail.com" className="text-blue-500">kambojarjit@gmail.com</a>
          </p>
        </div>
        <div className="glass-card shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Utkarsh Swaroop Srivastva</h3>
          <p className="text-md">Backend Developer</p>
          <p className="mt-2 text-sm">
            Utkarsh is our backend expert, handling server-side logic, database management, and API development to ensure the app runs smoothly and efficiently.
          </p>
          <p className="mt-2 text-sm">
            <a href="mailto:utkarshswaroopsri187@gmail.com" className="text-blue-500">utkarshswaroopsri187@gmail.com</a>
          </p>
        </div>
        <div className="glass-card shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Arihant Jain</h3>
          <p className="text-md">Frontend Developer</p>
          <p className="mt-2 text-sm">
            Arihant focuses on frontend development, working closely with Arjit to implement the user interface and enhance the overall user experience.
          </p>
          <p className="mt-2 text-sm">
            <a href="mailto:arihantjaindec2000@gmail.com" className="text-blue-500">arihantjaindec2003@gmail.com</a>
          </p>
        </div>
        <div className=" shadow-md rounded-lg p-6 glass-card">
          <h3 className="text-xl font-semibold mb-2">Ashutosh Kasaudhan</h3>
          <p className="text-md">Backend Developer</p>
          <p className="mt-2 text-sm">
            Ashutosh works alongside Utkarsh on backend development, ensuring the app's server-side operations are robust and scalable.
          </p>
          <p className="mt-2 text-sm">
            <a href="mailto:ashukasaudhan971@gmail.com" className="text-blue-500">ashukasaudhan971@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;