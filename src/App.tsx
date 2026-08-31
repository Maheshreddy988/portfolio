import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticatedLayout } from '@/layout';
import { useAuth, AuthProvider, ThemeProvider, PauseProvider } from '@/context';
import { Login, SignUp, ForgotPassword, ResetPassword, Verify, Dashboard, Projects, ProjectDetail, GenericPage } from '@/pages';

function Protected(){const {isAuthenticated,isLoading}=useAuth();if(isLoading)return <div className="grid min-h-screen place-items-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"/></div>;return isAuthenticated?<AuthenticatedLayout/>:<Navigate to="/" replace/>}
function RoleHome(){const {user}=useAuth();return <Navigate to={user?`/${user.role}/Dashboard`:'/'} replace/>}
function AppRoutes(){return <Routes><Route path="/" element={<Login/>}/><Route path="/Login" element={<Login/>}/><Route path="/SignUp" element={<SignUp/>}/><Route path="/ForgotPassword" element={<ForgotPassword/>}/><Route path="/ResetPassword/:email" element={<ResetPassword/>}/><Route path="/verify/:username" element={<Verify/>}/><Route path="/verifycation/:Email" element={<Verify/>}/><Route element={<Protected/>}><Route path="/" element={<RoleHome/>}/><Route path="/:role/Dashboard" element={<Dashboard/>}/><Route path="/SuperAdmin/Projects" element={<Projects/>}/><Route path="/SuperAdmin/Projects/:projectId" element={<ProjectDetail/>}/><Route path="/Admin/Projects/:projectId" element={<ProjectDetail/>}/><Route path="/:role/*" element={<GenericPage/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
export default function App(){return <ThemeProvider><AuthProvider><PauseProvider><AppRoutes/></PauseProvider></AuthProvider></ThemeProvider>}
