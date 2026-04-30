/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Phone, 
  Settings, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Eye,
  EyeOff,
  Save,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MAX_CAPACITY = 10;

const SCHEDULE_DATA = [
  { date: "5/16(토)", times: ["14:00", "16:00", "18:00", "20:00"] },
  { date: "5/17(일)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/18(월)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/19(화)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/20(수)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/21(목)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/22(금)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/23(토)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/24(일)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/25(월)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/26(화)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/27(수)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/28(목)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  { date: "5/29(금)", times: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
];

export default function App() {
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("reservationCounts");
    return saved ? JSON.parse(saved) : {};
  });
  const [phone, setPhone] = useState(() => localStorage.getItem("reservePhone") || "02-123-4567");
  const [tempPhone, setTempPhone] = useState(phone);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    localStorage.setItem("reservationCounts", JSON.stringify(counts));
  }, [counts]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUpdateCount = (key: string, value: number) => {
    const newVal = Math.max(0, Math.min(MAX_CAPACITY, value));
    setCounts(prev => ({ ...prev, [key]: newVal }));
  };

  const handleSavePhone = () => {
    setPhone(tempPhone);
    localStorage.setItem("reservePhone", tempPhone);
  };

  const getStatus = (count: number) => {
    if (count >= MAX_CAPACITY) return { text: "마감", cls: "bg-red-500/10 text-red-300 border border-red-500/20", icon: <XCircle className="w-2.5 h-2.5 mr-1" /> };
    if (count >= 7) return { text: "마감임박", cls: "bg-amber-500/10 text-amber-300 border border-amber-500/20", icon: <AlertCircle className="w-2.5 h-2.5 mr-1" /> };
    return { text: "예약가능", cls: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20", icon: <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> };
  };

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-[440px] mx-auto min-h-screen pb-40 px-4 pt-16 font-sans select-none">
      {/* Fixed Sticky Header */}
      <motion.div 
        animate={{ 
          backgroundColor: scrolled ? "rgba(10, 5, 20, 0.9)" : "rgba(10, 5, 20, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          borderBottomWidth: scrolled ? 1 : 0
        }}
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-white/5 pointer-events-none"
      >
        <div className="max-w-[440px] w-full mx-auto flex items-center justify-between pointer-events-auto">
          <AnimatePresence>
            {scrolled && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[10px] font-black tracking-widest text-brand-gold uppercase"
              >
                ACRO APGUJEONG
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="ml-auto w-10 h-10 rounded-full flex items-center justify-center text-white/40 active:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Main Branding Section */}
      <motion.header 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 mb-8 text-center relative mt-4"
      >
        <div className="text-brand-primary text-[11px] font-black tracking-[0.4em] uppercase mb-5 opacity-60">
          ACRO APGUJEONG
        </div>
        <h1 className="text-3xl font-black leading-[1.1] mb-3 tracking-tighter">
          압구정5구역<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#fff] to-brand-gold drop-shadow-[0_2px_15px_rgba(242,220,155,0.3)]">
            아크로 압구정
          </span>
        </h1>
        <p className="text-white/50 text-xs sm:text-sm font-medium tracking-tight mb-8 leading-relaxed">
          홍보관 방문 예약 현황을<br className="xs:hidden" /> 실시간으로 확인하실 수 있습니다
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-black tracking-[0.25em] text-brand-gold uppercase shadow-[0_0_25px_rgba(242,220,155,0.08)]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          THE BEST or NOTHING
        </div>
      </motion.header>

      {/* Capacity Info Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-[2rem] bg-white/[0.04] border border-white/[0.05] mb-10 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0">
          <Info className="w-5 h-5 text-brand-primary" />
        </div>
        <div className="text-xs leading-[1.6] text-white/50">
          회차별 정원은 <b className="text-brand-gold font-bold">{MAX_CAPACITY}명</b>으로 제한됩니다.<br />
          정원에 따라 <span className="text-emerald-300 font-bold">원활</span> · <span className="text-amber-300 font-bold">임박</span> · <span className="text-red-400 font-bold">마감</span> 상태가 실시간 반영됩니다.
        </div>
      </motion.div>

      {/* Admin Panel (Modal Style) */}
      <AnimatePresence>
        {showAdminPanel && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminPanel(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] p-6"
            >
              <div className="max-w-[440px] mx-auto glass-card bg-bg-deep border-white/10 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3 text-brand-primary">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-black uppercase tracking-widest">Admin Settings</span>
                  </div>
                  <button onClick={() => setShowAdminPanel(false)} className="text-white/40 p-2">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-white/30 mb-3 ml-1 tracking-widest">Master Phone Number</label>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        placeholder="예: 02-123-4567"
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary/50"
                      />
                      <button 
                        onClick={() => { handleSavePhone(); setShowAdminPanel(false); }}
                        className="w-14 bg-brand-primary text-bg-deep rounded-2xl flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsAdmin(!isAdmin)}
                    className={`w-full py-5 rounded-2xl border flex items-center justify-center gap-3 font-black text-xs tracking-widest uppercase transition-all ${
                      isAdmin 
                      ? "bg-brand-primary text-bg-deep border-brand-primary" 
                      : "bg-white/5 border-white/10 text-white/40"
                    }`}
                  >
                    {isAdmin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {isAdmin ? "Exit Edit Mode" : "Enter Edit Mode"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Schedule List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {SCHEDULE_DATA.map((day, dayIdx) => (
          <motion.section 
            key={day.date}
            variants={itemVariants}
            className="glass-card p-8 group transition-all"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-[1.2rem] bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">{day.date}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Standard Operation</p>
              </div>
            </div>

            <div className="grid gap-3">
              {day.times.map((time) => {
                const key = `${day.date}-${time}`;
                const count = counts[key] || 0;
                const status = getStatus(count);

                return (
                  <div 
                    key={time}
                    className={`flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-500 ${
                      count >= MAX_CAPACITY 
                      ? "bg-black/40 border-white/5 grayscale pointer-events-none opacity-40" 
                      : "bg-white/[0.04] border-white/[0.04] hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
                      <span className="font-extrabold text-xl tabular-nums tracking-tighter">{time}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`status-badge ${status.cls}`}>
                        {status.icon}
                        {status.text}
                      </span>
                      
                      {isAdmin && (
                        <div className="flex items-center bg-black/40 rounded-xl border border-brand-primary/20 p-1">
                          <input 
                            type="number"
                            min="0"
                            max={MAX_CAPACITY}
                            value={count}
                            onChange={(e) => handleUpdateCount(key, parseInt(e.target.value) || 0)}
                            className="w-10 h-8 bg-transparent text-center font-black text-sm focus:outline-none text-brand-primary"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </motion.div>

      {/* Mobile-Centric Floating Button Container */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6 pb-[calc(1.5rem+var(--sab))] pointer-events-none">
        <div className="max-w-[440px] mx-auto pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCall}
            className="w-full btn-luxury h-16 flex items-center justify-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-active:scale-95 transition-transform">
              <Phone className="w-5 h-5 text-bg-deep fill-current" />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">Reservation</span>
          </motion.button>
          <div className="mt-4 flex flex-col items-center gap-1">
             <div className="w-12 h-1 rounded-full bg-white/10" />
             <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
               Acro Apgujeong Luxury Concierge
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
