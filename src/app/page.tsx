"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboard } from "@/features/dashboard/dashboardSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  DollarSign,
  FileText,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import StatSkeleton from "@/components/StatSkeleton";
import NumberCounter from "@/components/NumberCounter";
import Header from "./components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const icons = { DollarSign, FileText, Users, Activity };

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { stats, doctorStats, status, announcements } = useAppSelector(
    (s) => s.dashboard
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchDashboard());
  }, [status, dispatch]);

  const loading = status === "loading";

  const colorMap: Record<string, string> = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
    red: "border-red-500",
  };

  const [hoveredDoctor, setHoveredDoctor] = useState<any | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <Header />
      <div className=" bg-slate-100 ">
        <div className="bg-slate-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                Xoş gəldin, Mega Soft!
              </h1>
              <p className="text-slate-600 text-sm">Gününüz uğurlu olsun</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row items">
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <StatSkeleton key={i} />
                  ))
                : stats.map((s, i) => {
                    const Icon = icons[s.icon as keyof typeof icons];
                    const isPositive = s.change >= 0;
                    return (
                      <Card
                        key={i}
                        className="relative bg-white cursor-pointer will-change-transform transition-transform duration-200 ease-[cubic-bezier(.25,.8,.25,1)] hover:-translate-y-2"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-slate-600 text-sm font-medium">
                                {s.title}
                              </p>

                              <NumberCounter
                                to={s.value}
                                suffix={s.unit ? ` ${s.unit}` : ""}
                                className="text-2xl font-bold text-slate-900 mt-1 block"
                                duration={1.2}
                              />

                              <div className="flex items-center mt-2">
                                {isPositive ? (
                                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                )}
                                <NumberCounter
                                  to={Math.abs(s.change)}
                                  suffix="%"
                                  className={
                                    isPositive
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }
                                />
                              </div>
                            </div>

                            <div className="bg-[var(--bg)] p-3 rounded-lg">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
            </div>

            <Card className="bg-white relative" onMouseMove={handleMouseMove}>
              <CardHeader>
                <CardTitle className="text-slate-800">
                  Həkimlərin statistikası
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse h-10 bg-slate-200 rounded mb-4"
                    />
                  ))
                ) : (
                  <>
                    <AnimatePresence>
                      {hoveredDoctor && (
                        <motion.div
                          key={hoveredDoctor.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            top: mousePos.y + 16,
                            left: mousePos.x + 16,
                          }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            duration: 0.2,
                          }}
                          className="fixed z-50 w-60 text-sm text-slate-800 bg-white/90 backdrop-blur-md border border-slate-300 rounded-xl shadow-xl p-4 pointer-events-none"
                          style={{
                            position: "fixed",
                            transform: "translate(0, 0)",
                          }}
                        >
                          <p className="font-semibold">{hoveredDoctor.name}</p>
                          <p className="mt-1">
                            Aktiv Xidmətlər:{" "}
                            <span className="font-medium">
                              {hoveredDoctor.value}
                            </span>
                          </p>
                          <p className="mt-1">
                            Tamamlanan Xidmətlər:{" "}
                            <span className="font-medium">
                              {hoveredDoctor.value}
                            </span>
                          </p>
                          
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-2 group/parent">
                      {[...doctorStats]
                        .sort((a, b) => b.value - a.value)
                        .map((d, i) => (
                          <div
                            key={i}
                            className="relative group/item transition-opacity duration-300 
                      group-hover/parent:opacity-50 hover:!opacity-100"
                            onMouseEnter={() => setHoveredDoctor(d)}
                            onMouseLeave={() => setHoveredDoctor(null)}
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-[var(--bg)]">
                                  {d.name}
                                </span>
                                <NumberCounter
                                  to={d.value}
                                  suffix=""
                                  duration={1.4}
                                  className="text-sm font-medium text-slate-600"
                                />
                              </div>

                              <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden cursor-pointer">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${d.value}%` }}
                                  transition={{
                                    duration: 1.4,
                                    ease: "easeOut",
                                    delay: 0.1 * i,
                                  }}
                                  className="bg-[var(--bg)] h-6 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="flex justify-between text-xs text-slate-500 mt-4">
                      {[0, 20, 40, 60, 80, 100].map((n) => (
                        <span key={n}>{n}</span>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          <aside className="items-center bg-white border-l  max-h-[745px] rounded-lg shadow-lg overflow-hidden mr-5 mt-6 2xl:block hidden">
            <div className="text-center p-4 border-b">
              <p className="text-slate-800 font-medium">Son elanlar</p>
            </div>

            <div className="h-[calc(100-120px)] overflow-hidden relative">
              {status === "loading" && (
                <div className="p-4 space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-slate-50 h-24 rounded-lg"
                    />
                  ))}
                </div>
              )}

              {status === "succeeded" && (
                <div className="h-[660px] overflow-hidden px-4 mt-3">
                  <Swiper
                    direction="vertical"
                    slidesPerView={6}
                    spaceBetween={12}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="h-full"
                  >
                    {announcements.map((a, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className={`bg-slate-50 p-3 rounded-lg border-l-4 cursor-pointer ${
                            colorMap[a.color]
                          } min-h-[100px] h-[100px] flex flex-col justify-between `}
                        >
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            {a.text}
                          </p>
                          <p className="text-xs text-slate-500 mt-2 text-right">
                            {new Date(a.date).toLocaleDateString("az-AZ")}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              <div className="absolute top-16 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
