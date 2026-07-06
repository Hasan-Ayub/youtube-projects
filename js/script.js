// Apply GradualBlur to the project list section
const projectSection = document.getElementById('projects');
const blur = new GradualBlur(projectSection, {
  position: 'bottom',
  height: '6rem',
  strength: 2,
  divCount: 6,
  curve: 'bezier',
  exponential: true,
  opacity: 1,
  zIndex: 10
});

// Sample project data
const projects = [
  {
    title: 'Project Alpha',
    desc: 'A full-stack web application built with React and Node.js.',
    tags: ['React', 'Node.js', 'MongoDB'],
    url: '#'
  },
  {
    title: 'Project Beta',
    desc: 'Real-time chat application using WebSockets and Express.',
    tags: ['WebSocket', 'Express', 'Socket.io'],
    url: '#'
  },
  {
    title: 'Project Gamma',
    desc: 'CLI tool for automating deployment workflows.',
    tags: ['Python', 'CLI', 'Docker'],
    url: '#'
  },
  {
    title: 'Project Delta',
    desc: 'Mobile-first dashboard with data visualization.',
    tags: ['D3.js', 'React Native', 'Firebase'],
    url: '#'
  },
  {
    title: 'Project Epsilon',
    desc: 'Machine learning model for image classification.',
    tags: ['Python', 'TensorFlow', 'Flask'],
    url: '#'
  },
  {
    title: 'Project Zeta',
    desc: 'Serverless API for managing microservices.',
    tags: ['AWS Lambda', 'API Gateway', 'DynamoDB'],
    url: '#'
  }
];

const projectList = document.getElementById('project-list');
projectList.innerHTML = '';

projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'project-card';

  const title = document.createElement('h3');
  title.textContent = project.title;
  card.appendChild(title);

  const desc = document.createElement('p');
  desc.textContent = project.desc;
  card.appendChild(desc);

  const tags = document.createElement('div');
  tags.className = 'tags';
  project.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tags.appendChild(span);
  });
  card.appendChild(tags);

  const link = document.createElement('a');
  link.className = 'project-link';
  link.href = project.url;
  link.textContent = 'View project →';
  card.appendChild(link);

  projectList.appendChild(card);
});

// GlassIcons
const glassContainer = document.getElementById('glass-icons');
new GlassIcons(glassContainer, [
  { icon: 'code', color: 'blue', label: 'Projects' },
  { icon: 'book', color: 'purple', label: 'Tutorials' },
  { icon: 'heart', color: 'red', label: 'Health' },
  { icon: 'cloud', color: 'indigo', label: 'Weather' },
  { icon: 'edit', color: 'orange', label: 'Notes' },
  { icon: 'barChart', color: 'green', label: 'Stats' }
]);
