import Foundation

struct Content: Identifiable, Codable {
    let id: String
    let userId: String
    let title: String
    let body: String
    let mediaUrls: [String]?
    let tags: [String]?
    let status: ContentStatus
    let platforms: [String]?
    let createdAt: Date?
    let updatedAt: Date?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case userId = "user_id"
        case title
        case body
        case mediaUrls = "media_urls"
        case tags
        case status
        case platforms
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

enum ContentStatus: String, Codable {
    case draft
    case pending
    case approved
    case published
}
