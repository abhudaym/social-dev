import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
} from './types';

// Get current users profile => /api/profile/me

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update profile profile

export const createProfile = (formData, history, edit) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(
        edit ? 'Profile updated successfully' : 'Profile created successfully',
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    var i = 0;
    const errors = error.response.data.errors;
    if (errors !== 'Invalid Credentials') {
      for (i = 0; i < errors.length; i++) {
        console.log(errors[i].msg);
        dispatch(setAlert(errors[i].msg, 'danger', 'success'));
      }
    }

    if (errors === 'Invalid Credentials') {
      dispatch(setAlert(errors, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    var i = 0;
    const errors = error.response.data.errors;
    if (errors !== 'Invalid Credentials') {
      for (i = 0; i < errors.length; i++) {
        console.log(errors[i].msg);
        dispatch(setAlert(errors[i].msg, 'danger', 'success'));
      }
    }

    if (errors === 'Invalid Credentials') {
      dispatch(setAlert(errors, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    var i = 0;
    const errors = error.response.data.errors;
    if (errors !== 'Invalid Credentials') {
      for (i = 0; i < errors.length; i++) {
        console.log(errors[i].msg);
        dispatch(setAlert(errors[i].msg, 'danger', 'success'));
      }
    }

    if (errors === 'Invalid Credentials') {
      dispatch(setAlert(errors, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete experience api/profile/experience/:exp_id
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience field has been deleted!', 'danger'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete education api/profile/experience/:exp_id
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education field has been deleted!', 'danger'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete account and profileFields
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(setAlert('Your account has been deleted!', 'danger'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};