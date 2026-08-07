import Foundation
import Vision
import AppKit

struct Partnership: Codable {
    let match: String
    let file: String
    let batter1: String
    let b1Runs: Int
    let b1Balls: Int
    let batter2: String
    let b2Runs: Int
    let b2Balls: Int
    let totalRuns: Int
    let totalBalls: Int
}

struct RecognizedLine {
    let text: String
    let bbox: CGRect // normalized [0,1] with origin at bottom-left in Vision
}

func parseImage(at path: String) -> [String] {
    guard let image = NSImage(contentsOfFile: path),
          let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        return []
    }
    
    var lines: [String] = []
    let semaphore = DispatchSemaphore(value: 0)
    
    let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    let request = VNRecognizeTextRequest { request, error in
        defer { semaphore.signal() }
        guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
        // Sort top to bottom (Vision Y coordinate 1 is top, 0 is bottom)
        let sorted = observations.sorted { $0.boundingBox.origin.y > $1.boundingBox.origin.y }
        for obs in sorted {
            if let topCandidate = obs.topCandidates(1).first {
                lines.append(topCandidate.string)
            }
        }
    }
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = false
    
    do {
        try requestHandler.perform([request])
        semaphore.wait()
    } catch {
        print("Error: \(error)")
    }
    return lines
}

let fm = FileManager.default
let dir = "scratch/partnership_pics"
guard let files = try? fm.contentsOfDirectory(atPath: dir) else {
    exit(1)
}

var allResults: [String: [String]] = [:]

for file in files.sorted() where file.hasSuffix(".png") {
    let fullPath = "\(dir)/\(file)"
    let textLines = parseImage(at: fullPath)
    allResults[file] = textLines
}

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
if let data = try? encoder.encode(allResults) {
    try? data.write(to: URL(fileURLWithPath: "scratch/ocr_raw_output.json"))
    print("Done! Output written to scratch/ocr_raw_output.json")
}
