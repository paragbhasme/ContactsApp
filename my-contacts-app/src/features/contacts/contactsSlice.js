import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://localhost:7089/api/contacts'; 
export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async ({ pageNumber, pageSize, sortby, sortdesc }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `https://localhost:7089/api/contacts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortby}&sortDescending=${sortdesc}`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const fetchFavourites = createAsyncThunk('contacts/fetchFavourites', async () => {
    try {
        const response = await axios.get(`${API_URL}/favourites`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const toggleFavourite = createAsyncThunk(
    'contacts/toggleFavourite',
    async ({ id, favourites }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}?favourites=${favourites}`,favourites);
            return { id, favourites: response.data.Favourites };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Example for addContact
export const addContact = createAsyncThunk('contacts/addContact', async (contact, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  
  // Example for updateContact
  export const updateContact = createAsyncThunk('contacts/updateContact', async ({ id, contact }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  
    try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch(resetStatus());
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Slice
const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { 
        contacts: [],
        favourites: [],
        status: 'idle',
        error: null,
        theme: 'light', 
        pageSize: 5,
        pageNumber: 1,
        sortby: "Name",
        sortdesc: false
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        updateLocalFavourite: (state, action) => {
            const { id, favourites } = action.payload;
            const contact = state.contacts.find(contact => contact.id === id);
            if (contact) {
                contact.favourites = favourites;
            }
        },
        prevPage:(state)=>{
            state.pageNumber -= 1;
        },
        nextPage:(state)=>{
            state.pageNumber += 1;
        },
        setPageSize:(state,action)=>{
            state.pageSize= action.payload;
        },
        sortBy:(state,action)=>{
            state.sortby= action.payload;
        },
        sortDesc:(state,action)=>{
            state.sortdesc= action.payload;
        },
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favourites = action.payload;
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index >= 0) {
                    state.contacts[index] = action.payload;
                }
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addCase(toggleFavourite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(toggleFavourite.fulfilled, (state, action) => {
                const { id, favourites } = action.payload;
                const contact = state.contacts.find(contact => contact.id === id);
                if (contact) {
                    contact.favourites = favourites;
                }
                state.status = 'succeeded';
            })          
            .addCase(toggleFavourite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
export const { toggleTheme ,updateLocalFavourite ,resetStatus, prevPage
    ,nextPage,setPageSize, sortBy,sortDesc
} = contactsSlice.actions;
export default contactsSlice.reducer;
