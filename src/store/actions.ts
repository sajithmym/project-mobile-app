import { createAction } from '@reduxjs/toolkit';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

// Action Creators
export const loginRequest = (email, password) => createAction(LOGIN_REQUEST, { email, password });
export const loginSuccess = (user) => createAction(LOGIN_SUCCESS, { user });
export const loginFailure = (error) => createAction(LOGIN_FAILURE, { error });
export const logout = () => createAction(LOGOUT);
export const signupRequest = (email, password) => createAction(SIGNUP_REQUEST, { email, password });
export const signupSuccess = (user) => createAction(SIGNUP_SUCCESS, { user });
export const signupFailure = (error) => createAction(SIGNUP_FAILURE, { error });
export const updateProfile = (profileData) => createAction(UPDATE_PROFILE, { profileData });