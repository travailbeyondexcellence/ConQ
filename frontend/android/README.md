# Conq Android Application

Native Android app for Conq built with Kotlin and Jetpack Compose.

## Tech Stack

- **Kotlin** - Programming language
- **Jetpack Compose** - Modern UI toolkit
- **Material Design 3** - Design system
- **Apollo GraphQL** - GraphQL client for Android
- **Coroutines** - Asynchronous programming
- **Navigation Compose** - Navigation component
- **OkHttp** - HTTP client

## Requirements

- Android Studio Hedgehog or later
- JDK 17 or later
- Android SDK 34
- Minimum SDK: 24 (Android 7.0)

## Getting Started

### 1. Open in Android Studio

```bash
cd frontend/android
# Open this directory in Android Studio
```

### 2. Sync Gradle

Android Studio will automatically sync Gradle dependencies.

### 3. Run the App

- Click the "Run" button in Android Studio
- Or use: `./gradlew installDebug`

## Project Structure

```
frontend/android/
├── app/
│   ├── src/main/
│   │   ├── java/com/conq/app/
│   │   │   ├── MainActivity.kt          # Main entry point
│   │   │   ├── ui/theme/                # Theme configuration
│   │   │   │   ├── Color.kt
│   │   │   │   ├── Theme.kt
│   │   │   │   └── Type.kt
│   │   ├── res/                         # Resources
│   │   │   ├── values/
│   │   │   │   ├── strings.xml
│   │   │   │   └── themes.xml
│   │   │   ├── layout/
│   │   │   └── drawable/
│   │   └── AndroidManifest.xml
│   └── build.gradle.kts                 # App-level Gradle
├── build.gradle.kts                     # Project-level Gradle
├── settings.gradle.kts                  # Settings
└── gradle.properties                    # Properties
```

## Configuration

### GraphQL Endpoint

Edit the GraphQL endpoint in your configuration:

```kotlin
// In your Apollo client setup
val apolloClient = ApolloClient.Builder()
    .serverUrl("http://10.0.2.2:8080/graphql")  // For emulator
    .build()
```

**Note:** Use `10.0.2.2` for Android emulator to access localhost on host machine.

## Build Variants

- **Debug**: Development build with debugging enabled
- **Release**: Production build with ProGuard/R8 optimization

### Build APK

```bash
./gradlew assembleDebug    # Debug APK
./gradlew assembleRelease  # Release APK
```

### Build AAB (App Bundle)

```bash
./gradlew bundleRelease
```

## Features

- Jetpack Compose for modern, declarative UI
- Material Design 3 components
- Dark theme support
- Apollo GraphQL integration
- Coroutines for async operations
- Type-safe navigation

## Dependencies

All dependencies are managed in `app/build.gradle.kts`:

- Compose BOM for version management
- Apollo GraphQL for API calls
- Navigation Compose for routing
- Material3 for UI components
- Coroutines for async operations

## Testing

```bash
./gradlew test              # Unit tests
./gradlew connectedAndroidTest  # Instrumentation tests
```

## Troubleshooting

### Gradle Sync Issues

```bash
./gradlew clean
./gradlew --refresh-dependencies
```

### Clear Build Cache

```bash
./gradlew cleanBuildCache
```

## Learn More

- [Android Developers](https://developer.android.com)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- [Kotlin](https://kotlinlang.org/)
- [Apollo Android](https://www.apollographql.com/docs/kotlin/)
