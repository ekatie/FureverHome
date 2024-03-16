import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminApplications, getAdminApplication } from "../services/applicationsService";
import API from "../services/api";

export const addApplicationAsync = createAsyncThunk(
  "application/addApplication",
  async (userId) => {
    try {
      const response = await API.post(`/applications`, { application: { user_id: userId, status: "Pending" } });
      return response.data;
    } catch (error) {
      console.error("Add Application Error:", error.response || error);
      throw error;
    }
  }
);

export const submitApplicationAsync = createAsyncThunk(
  "application/submitApplication",
  async (applicationData, { getState }) => {
    const { id, ...updatePayload } = applicationData;
    try {
      const response = await API.put(`/applications/${id}`, { application: updatePayload });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchApplicationAsync = createAsyncThunk(
  "application/fetchApplication",
  async (userId) => {
    try {
      const response = await API.get(`/applications/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchMatchesAsync = createAsyncThunk(
  "application/fetchMatches",
  async (applicationId) => {
    try {
      const response = await API.get(`/applications/${applicationId}/matches`);
      return response.data;
    } catch (error) {
      console.error("Fetch Matches Error:", error.response || error);
      throw error;
    }
  }
);

export const confirmMatchAsync = createAsyncThunk(
  "application/confirmMatch",
  async ({ applicationId, dogId, readProfile }) => {
    try {
      const response = await API.put(`/applications/${applicationId}`, { application: { dog_id: dogId, status: "Submitted", read_profile: readProfile } });
      return response.data;
    } catch (error) {
      console.error("Confirm Match Error:", error.response || error);
      throw error;
    }
  }
);

export const fetchAdminApplicationsAsync = createAsyncThunk(
  "application/fetchAdminApplications",
  async () => {
    const response = await getAdminApplications();
    return response;
  }
);

export const fetchAdminApplicationAsync = createAsyncThunk(
  "application/fetchAdminApplication",
  async (applicationId) => {
    const response = await getAdminApplication(applicationId);
    console.log("fetchadminappasync", response);
    return response;
  }
);

const initialState = {
  application: {},
  applications: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    fetchApplication(state, action) {
      state.application = action.payload;
    },
    addApplication(state, action) {
      state.application = action.payload;
    },
    updateApplication(state, action) {
      state.application = action.payload;
    },
    cancelApplication(state, action) {
      state.application = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplicationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitApplicationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.application = action.payload;
      })
      .addCase(submitApplicationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchApplicationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplicationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.application = action.payload;
      })
      .addCase(fetchApplicationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(addApplicationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.application = action.payload;
      })
      .addCase(addApplicationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchMatchesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.matches = action.payload;
      })
      .addCase(fetchMatchesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchAdminApplicationsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = action.payload;
      })
      .addCase(fetchAdminApplicationsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchAdminApplicationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.application = action.payload;
      })
      .addCase(fetchAdminApplicationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { fetchApplication, addApplication, updateApplication, cancelApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
