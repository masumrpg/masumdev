# MasumDev React Native Libraries

A monorepo containing high-quality React Native libraries and components, built with modern development practices and tools.

## 📦 Libraries

### [@masumdev/rn-bottom-sheet](./libs/rn-bottom-sheet)

A highly customizable and gesture-responsive bottom sheet component for React Native applications.

**Key Features:**
- Customizable snap points (10% to 90% of screen height)
- iOS and Android back gesture/button handling
- Smooth animations using react-native-reanimated
- Scrollable content support
- Safe area support

### [@masumdev/rn-toast](./libs/rn-toast)

A lightweight toast component inspired by Samsung notifications, featuring smooth animations and anti-spam protection.

**Key Features:**
- Lightweight and performant
- Smart queueing system
- Customizable styling
- TypeScript support
- Works on iOS and Android

## 🛠️ Project Structure

```
├── apps/
│   ├── masumdev/     # Demo application
│   └── website/      # Documentation website
├── libs/
│   ├── rn-bottom-sheet/ # Bottom sheet library
│   └── rn-toast/     # Toast library
└── tools/           # Build and development tools
```

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- npm, yarn, pnpm, or bun
- React Native development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/masumrpg/masumdev.git
cd masumdev
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 📱 Demo App

The demo application showcases all the libraries in action. To run it:

```bash
cd apps/masumdev
npm start
# or
yarn start
```

## 📖 Documentation

Detailed documentation for each library is available in their respective directories:

- [Bottom Sheet Documentation](./libs/bottom-sheet/README.md)
- [Toast Documentation](./libs/rn-toast/README.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.