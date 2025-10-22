import Foundation

struct User: Identifiable, Codable {
    let id: String
    let email: String
    let name: String
    let role: String?
    let createdAt: Date?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case email
        case name
        case role
        case createdAt = "created_at"
    }
}
