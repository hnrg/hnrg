module.exports = {
		secret: process.env.SECRET || 'testing',
    admin: {
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@admin.com',
      password: process.env.ADMIN_PASSWORD || 'admin',
    },
};
