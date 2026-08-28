import {
  Atom, Award, BookOpen, Briefcase, Calculator, Calendar, CheckCircle, Compass, Cpu, Dna,
  Eye, FlaskConical, Globe, GraduationCap, Landmark, Languages, Laptop, Layers, Leaf,
  Library, Microscope, Milestone, Monitor, Users, Shield, Sparkles, Sprout, Target,
  TrendingUp,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/**
 * Curated icon registry for admin-selectable icons. Importing the whole
 * lucide-react namespace pulls ~1,500 components into the bundle, so pages
 * resolve names through this map instead.
 */
export const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Atom, Award, BookOpen, Briefcase, Calculator, Calendar, CheckCircle, Compass, Cpu, Dna,
  Eye, FlaskConical, Globe, GraduationCap, Landmark, Languages, Laptop, Layers, Leaf,
  Library, Microscope, Milestone, Monitor, Users, Shield, Sparkles, Sprout, Target,
  TrendingUp,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name?: string | null) {
  return (name && ICONS[name]) || GraduationCap;
}
