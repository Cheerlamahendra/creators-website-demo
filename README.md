# Creators Zone — Premium Marketplace Demo

A responsive Next.js 14 + TypeScript frontend demo for discovering and booking creative professionals.

## Requirements
- Node.js 18.17+ (Node 20 LTS recommended)
- npm

## Run in VS Code
1. Extract `creators-zone.zip`.
2. Open the extracted `creators-zone` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open http://localhost:3000

For a production build:

```bash
npm run build
npm start
```

## Demo functionality
- Responsive sticky navigation and mobile menu
- Search by creator name, category and sample location
- Category and location filters; sorting
- Creator profile preview modal
- Booking demo with date and sample time-slot selection
- Three continuously scrolling creator showcase rows (pause on hover)
- FAQ accordion and testimonial carousel
- Contact form frontend validation and success state
- WhatsApp links using the supplied India number: +91 82473 29044

## Important demo notes
This is a frontend-only demonstration. Creator profiles, ratings, availability, testimonials and locations are sample data. Booking does not create a real reservation. The contact form does not send data to a backend. There is no payment processing, authentication, real creator verification or database.

## Images
The demo uses remote Unsplash image URLs. An internet connection is needed for those images to load. If an image is unavailable, the layout remains usable.

## Customization
- Main page and demo data: `app/page.tsx`
- Styling and animations: `app/globals.css`
- Brand colors are defined near the top of `app/globals.css`.
- Update the WhatsApp number in `app/page.tsx` if the business contact changes.
