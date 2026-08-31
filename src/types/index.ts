export type Role = 'SuperAdmin'|'Admin'|'Finance'|'Hod'|'User'|'IT(SAP)'|'StreeingCommittee';
export type User = { id: string; name: string; username: string; email: string; role: Role; department: string; plant: string; designation: string; };
export type Project = { id: string; title: string; plant: string; department: string; owner: string; status: 'Draft'|'Pending'|'Approved'|'In Review'|'Completed'; progress: number; updated: string; type: 'Cost Efficiency'|'Manpower Reduction'; };
