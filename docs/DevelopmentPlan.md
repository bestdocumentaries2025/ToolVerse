
# ToolVerse Development Roadmap

## Phase 1: Foundation (Current State)
- [x] React & Tailwind Setup
- [x] Responsive Sidebar Layout
- [x] Search & Filtering Engine
- [x] Light/Dark Mode Toggle
- [x] Core Page Structure (Home & Dynamic ToolPage)
- [x] BMI Calculator Implementation

## Phase 2: Backend Integration (Next Steps)
1. **Firebase Project Setup**: Create a project in the Firebase Console.
2. **Firestore Configuration**: 
   - Seed the `tools` collection with initial tool metadata using the provided schema.
   - Use `onSnapshot` or `getDocs` in the app to replace the static `TOOLS` constant.
3. **Firebase Hosting**: Run `firebase init` and select Hosting to deploy the SPA.

## Phase 3: Expansion (Adding New Tools)
- Implement Financial tools (EMI, Interest).
- Implement Math tools (Percentage, Fraction).
- Implement specialized Dev tools (Unix Epoch, URL Encode).
- Add "Favorites" feature using Firebase Auth and Firestore.

## UI/UX Design Philosophy
- **Whitespace is luxury**: Keep layouts airy to reduce cognitive load.
- **Micro-interactions**: Use subtle transitions for hover states and calculation updates.
- **Real-time first**: No "Calculate" button unless absolutely necessary (e.g. heavy server-side tasks).
- **Mobile optimization**: Inputs should be large and easy to tap.
