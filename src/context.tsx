import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Role, User } from '@/types';
import { demoUser } from '@/constants';

type AuthContextValue = { user: User|null; role: Role|null; isAuthenticated: boolean; isLoading: boolean; login: (username:string,password:string)=>Promise<void>; logout:()=>Promise<void>; };
const AuthContext = createContext<AuthContextValue|null>(null);
export function AuthProvider({children}:{children:ReactNode}) { const [user,setUser]=useState<User|null>(()=>{const raw=localStorage.getItem('cie-user');return raw?JSON.parse(raw) as User:null}); const [isLoading,setIsLoading]=useState(false); const login=async(username:string,password:string)=>{setIsLoading(true);await new Promise(r=>setTimeout(r,650)); if(!username||!password) {setIsLoading(false);throw new Error('Enter your username and password.');} const next={...demoUser,username,email:username.includes('@')?username:`${username}@cie.example`};setUser(next);localStorage.setItem('cie-user',JSON.stringify(next));setIsLoading(false)}; const logout=async()=>{setIsLoading(true);await new Promise(r=>setTimeout(r,350));setUser(null);localStorage.removeItem('cie-user');setIsLoading(false)}; useEffect(()=>{document.documentElement.classList.toggle('dark',localStorage.getItem('cie-theme')==='dark')},[]); const value=useMemo(()=>({user,role:user?.role??null,isAuthenticated:!!user,isLoading,login,logout}),[user,isLoading]); return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; }
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value;}

type Theme='light'|'dark'|'system';
const ThemeContext=createContext<{theme:Theme;setTheme:(theme:Theme)=>void}>({theme:'light',setTheme:()=>undefined});
export function ThemeProvider({children}:{children:ReactNode}){const [theme,setThemeState]=useState<Theme>(()=>(localStorage.getItem('cie-theme') as Theme)||'light');const setTheme=(next:Theme)=>{setThemeState(next);localStorage.setItem('cie-theme',next);const dark=next==='dark'||(next==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark)};useEffect(()=>setTheme(theme),[]);return <ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>}
export const useTheme=()=>useContext(ThemeContext);
const PauseContext=createContext<{paused:boolean;setPaused:(paused:boolean)=>void}>({paused:false,setPaused:()=>undefined});
export function PauseProvider({children}:{children:ReactNode}){const [paused,setPaused]=useState(false);return <PauseContext.Provider value={{paused,setPaused}}>{children}</PauseContext.Provider>}
export const usePause=()=>useContext(PauseContext);
