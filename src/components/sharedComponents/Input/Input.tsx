import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

interface inputType {
    name: string;
    placeholder?: string;
    label?: string;
    helperText?: string;
}

const myStyles = {
    form: {
        fontFamily: 'gelasio',
        color: '#422913',
        "&:hover": {
            color: '#66513e'
        },
        "::placeholder": {
            fontFamily: 'gelasio',
        }
    }
}

export const Input = forwardRef((props:inputType, ref) => {
    return (
        <TextField
            variant = 'outlined'
            margin = 'dense'
            inputRef = {ref}
            fullWidth
            type = 'text'
            sx={{
                input: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                },
                label: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                }
            }}
        {...props}
        ></TextField>
    )
})

export const InputSummary = forwardRef((props:inputType, ref) => {
    return (
        <TextField
            variant = 'outlined'
            margin = 'dense'
            inputRef = {ref}
            fullWidth
            multiline
            type = 'text'
            sx={{
                input: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                },
                label: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                }
            }}
        {...props}
        ></TextField>
    )
})

export const PwInputSignIn = forwardRef((props:inputType, ref) => {
    return (
        <TextField
            variant = 'outlined'
            margin = 'dense'
            inputRef = {ref}
            fullWidth
            type = 'password'
            sx={{
                input: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                },
                label: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                }
            }}
        {...props}
        ></TextField>
    )
})

export const PwInputSignUp = forwardRef((props:inputType, ref) => {
    return (
        <TextField
            variant = 'outlined'
            margin = 'dense'
            inputRef = {ref}
            fullWidth
            type = 'password'
            sx={{
                input: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                },
                label: {
                    color: '#66513e',
                    fontFamily: 'gelasio',
                }
            }}
            helperText='Password must be at least 6 characters long'
        {...props}
        ></TextField>
    )
})