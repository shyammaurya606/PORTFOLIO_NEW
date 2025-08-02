import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DivideIcon as LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  icon?: string;
}

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const IconComponent = skill.icon && (Icons as any)[skill.icon] as LucideIcon;

  return (
    <Card className="card-glow transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
          <h3 className="font-semibold">{skill.name}</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Proficiency</span>
            <span>{skill.level}%</span>
          </div>
          <Progress value={skill.level} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}