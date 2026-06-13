# EmailJS Setup Guide

This guide will help you set up EmailJS to send contact form emails to your Gmail inbox.

## Step 1: Create an EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Gmail Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail**
4. Click **Connect Account**
5. Sign in with your Gmail account (vigneshwarravi26@gmail.com)
6. Grant EmailJS permission to send emails on your behalf
7. Note your **Service ID** (looks like: `service_xxxxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template configuration:

   **Template Name:** `contact_form`
   
   **Email Content:**
   ```
   Subject: {{subject}}
   
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   ```

   **To Email:** `vigneshwarravi26@gmail.com`
   
4. Save and note your **Template ID** (looks like: `template_xxxxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (starts with `public_`)

## Step 5: Update Environment Variables

Open `.env.local` in your project root and update:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

Replace the placeholder values with your actual credentials.

## Step 6: Test

1. Run your development server: `npm run dev`
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your Gmail inbox for the email

## Template Variables Used

- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{subject}}` - Email subject
- `{{message}}` - Message content
- `{{to_email}}` - Recipient email (your Gmail)

## Troubleshooting

- **Email not received?** Check spam/trash folder
- **CORS Error?** Make sure domain is added in EmailJS dashboard settings
- **"Service not found"?** Verify your Service ID is correct
- **"Template not found"?** Verify your Template ID is correct

## Security Notes

- Your Public Key is safe to expose (it's public)
- Never commit your `.env.local` file with real credentials to git
- The `.env.local` file is already in `.gitignore`
