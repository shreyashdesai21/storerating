export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  if (err.name === 'PrismaClientKnownRequestError') {
    // Handle specific Prisma errors (e.g., unique constraint violations)
    if (err.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Resource already exists' });
    }
  }

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
