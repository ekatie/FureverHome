import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminApplications, getAdminApplication, adminUpdateApplication, createBooking } from "../services/applicationsService";
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

export const updateApplicationAsync = createAsyncThunk(
  "application/updateApplication",
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

      // Update dog status to "Applications Being Reviewed"
      await API.put(`/dogs/${dogId}`, { dog: { status: "Applications Being Reviewed" } });

      return response.data;
    } catch (error) {
      console.error("Confirm Match Error:", error.response || error);
      throw error;
    }
  }
);

export const createBookingAsync = createAsyncThunk(
  "application/createBooking",
  async ({ applicationId, uri }) => {
    try {
      const response = await createBooking(applicationId, uri);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const createPaymentIntentAsync = createAsyncThunk(
  "application/createPaymentIntent",
  async ({ applicationId }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/applications/${applicationId}/payment`);
      if (response.data.clientSecret) {
        return { clientSecret: response.data.clientSecret };
      } else {
        return rejectWithValue('Client secret not found in the response');
      }
    } catch (error) {
      console.error("Create Payment Intent Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Unexpected error occurred');
    }
  }
);

export const cancelApplicationAsync = createAsyncThunk(
  "application/cancelApplication",
  async ({ applicationId }) => {
    try {
      const response = await API.put(`/applications/${applicationId}/cancel`, { application: { status: "Cancelled" } });

      return response.data;
    } catch (error) {
      console.error("Cancel Application Error:", error.response || error);
      throw error;
    }
  }
);

export const fetchAdminApplicationsAsync = createAsyncThunk(
  "application/fetchAdminApplications",
  async () => {
    const response = await getAdminApplications();
    // Sort applications by created_at date
    const sortedApplications = response.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    return sortedApplications;
  }
);

export const fetchAdminApplicationAsync = createAsyncThunk(
  "application/fetchAdminApplication",
  async (applicationId) => {
    const response = await getAdminApplication(applicationId);
    return response;
  }
);

export const adminUpdateApplicationAsync = createAsyncThunk(
  "application/updateAdminApplication",
  async ({ applicationId, status }) => {
    const response = await adminUpdateApplication(applicationId, status);
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
    },
    updateApplicationStatus(state, action) {
      const index = state.applications.findIndex((app) => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index].status = action.payload.status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateApplicationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateApplicationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.application = action.payload;
      })
      .addCase(updateApplicationAsync.rejected, (state, action) => {
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
      .addCase(fetchAdminApplicationsAsync.pending, (state) => {
        state.status = "loading";
      })
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
    builder
      .addCase(createBookingAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.booking = action.payload;
      })
      .addCase(createBookingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { fetchApplication, addApplication, updateApplication, cancelApplication, updateApplicationStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
