import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Welcome to Conq")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                Text("Social Media Content Pipeline Manager")
                    .font(.body)
                    .foregroundColor(.secondary)

                Spacer()
                    .frame(height: 40)

                NavigationLink(destination: DashboardView()) {
                    Text("Go to Dashboard")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(10)
                }
                .padding(.horizontal)
            }
            .padding()
            .navigationTitle("Conq")
        }
    }
}

struct DashboardView: View {
    var body: some View {
        Text("Dashboard")
            .font(.largeTitle)
            .navigationTitle("Dashboard")
    }
}

#Preview {
    ContentView()
}
