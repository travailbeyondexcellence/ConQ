# Conq iOS Application

Native iOS app for Conq built with Swift and SwiftUI.

## Tech Stack

- **Swift** - Programming language
- **SwiftUI** - Modern declarative UI framework
- **Apollo iOS** - GraphQL client for iOS
- **Alamofire** - Networking library
- **Combine** - Reactive framework
- **MVVM Architecture** - Model-View-ViewModel pattern

## Requirements

- Xcode 15.0 or later
- iOS 16.0 or later
- macOS 13.0 or later (for development)
- Swift 5.9 or later

## Getting Started

### 1. Install Dependencies

This project uses Swift Package Manager. Dependencies will be resolved automatically when you open the project in Xcode.

### 2. Open in Xcode

```bash
cd frontend/ios
open Conq.xcodeproj  # or double-click the .xcodeproj file
```

If you don't have an Xcode project file yet, you can create one:

1. Open Xcode
2. File → New → Project
3. Choose iOS → App
4. Use the files in this directory

### 3. Configure API Endpoint

Edit `NetworkService.swift` to point to your backend:

```swift
let url = URL(string: "http://localhost:8080/graphql")!
```

**Note:** For iOS Simulator, localhost should work. For physical devices, use your computer's IP address.

### 4. Run the App

- Select a simulator or connected device
- Click the Run button (⌘R)

## Project Structure

```
frontend/ios/
├── Conq/
│   ├── ConqApp.swift               # App entry point
│   ├── Views/
│   │   └── ContentView.swift       # Main view
│   ├── ViewModels/
│   │   └── ContentViewModel.swift  # Business logic
│   ├── Models/
│   │   ├── User.swift              # User model
│   │   └── Content.swift           # Content model
│   ├── Services/
│   │   └── NetworkService.swift    # Network & API layer
│   └── Resources/
│       └── Info.plist              # App configuration
├── Package.swift                    # Swift Package Manager
└── README.md                        # This file
```

## Architecture

This app follows the **MVVM (Model-View-ViewModel)** pattern:

- **Models**: Data structures (`User`, `Content`)
- **Views**: SwiftUI views (`ContentView`)
- **ViewModels**: Business logic (`ContentViewModel`)
- **Services**: Network layer (`NetworkService`)

## Dependencies

Managed via Swift Package Manager in `Package.swift`:

- **Apollo iOS** (v1.9.0+) - GraphQL client
- **Alamofire** (v5.8.0+) - HTTP networking

## Configuration

### GraphQL Setup

The Apollo client is configured in `NetworkService.swift`:

```swift
let apollo = ApolloClient(
    networkTransport: transport,
    store: store
)
```

### App Transport Security

For local development, ATS is disabled in `Info.plist`. **Enable it for production:**

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
</dict>
```

## Building

### Development Build

```bash
xcodebuild -scheme Conq -configuration Debug
```

### Release Build

```bash
xcodebuild -scheme Conq -configuration Release
```

### Archive for App Store

1. Product → Archive in Xcode
2. Distribute App
3. Follow App Store Connect guidelines

## Testing

Run tests from Xcode:

```bash
xcodebuild test -scheme Conq -destination 'platform=iOS Simulator,name=iPhone 15'
```

Or use ⌘U in Xcode.

## Debugging

- **Print debugging**: Use `print()` or `debugPrint()`
- **Breakpoints**: Click line numbers in Xcode
- **View hierarchy**: Debug → View Debugging → Capture View Hierarchy
- **Network**: Use Xcode's Network debugging tools

## Features

- Native iOS experience with SwiftUI
- Dark mode support
- Apollo GraphQL integration
- Reactive programming with Combine
- MVVM architecture for clean code
- Type-safe API calls

## Common Issues

### "Could not find module"

Resolve Swift Package dependencies:
- File → Packages → Resolve Package Versions

### "No such module 'Apollo'"

Clean build folder:
- Product → Clean Build Folder (⇧⌘K)

### Simulator not loading

Reset simulator:
- Device → Erase All Content and Settings

## Learn More

- [Swift Documentation](https://swift.org/documentation/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Apollo iOS](https://www.apollographql.com/docs/ios/)
- [Alamofire](https://github.com/Alamofire/Alamofire)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
