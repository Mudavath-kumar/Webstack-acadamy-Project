import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseAuth } from '../../config/firebase';

// Get user from localStorage
let user = null;
try {
  const storedUser = localStorage.getItem('firebaseUser');
  if (storedUser) {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  console.error('Error parsing stored user:', error);
  localStorage.removeItem('firebaseUser');
}

const initialState = {
  user: user || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Register with Email/Password
export const registerWithEmail = createAsyncThunk(
  'firebaseAuth/register',
  async ({ email, password, displayName }, thunkAPI) => {
    try {
      const result = await firebaseAuth.signUpWithEmail(email, password, displayName);
      
      if (result.error) {
        return thunkAPI.rejectWithValue(result.error);
      }
      
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified,
      };
      
      localStorage.setItem('firebaseUser', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Login with Email/Password
export const loginWithEmail = createAsyncThunk(
  'firebaseAuth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await firebaseAuth.signInWithEmail(email, password);
      
      if (result.error) {
        return thunkAPI.rejectWithValue(result.error);
      }
      
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified,
      };
      
      localStorage.setItem('firebaseUser', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Login with Google
export const loginWithGoogle = createAsyncThunk(
  'firebaseAuth/google',
  async (_, thunkAPI) => {
    try {
      const result = await firebaseAuth.signInWithGoogle();
      
      if (result.error) {
        return thunkAPI.rejectWithValue(result.error);
      }
      
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified,
      };
      
      localStorage.setItem('firebaseUser', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Google login failed');
    }
  }
);

// Login with Facebook
export const loginWithFacebook = createAsyncThunk(
  'firebaseAuth/facebook',
  async (_, thunkAPI) => {
    try {
      const result = await firebaseAuth.signInWithFacebook();
      
      if (result.error) {
        return thunkAPI.rejectWithValue(result.error);
      }
      
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified,
      };
      
      localStorage.setItem('firebaseUser', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Facebook login failed');
    }
  }
);

// Login with GitHub
export const loginWithGithub = createAsyncThunk(
  'firebaseAuth/github',
  async (_, thunkAPI) => {
    try {
      const result = await firebaseAuth.signInWithGithub();
      
      if (result.error) {
        return thunkAPI.rejectWithValue(result.error);
      }
      
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified,
      };
      
      localStorage.setItem('firebaseUser', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'GitHub login failed');
    }
  }
);

// Logout
export const logout = createAsyncThunk('firebaseAuth/logout', async (_, thunkAPI) => {
  try {
    await firebaseAuth.signOut();
    localStorage.removeItem('firebaseUser');
    return null;
  } catch (error) {
    localStorage.removeItem('firebaseUser');
    return null;
  }
});

const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('firebaseUser', JSON.stringify(action.payload));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerWithEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Email Login
      .addCase(loginWithEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Facebook Login
      .addCase(loginWithFacebook.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // GitHub Login
      .addCase(loginWithGithub.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(loginWithGithub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginWithGithub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      });
  },
});

export const { reset, setUser } = firebaseAuthSlice.actions;
export default firebaseAuthSlice.reducer;
