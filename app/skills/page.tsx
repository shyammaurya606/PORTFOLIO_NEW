import { SkillBadge } from '@/components/skill-badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'My technical skills and expertise in web development',
};

// Mock skills data - replace with actual API call when database is available
const mockSkills = [
  {
    id: '21',
    name: 'Data Structures & Algorithms',
    level: 92,
    icon: 'List'
},
{
    id: '22',
    name: 'Problem Solving (LeetCode/codeChef)',
    level: 90,
    icon: 'Activity'
},
{
    id: '23',
    name: 'Object-Oriented Programming (OOP)',
    level: 95,
    icon: 'Layers'
},
{
    id: '16',
    name: 'Research and Development ',
    level: 80,
    icon: 'Shuffle'
},
{
    id: '2',
    name: 'JavaScript',
    level: 90,
    icon: 'Code2'
},
{
    id: '3',
    name: 'React',
    level: 92,
    icon: 'Atom'
},
{
    id: '4',
    name: 'Express.js',
    level: 88,
    icon: 'Zap'
},
{
    id: '5',
    name: 'Node.js',
    level: 85,
    icon: 'Server'
},
{
    id: '12',
    name: 'Firebase',
    level: 70,
    icon: 'Cloud'
},
{
    id: '6',
    name: 'MySQL',
    level: 80,
    icon: 'Database'
},
{
    id: '11',
    name: 'MongoDB',
    level: 78,
    icon: 'Database'
},
{
    id: '12',
    name: 'AWS',
    level: 70,
    icon: 'Cloud'
},
{
    id: '7',
    name: 'Tailwind CSS',
    level: 90,
    icon: 'Palette'
},
{
    id: '9',
    name: 'Git & Github',
    level: 88,
    icon: 'GitBranch'
},
{
    id: '10',
    name: 'Python',
    level: 82,
    icon: 'FileCode'
},
{
    id: '14',
    name: 'Express.js',
    level: 84,
    icon: 'Server'
},
{
    id: '19',
    name: 'kali Linux',
    level: 82,
    icon: 'Terminal'
},
{
    id: '25',
    name: 'Cybersecurity Basics ',
    level: 75,
    icon: 'Shield'
},
{
    id: '26',
    name: 'Network Security (Firewalls, VPN)',
    level: 72,
    icon: 'Lock'
},
{
    id: '27',
    name: 'Footprinting with NMAP',
    level: 60,
    icon: 'Target'
},
{
    id: '30',
    name: 'TOR',
    level: 70,
    icon: 'ShieldCheck'
},
 
 

];

export default function SkillsPage() {
  const skills = mockSkills;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Skills & Expertise</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Here are the technologies and tools I work with to create amazing digital experiences.
        </p>
      </div>

      {skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill: any) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No skills found.</p>
        </div>
      )}
    </div>
  );
}