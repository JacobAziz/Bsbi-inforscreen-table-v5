# BSBI Timetable Formatter

A web application that transforms raw Excel timetables from the BSBI school system into clean, presentable sheets for info screens. Built with Next.js and optimized for Vercel deployment.

## Features

- Upload raw Excel timetables
- Automatic data extraction and formatting
- Session-based color themes (Morning, Noon, Afternoon)
- Download formatted timetables as:
  - PDF (for printing)
  - PNG (for info screens)
  - Excel (for editing)

## Special Case Handling

The application includes special handling for various course format patterns:

- DBA courses - Uses placeholder values and specialized formatting
- Global MBA programs - Extracts "Global MBA" as program and "Project Management" as module
- "Pathway One-Strategic Leadership" pattern recognition
- "Cross-cultural Management" with proper hyphenation
- English for Academic Purposes courses - Truncates the extended title
- F-Y1-T1/F-Y1-T2 prefixes - Removes these from module names
- Special parentheses handling in professor names

## Tech Stack

- Next.js (React)
- TypeScript
- Chakra UI
- XLSX (SheetJS)
- pdf-lib
- html-to-image

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd info-scrn-proj
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click "Upload" or drag-and-drop an Excel file
2. Select session (Morning/Noon/Afternoon)
3. Enter the date
4. Preview the formatted timetable
5. Download in your preferred format

## Development

### Project Structure

```plaintext
info-scrn-proj/
├── public/                  # Static assets
├── src/
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   ├── pages/             # Next.js pages
│   ├── styles/            # CSS styles
│   └── types/             # TypeScript types
```

### Building for Production

```bash
npm run build
```

## Deployment

This project is optimized for Vercel deployment. Simply push to your GitHub repository and connect it to Vercel for automatic deployments.

### Environment Variables

No environment variables are required for the basic setup.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 