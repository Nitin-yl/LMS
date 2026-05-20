import dotenv from "dotenv";
import Course from "../models/courseModel.js";

dotenv.config();

const categoryKeywords = [
  "App Development",
  "AI/ML",
  "AI Tools",
  "Data Science",
  "Data Analytics",
  "Ethical Hacking",
  "UI UX Designing",
  "Web Development",
  "Cloud Computing",
  "DevOps",
  "Blockchain",
  "Business",
  "Marketing",
  "Product Management",
  "Cybersecurity",
  "Others"
];

const levelKeywords = ["Beginner", "Intermediate", "Advanced"];

const normalizeSearchTerm = (text) => {
  if (!text) return "";
  const lowerInput = text.toLowerCase();

  const categoryMatch = categoryKeywords.find((keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return lowerInput.includes(lowerKeyword) || lowerKeyword.includes(lowerInput);
  });
  if (categoryMatch) return categoryMatch;

  const levelMatch = levelKeywords.find((keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return lowerInput.includes(lowerKeyword) || lowerKeyword.includes(lowerInput);
  });
  if (levelMatch) return levelMatch;

  return text;
};

const buildCourseQuery = (searchText) => ({
  isPublished: true,
  $or: [
    { title: { $regex: searchText, $options: 'i' } },
    { subTitle: { $regex: searchText, $options: 'i' } },
    { description: { $regex: searchText, $options: 'i' } },
    { category: { $regex: searchText, $options: 'i' } },
    { level: { $regex: searchText, $options: 'i' } }
  ]
});

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input || !input.trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const directResults = await Course.find(buildCourseQuery(input));
    if (directResults.length > 0) {
      return res.status(200).json(directResults);
    }

    const normalizedTerm = normalizeSearchTerm(input);
    if (normalizedTerm !== input) {
      const fallbackResults = await Course.find(buildCourseQuery(normalizedTerm));
      return res.status(200).json(fallbackResults);
    }

    return res.status(200).json([]);
  } catch (error) {
    console.error("AI search error:", error);
    return res.status(500).json({ message: "Search failed" });
  }
};