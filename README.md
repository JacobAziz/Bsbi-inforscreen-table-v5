# BSBI Timetable Formatter V5 🎓

A Next.js web application that transforms raw Excel timetables from BSBI school into clean, formatted displays optimized for information screens.

## ✨ Features

### 📊 **Excel Processing**
- **Raw BSBI Excel Import**: Parses original school Excel files
- **App-Exported Excel Import**: Handles previously exported files for re-editing
- **Intelligent Data Extraction**: Advanced parsing for programs, modules, intakes, professors, and rooms

### 🎨 **Session-Based Theming**
- **Morning Session**: Blue theme (#4a7fcb) with logo-based text colors
- **Noon Session**: Yellow theme (#F7B32B) with logo-based text colors  
- **Afternoon Session**: Dark blue theme (#1A365D) with logo-based text colors
- **Logo-Based Text Colors**: Data cells use BSBI logo colors for professional appearance

### 📱 **Info Screen Optimization**
- **Resolution**: 1080x2400 portrait displays
- **High-Quality Exports**: JPG, PDF, and Excel downloads
- **Professional Layout**: Clean grid-based structure with BSBI branding

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
git clone https://github.com/JacobAziz/Bsbi-inforscreen-table-v5.git
cd Bsbi-inforscreen-table-v5
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📥 **How to Use**

1. **Upload Excel File**: Drop your BSBI timetable Excel file
2. **Select Session**: Choose Morning, Noon, or Afternoon
3. **Set Time & Date**: Configure display information
4. **Preview**: View formatted timetable with session theming
5. **Download**: Export as high-quality JPG, PDF, or Excel

## 🎨 **Logo-Based Color System**

The application uses BSBI logo colors for data text:
- **Morning**: `#4a7fcb` (logo columns color)
- **Noon**: `#2d4d7c` (logo circle color)  
- **Afternoon**: `#1a365d` (logo columns color)

## 🛠 **Tech Stack**

- **Frontend**: Next.js 14 + TypeScript
- **UI**: Chakra UI + Emotion
- **File Processing**: xlsx library
- **Export**: html-to-image + pdf-lib
- **Deployment**: Vercel

## 📦 **Deployment**

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Configuration is optimized for free tier (single region)

### Manual Deployment
```bash
npm run build
npm start
```

## 📁 **Project Structure**

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── TimetablePreview.tsx   # Main display component
│   ├── DownloadButtons.tsx    # Export functionality
│   ├── FileUpload.tsx         # Excel file processing
│   ├── SessionSelector.tsx    # Session configuration
│   └── BSBILogo.tsx          # Logo component
├── lib/                   # Utility functions
├── types/                 # TypeScript definitions
├── public/               # Static assets
└── vercel.json          # Deployment configuration
```

## 🔧 **Configuration**

### Vercel Settings
- **Region**: Single region (iad1) for free tier
- **Function Duration**: 10 seconds max
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

## 📋 **Features Status**

✅ **Excel Import & Processing**  
✅ **Session-Based Theming**  
✅ **Logo-Based Text Colors**  
✅ **High-Quality Exports (JPG/PDF/Excel)**  
✅ **Info Screen Optimization**  
✅ **Vercel Deployment Ready**  

## 🎯 **Production Ready**

This is a fully functional proof of concept ready for:
- ✅ Production deployment on Vercel
- ✅ Use at BSBI school information screens
- ✅ High-quality timetable generation
- ✅ Professional branding consistency

## 📞 **Support**

For issues or questions, please create an issue in the GitHub repository.

---

**Built with ❤️ for BSBI School** 🎓 