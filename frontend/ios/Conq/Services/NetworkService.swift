import Foundation
import Apollo
import Alamofire

class NetworkService {
    static let shared = NetworkService()

    // Apollo Client for GraphQL
    private(set) lazy var apollo: ApolloClient = {
        let url = URL(string: "http://localhost:8080/graphql")!
        let store = ApolloStore()
        let provider = DefaultInterceptorProvider(store: store)
        let transport = RequestChainNetworkTransport(
            interceptorProvider: provider,
            endpointURL: url
        )
        return ApolloClient(networkTransport: transport, store: store)
    }()

    private init() {}

    // Example network call using Alamofire
    func fetchData(from url: String, completion: @escaping (Result<Data, Error>) -> Void) {
        AF.request(url).response { response in
            if let error = response.error {
                completion(.failure(error))
                return
            }

            if let data = response.data {
                completion(.success(data))
            }
        }
    }
}
