const contact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    console.log('Contact form submission:', { name, email, subject, message });
    res.json({ success: true, message: 'Thank you for reaching out. We will get back to you shortly.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { contact };
