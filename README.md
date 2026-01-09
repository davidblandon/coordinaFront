# 📅 Coordina

A modern, responsive calendar and appointment scheduling application built with React and Tailwind CSS. Coordina makes it easy to view your weekly schedule and create appointments with an intuitive, step-by-step interface.

## ✨ Features

- **📆 Weekly Calendar View** - Navigate through weeks with an interactive grid layout
- **⏰ Time Slot Management** - Click on any time slot to create appointments
- **📝 Multi-Step Appointment Creation** - Create appointments with a guided two-step process
- **👥 Participant Management** - Add and manage participants for each appointment
- **📍 Location Tracking** - Specify meeting locations for appointments
- **⏱️ Flexible Duration** - Set custom durations for appointments (30 min to 2 hours)
- **🎨 Modern UI** - Clean, responsive design with Tailwind CSS
- **🚀 Fast Performance** - Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **React 19.2** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Vite 7.2** - Next-generation frontend tooling
- **Lucide React** - Beautiful icon library
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
src/
├── api/               # API integration layer
│   ├── calendar.js
│   ├── config.js
│   └── user.js
├── components/        # Reusable UI components
│   ├── calendar/      # Calendar-specific components
│   │   ├── CalendarGrid.jsx
│   │   ├── CalendarHeader.jsx
│   │   ├── DayHeader.jsx
│   │   └── TimeSlot.jsx
│   ├── modal/         # Modal components
│   │   ├── AppointmentModal.jsx
│   │   ├── ModalHeader.jsx
│   │   ├── StepOne.jsx
│   │   └── StepTwo.jsx
│   ├── user/          # User-related components
│   │   └── UserSwitcher.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Logo.jsx
│   ├── PrimaryButton.jsx
│   └── SecondaryButton.jsx
├── context/           # React Context providers
│   └── UserContext.jsx
├── handlers/          # Business logic handlers
│   └── indexHandlers.js
├── pages/             # Page components
│   ├── Calendar.jsx
│   └── Index.jsx
├── services/          # Service layer
│   └── userService.js
├── styles/            # Centralized styling
│   ├── calendarStyles.js
│   ├── indexStyles.js
│   ├── modalStyles.js
│   └── userStyles.js
├── utils/             # Utility functions
│   └── dateUtils.jsx
├── App.jsx            # Main app component
└── main.jsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidblandon/coordinaFront.git
   cd coordinaFront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📜 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🎯 Usage

### Viewing Your Schedule

1. From the home page, click "Voir mon emploi du temps" (View my schedule)
2. Navigate through weeks using the arrow buttons
3. View your appointments in the weekly grid

### Creating an Appointment

1. Click on any time slot in the calendar
2. **Step 1**: Enter basic information
   - Title
   - Description
   - Location
3. **Step 2**: Set time details
   - Start time (hour and minute)
   - Duration (30 min to 2 hours)
   - Add participants
4. Confirm to create the appointment

## 🎨 Customization

### Styling

The project uses a centralized styling approach with Tailwind CSS. Style configurations are organized in the `src/styles/` directory:

- `calendarStyles.js` - Calendar component styles
- `modalStyles.js` - Modal and form styles
- `indexStyles.js` - Home page styles
- `userStyles.js` - User interface styles

To customize the theme, edit `tailwind.config.js`.

### Time Slots

Time slots are generated from 8:00 AM to 6:00 PM by default. To modify this, update the calendar generation logic in `src/utils/dateUtils.jsx`.

## 🔧 Configuration

### Vite Configuration

Build and development settings can be customized in `vite.config.js`.

### ESLint Configuration

Code quality rules are defined in `eslint.config.js`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and intended for educational purposes.

## 👨‍💻 Development

### Code Organization

- **Components** follow a modular architecture
- **Styles** are centralized for consistency
- **Business logic** is separated into handlers and services
- **Context API** manages global state


### Best Practices

- Use functional components with hooks
- Follow ESLint rules for code consistency
- Keep components small and focused
- Utilize proper prop-types or TypeScript for type safety
- Write semantic and accessible HTML



### Backend

For seeing an consistent Backend for this app visit [Coordina_Backend](https://github.com/jmespitiag/Coordina_Backend.git)


Built with ❤️ using React and Tailwind CSS