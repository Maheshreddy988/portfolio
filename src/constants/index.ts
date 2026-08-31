import type { Role, Project, User } from '@/types';
import { LayoutDashboard, Factory, FolderKanban, Building2, Users, Tags, ScrollText, Settings, FileCheck2, BarChart3, ClipboardList, BriefcaseBusiness, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const demoUser: User = { id:'u-1', name:'Demo User', username:'demo.user', email:'demo@cie.example', role:'SuperAdmin', department:'Continuous Improvement', plant:'Corporate', designation:'System Administrator' };
export const roles: Role[] = ['SuperAdmin','Admin','Finance','Hod','User','IT(SAP)','StreeingCommittee'];
export const navByRole: Record<Role,{label:string;path:string;icon:LucideIcon}[]> = {
 SuperAdmin:[{label:'Dashboard',path:'/SuperAdmin/Dashboard',icon:LayoutDashboard},{label:'Plants',path:'/SuperAdmin/Plant',icon:Factory},{label:'Projects',path:'/SuperAdmin/Projects',icon:FolderKanban},{label:'Department',path:'/SuperAdmin/Departments',icon:Building2},{label:'Users',path:'/SuperAdmin/Users',icon:Users},{label:'Category',path:'/SuperAdmin/Category',icon:Tags},{label:'Logs',path:'/SuperAdmin/Logs',icon:ScrollText},{label:'Settings',path:'/SuperAdmin/Settings',icon:Settings}],
 Admin:[{label:'Dashboard',path:'/Admin/Dashboard',icon:LayoutDashboard},{label:'Projects',path:'/Admin/Projects',icon:FolderKanban},{label:'Users',path:'/Admin/Users',icon:Users},{label:'Reports',path:'/Admin/Reports',icon:BarChart3}],
 Finance:[{label:'Dashboard',path:'/Finance/Dashboard',icon:LayoutDashboard},{label:'Validation',path:'/Finance/Validation',icon:FileCheck2},{label:'Reports',path:'/Finance/Reports',icon:BarChart3}],
 Hod:[{label:'Dashboard',path:'/HOD/Dashboard',icon:LayoutDashboard},{label:'Projects',path:'/HOD/Department_Projects',icon:FolderKanban}],
 User:[{label:'Dashboard',path:'/User/Dashboard',icon:LayoutDashboard},{label:"Project's",path:'/User/Projects',icon:FolderKanban}],
 'IT(SAP)':[ {label:'Dashboard',path:'/IT/Dashboard',icon:LayoutDashboard},{label:'Project_Review',path:'/IT/Project_Review',icon:ClipboardList}],
 StreeingCommittee:[{label:'Dashboard',path:'/StreeingCommittee/Dashboard',icon:LayoutDashboard},{label:'Project Approval',path:'/StreeingCommittee/Projects',icon:ShieldCheck},{label:'Manpower Categories',path:'/StreeingCommittee/Manpower',icon:BriefcaseBusiness}],
};
export const demoProjects: Project[] = [
 {id:'CIE-2401',title:'Reduce changeover time on Line 4',plant:'Pune Plant',department:'Production',owner:'Aarav Mehta',status:'Approved',progress:86,updated:'Today, 09:42',type:'Cost Efficiency'},
 {id:'CIE-2398',title:'Optimize packaging material usage',plant:'Chennai Plant',department:'Operations',owner:'Nisha Rao',status:'In Review',progress:64,updated:'Yesterday',type:'Cost Efficiency'},
 {id:'CIE-2392',title:'Cross-train maintenance operators',plant:'Pune Plant',department:'Maintenance',owner:'Vikram Singh',status:'Pending',progress:28,updated:'12 Aug 2024',type:'Manpower Reduction'},
 {id:'CIE-2387',title:'Digitalize quality inspection checklist',plant:'Gurugram Plant',department:'Quality',owner:'Rhea Kapoor',status:'Completed',progress:100,updated:'09 Aug 2024',type:'Manpower Reduction'},
];
