import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Stat {
  title: string;
  value: number;
  unit: string;
  change: number;      
  icon: string;
}
interface DoctorStat { name: string; value: number }

interface Announcement {
  text: string;
  date: string;       
  color: "blue" | "green" | "purple" | "orange" | "red";
}

interface DashboardState {
  stats: Stat[];
  doctorStats: DoctorStat[];
  announcements: Announcement[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DashboardState = {
  stats: [],
  doctorStats: [],
  announcements: [],
  status: "idle",
};

const toNumber = (str: string) =>
  Number(str.replace(/[^\d.-]/g, "").replace(",", ""));

export const fetchDashboard = createAsyncThunk("dashboard/fetch", async () => {
  const res = await fetch("/api/dashboard");
  if (!res.ok) throw new Error("Fetch failed");
  const raw = await res.json();

  const stats: Stat[] = raw.stats.map((s: any) => ({
    ...s,
    value: typeof s.value === "number" ? s.value : toNumber(s.value),
    change: typeof s.change === "number" ? s.change : toNumber(s.change),
  }));

  return {
    stats,
    doctorStats: raw.doctorStats as DoctorStat[],
    announcements: raw.announcements as Announcement[],
  };
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchDashboard.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stats = action.payload.stats;
        state.doctorStats = action.payload.doctorStats;
        state.announcements = action.payload.announcements;
      })
      .addCase(fetchDashboard.rejected, state => {
        state.status = "failed";
      }),
});

export default dashboardSlice.reducer;
