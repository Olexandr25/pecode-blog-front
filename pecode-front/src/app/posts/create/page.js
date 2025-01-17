'use client'

import { CustomSnackbar } from '@/app/_components'
import { usePostsActions } from '@/app/posts/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import schema from '../schema'

const PostCreatePage = () => {
  const { submitPost } = usePostsActions()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async data => {
    try {
      await submitPost(data)
      router.replace('/posts')
    } catch (error) {
      setErrorMessage('Failed to create post')
      setOpenSnackbar(true)
    }
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Create a New Post
      </Typography>
      <TextField
        fullWidth
        label="Title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        multiline
        rows={4}
        inputProps={{
          style: { maxHeight: '300px', overflowY: 'auto' },
        }}
        {...register('content')}
        error={!!errors.content}
        helperText={errors.content?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        {...register('author')}
        error={!!errors.author}
        helperText={errors.author?.message}
        margin="normal"
      />
      <CustomSnackbar
        open={openSnackbar}
        message={errorMessage}
        handleClose={handleSnackbarClose}
        severity="error"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mb: 2, marginTop: 'auto' }}
      >
        Create Post
      </Button>
    </Box>
  )
}

export default PostCreatePage
