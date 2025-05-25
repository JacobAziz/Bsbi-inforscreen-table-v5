# BSBI Timetable Formatter V4 🎓

A Next.js web application that transforms raw Excel timetables from BSBI school into clean, formatted displays optimized for information screens.

## 🚀 Features

- **📊 Excel File Processing**: Import raw BSBI Excel files or previously exported files
- **🎨 Session-Based Theming**: Morning (Blue), Noon (Yellow), Afternoon (Dark Blue)
- **📱 Info Screen Optimization**: 1080x1920 portrait display ready
- **📥 High-Quality Exports**: JPG, PDF, and Excel downloads
- **🎯 Professional Layout**: Clean grid structure with BSBI branding

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Library**: Chakra UI
- **File Processing**: xlsx library for Excel parsing
- **Export**: html-to-image, pdf-lib for high-quality downloads
- **Deployment**: Vercel (optimized for free tier)

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JacobAziz/BSBI-Inforscreen-Table-V4.git
   cd BSBI-Inforscreen-Table-V4
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📋 Usage

### Step 1: Upload Excel File
- Upload your BSBI timetable Excel file
- Supports both raw BSBI format and previously exported files

### Step 2: Configure Session
- Select session type (Morning/Noon/Afternoon)
- Set time and date for the timetable

### Step 3: Preview & Download
- Review the formatted timetable
- Download as JPG, PDF, or Excel format

## 🎨 Session Themes

| Session | Background Color | Text Color | Use Case |
|---------|------------------|------------|----------|
| Morning | Blue (#4a7fcb) | White | Early classes |
| Noon | Yellow (#F7B32B) | Black | Midday sessions |
| Afternoon | Dark Blue (#1A365D) | White | Evening classes |

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── FileUpload.tsx     # Excel file upload
│   ├── SessionSelector.tsx # Session configuration
│   ├── TimetablePreview.tsx # Timetable display
│   ├── DownloadButtons.tsx # Export functionality
│   └── BSBILogo.tsx       # BSBI logo component
├── lib/                   # Utility functions
│   └── parseExcel.ts      # Excel parsing logic
├── types/                 # TypeScript definitions
│   └── timetable.d.ts     # Timetable types
└── public/               # Static assets
    └── bsbi-logo.png     # BSBI logo
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure for Free Tier**
   - Single region deployment (iad1)
   - Optimized function duration (10s max)

3. **Environment Variables**
   - No environment variables required for basic functionality

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **FileUpload**: Handles Excel file processing and validation
- **SessionSelector**: Manages session type, time, and date selection
- **TimetablePreview**: Renders the formatted timetable with proper styling
- **DownloadButtons**: Handles high-quality JPG, PDF, and Excel exports

## 📊 Export Quality Features

- **Resolution**: 1080x2400 pixels (portrait)
- **Quality**: 100% JPEG quality with 2x pixel ratio
- **Row Coloring**: Alternating white/light gray pattern
- **Professional Output**: Ready for info screen display

## 🎯 Proof of Concept Status

✅ **Core Functionality**: Excel import, session theming, preview, exports  
✅ **High-Quality Downloads**: JPG, PDF, Excel working perfectly  
✅ **Responsive Design**: Optimized for info screens  
✅ **Vercel Ready**: Configured for free tier deployment  

## 🔄 Future Enhancements

- User authentication system
- Backend database integration
- Batch processing capabilities
- Custom color scheme options
- Advanced template customization

## 📝 License

This project is developed for BSBI school internal use.

## 🤝 Contributing

This is a proof of concept for BSBI school. For contributions or issues, please contact the development team.

---

**Built with ❤️ for BSBI School Information Screens** 