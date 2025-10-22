// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Conq",
    platforms: [
        .iOS(.v16)
    ],
    products: [
        .library(
            name: "Conq",
            targets: ["Conq"]),
    ],
    dependencies: [
        // Apollo iOS for GraphQL
        .package(url: "https://github.com/apollographql/apollo-ios.git", from: "1.9.0"),
        // Alamofire for networking
        .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.8.0"),
    ],
    targets: [
        .target(
            name: "Conq",
            dependencies: [
                .product(name: "Apollo", package: "apollo-ios"),
                .product(name: "Alamofire", package: "Alamofire"),
            ]),
        .testTarget(
            name: "ConqTests",
            dependencies: ["Conq"]),
    ]
)
